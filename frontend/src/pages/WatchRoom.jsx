import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Users,
  MessageSquare,
  Share2,
  Film,
  Crown,
  Shield,
  User,
  Sparkles,
  X
} from 'lucide-react';
import { getSocket } from '../services/socket';
import { roomAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import YouTubePlayer from '../components/YouTubePlayer';
import ParticipantList from '../components/ParticipantList';
import ChatAndReactions from '../components/ChatAndReactions';
import InviteModal from '../components/InviteModal';

const parseYouTubeId = (input) => {
  if (!input) return null;
  const clean = input.trim();
  const match = clean.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : clean.length === 11 ? clean : null;
};

const WatchRoom = ({ roomId, onLeave }) => {
  const { displayName, userId } = useAuth();

  const [roomTitle, setRoomTitle] = useState('YouTube Watch Party');
  const [videoId, setVideoId] = useState('jfKfPfyJRdk');
  const [playState, setPlayState] = useState('paused');
  const [currentTime, setCurrentTime] = useState(0);

  const [userRole, setUserRole] = useState('participant');
  const [participants, setParticipants] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isChangeVideoOpen, setIsChangeVideoOpen] = useState(false);
  const [newVideoInput, setNewVideoInput] = useState('');
  const [videoError, setVideoError] = useState(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [systemNotice, setSystemNotice] = useState(null);

  const [messages, setMessages] = useState([]);
  const [reactions, setReactions] = useState([]);

  const socketRef = useRef(null);
  const canControl = userRole === 'host' || userRole === 'moderator';

  useEffect(() => {
    let isMounted = true;
    const loadRoomMeta = async () => {
      try {
        const res = await roomAPI.get(roomId);
        if (res.data.success && isMounted) {
          const r = res.data.data.room;
          if (r.title) setRoomTitle(r.title);
          if (r.currentVideoId) setVideoId(r.currentVideoId);
          if (r.playState) setPlayState(r.playState);
          if (r.currentTime) setCurrentTime(r.currentTime);
        }
      } catch (err) {
        console.warn('Could not fetch room meta via REST, relying on WebSocket sync.');
      }
    };

    loadRoomMeta();
    return () => {
      isMounted = false;
    };
  }, [roomId]);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('join_room', {
      roomId,
      username: displayName,
      userId
    });

    socket.on('sync_state', (data) => {
      if (data.videoId) setVideoId(data.videoId);
      if (data.playState) setPlayState(data.playState);
      if (typeof data.currentTime === 'number') setCurrentTime(data.currentTime);
    });

    socket.on('role_assigned', (data) => {
      if (data.participants) setParticipants(data.participants);
      if (data.userId === userId) {
        setUserRole(data.role);
        showNotice(`Your role updated to ${data.role.toUpperCase()}`, 'info');
      }
    });

    socket.on('user_joined', (data) => {
      if (data.participants) setParticipants(data.participants);
      if (data.userId !== userId) {
        setMessages((prev) => [
          ...prev,
          {
            id: `sys_${Date.now()}_${Math.random()}`,
            username: 'System',
            message: `${data.username} joined as ${data.role}.`,
            timestamp: new Date().toISOString()
          }
        ]);
      }
    });

    socket.on('user_left', (data) => {
      if (data.participants) setParticipants(data.participants);
      setMessages((prev) => [
        ...prev,
        {
          id: `sys_${Date.now()}_${Math.random()}`,
          username: 'System',
          message: `${data.username} left the party.`,
          timestamp: new Date().toISOString()
        }
      ]);
    });

    socket.on('participant_removed', (data) => {
      if (data.kicked && data.userId === userId) {
        alert(data.message || 'You have been removed from the watch party by the host.');
        onLeave?.();
        return;
      }
      if (data.participants) setParticipants(data.participants);
    });

    socket.on('host_transferred', (data) => {
      if (data.participants) setParticipants(data.participants);
      if (data.newHost?.userId === userId) {
        setUserRole('host');
        showNotice('You are now the Room Host!', 'success');
      } else {
        showNotice(`Host transferred to ${data.newHost?.username}.`, 'info');
      }
    });

    socket.on('action_requested', (request) => {
      setPendingRequests((prev) => [...prev, request]);
      showNotice(`${request.username} requested to ${request.actionType}`, 'info');
    });

    socket.on('action_resolved', (data) => {
      setPendingRequests((prev) => prev.filter((r) => r.id !== data.request.id));
      if (data.request.requesterUserId === userId) {
        showNotice(
          `Your request was ${data.approved ? 'APPROVED' : 'REJECTED'} by ${data.reviewedBy}.`,
          data.approved ? 'success' : 'warning'
        );
      }
    });

    socket.on('chat_message', (chatData) => {
      setMessages((prev) => [...prev, chatData]);
    });

    socket.on('reaction', (reactionData) => {
      setReactions((prev) => [...prev, reactionData]);
      setTimeout(() => {
        setReactions((prev) => prev.filter((r) => r.id !== reactionData.id));
      }, 2300);
    });

    socket.on('error_message', (err) => {
      showNotice(err.message, 'error');
    });

    return () => {
      socket.emit('leave_room', { roomId });
      socket.off('sync_state');
      socket.off('role_assigned');
      socket.off('user_joined');
      socket.off('user_left');
      socket.off('participant_removed');
      socket.off('host_transferred');
      socket.off('action_requested');
      socket.off('action_resolved');
      socket.off('chat_message');
      socket.off('reaction');
      socket.off('error_message');
    };
  }, [roomId, displayName, userId, onLeave]);

  const showNotice = (text, type = 'info') => {
    setSystemNotice({ text, type });
    setTimeout(() => setSystemNotice(null), 4000);
  };

  const handlePlay = useCallback(() => {
    socketRef.current?.emit('play', { roomId });
  }, [roomId]);

  const handlePause = useCallback(() => {
    socketRef.current?.emit('pause', { roomId });
  }, [roomId]);

  const handleSeek = useCallback(
    (time) => {
      socketRef.current?.emit('seek', { roomId, time });
    },
    [roomId]
  );

  const handleChangeVideoSubmit = (e) => {
    e.preventDefault();
    setVideoError(null);
    const id = parseYouTubeId(newVideoInput);
    if (!id) {
      setVideoError('Please enter a valid YouTube Video URL or 11-character Video ID.');
      return;
    }

    if (canControl) {
      socketRef.current?.emit('change_video', { roomId, videoId: id });
      setIsChangeVideoOpen(false);
      setNewVideoInput('');
    } else {
      socketRef.current?.emit('request_action', {
        roomId,
        actionType: 'change_video',
        payload: { videoId: id }
      });
      setIsChangeVideoOpen(false);
      setNewVideoInput('');
      showNotice('Request sent to Host & Moderator for approval!', 'info');
    }
  };

  const handleRequestControl = () => {
    socketRef.current?.emit('request_action', {
      roomId,
      actionType: 'control',
      payload: {}
    });
    showNotice('Requested playback control permission from Host.', 'info');
  };

  const handleAssignRole = (targetUserId, newRole) => {
    socketRef.current?.emit('assign_role', { roomId, userId: targetUserId, role: newRole });
  };

  const handleRemoveParticipant = (targetUserId) => {
    socketRef.current?.emit('remove_participant', { roomId, userId: targetUserId });
  };

  const handleTransferHost = (targetUserId) => {
    if (confirm('Are you sure you want to transfer Host control to this user?')) {
      socketRef.current?.emit('transfer_host', { roomId, userId: targetUserId });
    }
  };

  const handleResolveRequest = (requestId, approved) => {
    socketRef.current?.emit('resolve_action', { roomId, requestId, approved });
  };

  const handleSendMessage = (text) => {
    socketRef.current?.emit('chat_message', {
      roomId,
      message: text,
      username: displayName
    });
  };

  const handleSendReaction = (emoji) => {
    socketRef.current?.emit('reaction', {
      roomId,
      emoji,
      username: displayName
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{roomTitle}</h1>
            <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded-full border border-slate-700">
              {roomId}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
            <span className="flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>{participants.length} watching</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              {userRole === 'host' ? (
                <Crown className="w-3.5 h-3.5 text-amber-400" />
              ) : userRole === 'moderator' ? (
                <Shield className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <User className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="capitalize font-semibold text-slate-300">
                You are {userRole}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button
            onClick={() => setIsChangeVideoOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-colors shadow-sm cursor-pointer"
          >
            <Film className="w-4 h-4 text-red-500" />
            <span>{canControl ? 'Change Video' : 'Request Video'}</span>
          </button>

          <button
            onClick={() => setIsInviteOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/25 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Invite Friends</span>
          </button>
        </div>
      </div>

      {systemNotice && (
        <div
          className={`my-3 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all shadow-md ${
            systemNotice.type === 'error'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : systemNotice.type === 'success'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{systemNotice.text}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 my-4 flex-1">
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <YouTubePlayer
            videoId={videoId}
            playState={playState}
            currentTime={currentTime}
            userRole={userRole}
            onPlay={handlePlay}
            onPause={handlePause}
            onSeek={handleSeek}
            onRequestAction={handleRequestControl}
          />

          <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>WebSocket Sync Engine Active</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Video ID: <code className="text-slate-400 font-mono">{videoId}</code>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col space-y-4 h-[600px] lg:h-auto">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5 ${
                activeTab === 'chat'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat & Reactions</span>
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5 ${
                activeTab === 'participants'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Participants ({participants.length})</span>
            </button>
          </div>

          <div className="flex-1 min-h-0">
            {activeTab === 'chat' ? (
              <ChatAndReactions
                messages={messages}
                reactions={reactions}
                onSendMessage={handleSendMessage}
                onSendReaction={handleSendReaction}
                currentUsername={displayName}
              />
            ) : (
              <ParticipantList
                participants={participants}
                currentUserId={userId}
                currentUserRole={userRole}
                pendingRequests={pendingRequests}
                onAssignRole={handleAssignRole}
                onRemoveParticipant={handleRemoveParticipant}
                onTransferHost={handleTransferHost}
                onResolveRequest={handleResolveRequest}
              />
            )}
          </div>
        </div>
      </div>

      {isChangeVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100">
            <button
              onClick={() => setIsChangeVideoOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold mb-1">
              {canControl ? 'Change YouTube Video' : 'Request Video Change'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Paste any YouTube URL or 11-character Video ID.
            </p>

            {videoError && (
              <div className="mb-3 p-2.5 bg-red-500/15 border border-red-500/30 text-red-400 text-xs rounded-xl">
                {videoError}
              </div>
            )}

            <form onSubmit={handleChangeVideoSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={newVideoInput}
                onChange={(e) => setNewVideoInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/20 cursor-pointer"
              >
                {canControl ? 'Sync New Video to Party' : 'Submit Request to Host'}
              </button>
            </form>
          </div>
        </div>
      )}

      <InviteModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        roomId={roomId}
        roomTitle={roomTitle}
        currentUsername={displayName}
      />
    </div>
  );
};

export default WatchRoom;