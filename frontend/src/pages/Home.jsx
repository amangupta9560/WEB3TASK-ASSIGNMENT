import React, { useState, useEffect } from 'react';
import { Play, Plus, ArrowRight, Users, Shield, Zap, Mail, Compass } from 'lucide-react';
import { roomAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const SAMPLE_VIDEOS = [
  { label: 'Lofi Girl - Synthwave', url: 'https://www.youtube.com/watch?v=4xDzrJKXOOY', id: '4xDzrJKXOOY' },
  { label: 'Big Buck Bunny (4K)', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', id: 'aqz-KE-bpKQ' },
  { label: 'Relaxing Nature & Music', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk', id: 'jfKfPfyJRdk' }
];

const Home = ({ onJoinRoom, onOpenAuth }) => {
  const { displayName } = useAuth();
  const [createTitle, setCreateTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [recentRooms, setRecentRooms] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await roomAPI.getAll();
        if (res.data.success) {
          setRecentRooms(res.data.data.rooms || []);
        }
      } catch (err) {}
    };

    fetchRooms();
  }, []);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoadingCreate(true);

    try {
      const res = await roomAPI.create({
        title: createTitle.trim() || `${displayName}'s Watch Party`,
        videoUrl: videoUrl.trim() || 'jfKfPfyJRdk',
        username: displayName
      });

      if (res.data.success && res.data.data.room) {
        onJoinRoom(res.data.data.room.roomId);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to create room.');
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleJoinByCode = (e) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    onJoinRoom(joinCode.trim());
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <section className="relative px-4 sm:px-6 pt-12 pb-16 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Real-Time Video Synchronization</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Watch YouTube Together <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              In Perfect Real-Time Sync
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Create or join watch parties with unique codes. Synchronize playback, seek controls, and video changes
            with robust role-based access for Hosts, Moderators, and Participants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-red-600/15 text-red-500 rounded-xl">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Create a Watch Party</h2>
                  <p className="text-xs text-slate-400">You will automatically become the Room Host</p>
                </div>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-500/15 border border-red-500/30 text-red-400 text-xs rounded-xl">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleCreateRoom} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Party Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Weekend Movie Night"
                    value={createTitle}
                    onChange={(e) => setCreateTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Initial YouTube Video URL or ID
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="text-[10px] text-slate-500 self-center">Quick Pick:</span>
                    {SAMPLE_VIDEOS.map((vid) => (
                      <button
                        type="button"
                        key={vid.id}
                        onClick={() => setVideoUrl(vid.url)}
                        className="text-[10px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-0.5 rounded-md transition-colors"
                      >
                        {vid.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loadingCreate}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-red-600/30 active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{loadingCreate ? 'Creating Room...' : 'Start Watch Party'}</span>
                </button>
              </form>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-blue-600/15 text-blue-500 rounded-xl">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Join with Room Code</h2>
                  <p className="text-xs text-slate-400">Enter a code received from the Host</p>
                </div>
              </div>

              <form onSubmit={handleJoinByCode} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Room Code or URL
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. room-7f2a1b"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono uppercase"
                  />
                </div>

                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
                  <p className="font-semibold text-slate-300">Default Participant Privileges:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                    <li>Watch perfectly in sync with the room host</li>
                    <li>Chat and send live reactions to friends</li>
                    <li>Request control approval from Host / Moderator</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={!joinCode.trim()}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer mt-4"
                >
                  <span>Enter Room</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {recentRooms.length > 0 && (
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-red-500" />
                <h3 className="font-bold text-slate-200 text-sm">Public Watch Parties</h3>
              </div>
              <span className="text-xs text-slate-500">Live active sessions</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentRooms.map((room) => (
                <div
                  key={room._id || room.roomId}
                  onClick={() => onJoinRoom(room.roomId)}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-4 rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-mono text-red-400 font-medium">{room.roomId}</span>
                      <span className="flex items-center space-x-1 text-slate-500">
                        <Users className="w-3 h-3" />
                        <span>{room.participants?.length || 1}</span>
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors truncate">
                      {room.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">Host: {room.hostUsername}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center justify-between text-xs text-red-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Join Party</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-20 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
            <div className="p-2.5 bg-red-600/10 text-red-400 w-fit rounded-xl mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm mb-1">Bidirectional Real-Time Sync</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              When the Host plays, pauses, seeks, or updates the video, all participants follow instantly without sync loop feedback.
            </p>
          </div>

          <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
            <div className="p-2.5 bg-amber-600/10 text-amber-400 w-fit rounded-xl mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm mb-1">Role-Based Access Control</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Granular roles (Host, Moderator, Participant) enforce who can control playback, transfer host rights, or kick users.
            </p>
          </div>

          <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-2xl">
            <div className="p-2.5 bg-blue-600/10 text-blue-400 w-fit rounded-xl mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm mb-1">Nodemailer Email Invites</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Send beautifully styled watch party email invitations directly to your friends with one click from within the room.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>YouTube Watch Party System • Full Stack Developer Assignment</p>
      </footer>
    </div>
  );
};

export default Home;