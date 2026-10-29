const { roomManager } = require('./roomManager');
const Room = require('../models/Room');

const initSocketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`[Socket Connected] ID: ${socket.id}`);

    socket.on('join_room', async (data = {}) => {
      try {
        const { roomId, username = 'Anonymous', userId = socket.id, forceRole = null } = data;
        if (!roomId) {
          return socket.emit('error_message', { message: 'Room ID is required to join.' });
        }

        const previousRooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
        previousRooms.forEach((r) => socket.leave(r));

        let roomSession = roomManager.getRoom(roomId);
        if (!roomSession) {
          let initialVideo = 'jfKfPfyJRdk';
          let title = 'YouTube Watch Party';
          try {
            const dbRoom = await Room.findOne({ roomId });
            if (dbRoom) {
              initialVideo = dbRoom.currentVideoId || initialVideo;
              title = dbRoom.title || title;
            }
          } catch (dbErr) {
            console.error('[DB Fetch Error during join]', dbErr.message);
          }
          roomSession = roomManager.createOrGetRoom(roomId, title, initialVideo);
        }

        const participant = roomSession.addParticipant({
          userId,
          socketId: socket.id,
          username,
          forceRole
        });

        socket.join(roomId);
        socket.data.roomId = roomId;
        socket.data.userId = userId;

        const participants = roomSession.getParticipantsList();
        const syncState = roomSession.getSyncState();

        socket.emit('sync_state', syncState);
        socket.emit('role_assigned', {
          userId: participant.userId,
          username: participant.username,
          role: participant.role,
          participants
        });

        io.to(roomId).emit('user_joined', {
          username: participant.username,
          userId: participant.userId,
          role: participant.role,
          participants
        });

        Room.findOneAndUpdate(
          { roomId },
          {
            $set: {
              participants: participants.map((p) => ({
                userId: p.userId,
                username: p.username,
                role: p.role,
                joinedAt: p.joinedAt
              }))
            }
          }
        ).catch(() => {});

        console.log(`[User Joined] ${username} (${participant.role}) -> Room: ${roomId}`);
      } catch (err) {
        console.error('[join_room error]', err.message);
        socket.emit('error_message', { message: err.message });
      }
    });

    socket.on('leave_room', (data = {}) => {
      const roomId = data.roomId || socket.data.roomId;
      if (!roomId) return;

      const roomSession = roomManager.getRoom(roomId);
      if (roomSession) {
        const removed = roomSession.removeParticipantBySocketId(socket.id);
        socket.leave(roomId);
        if (removed) {
          const participants = roomSession.getParticipantsList();
          io.to(roomId).emit('user_left', {
            username: removed.username,
            userId: removed.userId,
            participants
          });
        }
      }
    });

    socket.on('play', async (data = {}) => {
      try {
        const roomId = data.roomId || socket.data.roomId;
        const roomSession = roomManager.getRoom(roomId);
        if (!roomSession) return;

        const participant = roomSession.getParticipantBySocket(socket.id);
        if (!participant) return;

        const syncState = roomSession.play(participant.userId);

        io.to(roomId).emit('sync_state', syncState);

        Room.updateOne({ roomId }, { $set: { playState: 'playing', currentTime: syncState.currentTime } }).catch(() => {});
      } catch (err) {
        socket.emit('error_message', { message: err.message });
      }
    });

    socket.on('pause', async (data = {}) => {
      try {
        const roomId = data.roomId || socket.data.roomId;
        const roomSession = roomManager.getRoom(roomId);
        if (!roomSession) return;

        const participant = roomSession.getParticipantBySocket(socket.id);
        if (!participant) return;

        const syncState = roomSession.pause(participant.userId);

        io.to(roomId).emit('sync_state', syncState);

        Room.updateOne({ roomId }, { $set: { playState: 'paused', currentTime: syncState.currentTime } }).catch(() => {});
      } catch (err) {
        socket.emit('error_message', { message: err.message });
      }
    });

    socket.on('seek', async (data = {}) => {
      try {
        const roomId = data.roomId || socket.data.roomId;
        const roomSession = roomManager.getRoom(roomId);
        if (!roomSession) return;

        const participant = roomSession.getParticipantBySocket(socket.id);
        if (!participant) return;

        const syncState = roomSession.seek(data.time, participant.userId);

        io.to(roomId).emit('sync_state', syncState);

        Room.updateOne({ roomId }, { $set: { currentTime: syncState.currentTime } }).catch(() => {});
      } catch (err) {
        socket.emit('error_message', { message: err.message });
      }
    });

    socket.on('change_video', async (data = {}) => {
      try {
        const roomId = data.roomId || socket.data.roomId;
        const { videoId } = data;
        if (!videoId) {
          return socket.emit('error_message', { message: 'Video ID is required.' });
        }

        const roomSession = roomManager.getRoom(roomId);
        if (!roomSession) return;

        const participant = roomSession.getParticipantBySocket(socket.id);
        if (!participant) return;

        const syncState = roomSession.changeVideo(videoId, participant.userId);

        io.to(roomId).emit('sync_state', syncState);

        Room.updateOne(
          { roomId },
          {
            $set: {
              currentVideoId: videoId,
              currentTime: 0,
              playState: 'playing'
            }
          }
        ).catch(() => {});
      } catch (err) {
        socket.emit('error_message', { message: err.message });
      }
    });

    socket.on('assign_role', (data = {}) => {
      try {
        const roomId = data.roomId || socket.data.roomId;
        const { userId, role } = data;

        const roomSession = roomManager.getRoom(roomId);
        if (!roomSession) return;

        const requester = roomSession.getParticipantBySocket(socket.id);
        if (!requester) return;

        const targetParticipant = roomSession.assignRole(userId, role, requester.userId);
        const participants = roomSession.getParticipantsList();

        io.to(roomId).emit('role_assigned', {
          userId: targetParticipant.userId,
          username: targetParticipant.username,
          role: targetParticipant.role,
          participants
        });

        Room.updateOne(
          { roomId, 'participants.userId': userId },
          { $set: { 'participants.$.role': role } }
        ).catch(() => {});
      } catch (err) {
        socket.emit('error_message', { message: err.message });
      }
    });

    socket.on('remove_participant', (data = {}) => {
      try {
        const roomId = data.roomId || socket.data.roomId;
        const { userId } = data;

        const roomSession = roomManager.getRoom(roomId);
        if (!roomSession) return;

        const requester = roomSession.getParticipantBySocket(socket.id);
        if (!requester) return;

        const removedUser = roomSession.removeParticipantByUserId(userId, requester.userId);
        const participants = roomSession.getParticipantsList();

        if (removedUser.socketId) {
          io.to(removedUser.socketId).emit('participant_removed', {
            userId,
            kicked: true,
            message: 'You have been removed from the watch party by the host.'
          });
        }

        io.to(roomId).emit('participant_removed', {
          userId,
          participants
        });

        Room.updateOne({ roomId }, { $pull: { participants: { userId } } }).catch(() => {});
      } catch (err) {
        socket.emit('error_message', { message: err.message });
      }
    });

    socket.on('transfer_host', (data = {}) => {
      try {
        const roomId = data.roomId || socket.data.roomId;
        const { userId } = data;

        const roomSession = roomManager.getRoom(roomId);
        if (!roomSession) return;

        const requester = roomSession.getParticipantBySocket(socket.id);
        if (!requester) return;

        const result = roomSession.transferHost(userId, requester.userId);
        const participants = roomSession.getParticipantsList();

        io.to(roomId).emit('host_transferred', {
          oldHost: result.oldHost.toJSON(),
          newHost: result.newHost.toJSON(),
          participants
        });
      } catch (err) {
        socket.emit('error_message', { message: err.message });
      }
    });

    socket.on('request_action', (data = {}) => {
      try {
        const roomId = data.roomId || socket.data.roomId;
        const roomSession = roomManager.getRoom(roomId);
        if (!roomSession) return;

        const requester = roomSession.getParticipantBySocket(socket.id);
        if (!requester) return;

        const request = roomSession.createActionRequest({
          requesterUserId: requester.userId,
          actionType: data.actionType,
          payload: data.payload
        });

        io.to(roomId).emit('action_requested', request);
      } catch (err) {
        socket.emit('error_message', { message: err.message });
      }
    });

    socket.on('resolve_action', (data = {}) => {
      try {
        const roomId = data.roomId || socket.data.roomId;
        const roomSession = roomManager.getRoom(roomId);
        if (!roomSession) return;

        const reviewer = roomSession.getParticipantBySocket(socket.id);
        if (!reviewer) return;

        const { request, approved } = roomSession.resolveActionRequest(
          data.requestId,
          data.approved,
          reviewer.userId
        );

        io.to(roomId).emit('action_resolved', {
          request,
          approved,
          reviewedBy: reviewer.username
        });

        if (approved) {
          if (request.actionType === 'change_video' && request.payload?.videoId) {
            const syncState = roomSession.changeVideo(request.payload.videoId, reviewer.userId);
            io.to(roomId).emit('sync_state', syncState);
          } else if (request.actionType === 'play') {
            const syncState = roomSession.play(reviewer.userId);
            io.to(roomId).emit('sync_state', syncState);
          } else if (request.actionType === 'pause') {
            const syncState = roomSession.pause(reviewer.userId);
            io.to(roomId).emit('sync_state', syncState);
          }
        }
      } catch (err) {
        socket.emit('error_message', { message: err.message });
      }
    });

    socket.on('chat_message', (data = {}) => {
      const roomId = data.roomId || socket.data.roomId;
      if (!roomId || !data.message) return;

      const chatPayload = {
        id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        userId: socket.data.userId || socket.id,
        username: data.username || 'Anonymous',
        message: data.message.trim(),
        timestamp: new Date().toISOString()
      };

      io.to(roomId).emit('chat_message', chatPayload);
    });

    socket.on('reaction', (data = {}) => {
      const roomId = data.roomId || socket.data.roomId;
      if (!roomId || !data.emoji) return;

      io.to(roomId).emit('reaction', {
        id: `react_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        emoji: data.emoji,
        username: data.username || 'Someone'
      });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket Disconnected] ID: ${socket.id}`);
      const roomId = socket.data.roomId;
      if (roomId) {
        const roomSession = roomManager.getRoom(roomId);
        if (roomSession) {
          const removed = roomSession.removeParticipantBySocketId(socket.id);
          if (removed) {
            const participants = roomSession.getParticipantsList();
            io.to(roomId).emit('user_left', {
              username: removed.username,
              userId: removed.userId,
              participants
            });
          }
        }
      }
    });
  });
};

module.exports = initSocketHandler;