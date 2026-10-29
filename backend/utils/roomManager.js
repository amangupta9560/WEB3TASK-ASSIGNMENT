class Participant {
  constructor({ userId, socketId, username, role = 'participant' }) {
    this.userId = userId;
    this.socketId = socketId;
    this.username = username;
    this.role = role;
    this.joinedAt = new Date();
  }

  isHost() {
    return this.role === 'host';
  }

  isModerator() {
    return this.role === 'moderator';
  }

  canControlPlayback() {
    return this.role === 'host' || this.role === 'moderator';
  }

  canManageRoles() {
    return this.role === 'host';
  }

  toJSON() {
    return {
      userId: this.userId,
      username: this.username,
      role: this.role,
      joinedAt: this.joinedAt
    };
  }
}

class RoomSession {
  constructor(roomId, title = 'YouTube Watch Party', initialVideoId = 'jfKfPfyJRdk') {
    this.roomId = roomId;
    this.title = title;
    this.currentVideoId = initialVideoId;
    this.playState = 'paused';
    this.currentTime = 0;
    this.lastUpdatedAt = Date.now();

    this.participants = new Map();
    this.socketToUser = new Map();
    this.pendingRequests = [];
  }

  getEstimatedTime() {
    if (this.playState === 'playing') {
      const elapsedSeconds = (Date.now() - this.lastUpdatedAt) / 1000;
      return this.currentTime + elapsedSeconds;
    }
    return this.currentTime;
  }

  addParticipant({ userId, socketId, username, forceRole = null }) {
    let role = forceRole;

    if (!role) {
      if (this.participants.size === 0) {
        role = 'host';
      } else {
        const existing = this.participants.get(userId);
        role = existing ? existing.role : 'participant';
      }
    }

    const participant = new Participant({
      userId,
      socketId,
      username,
      role
    });

    this.participants.set(userId, participant);
    this.socketToUser.set(socketId, userId);

    return participant;
  }

  removeParticipantBySocketId(socketId) {
    const userId = this.socketToUser.get(socketId);
    if (!userId) return null;

    const participant = this.participants.get(userId);
    this.socketToUser.delete(socketId);
    this.participants.delete(userId);

    if (participant && participant.isHost() && this.participants.size > 0) {
      const nextUser = this.participants.values().next().value;
      if (nextUser) {
        nextUser.role = 'host';
      }
    }

    return participant;
  }

  removeParticipantByUserId(userId, requesterUserId) {
    const requester = this.participants.get(requesterUserId);
    if (!requester || !requester.isHost()) {
      throw new Error('Only the Host can remove participants.');
    }

    const target = this.participants.get(userId);
    if (!target) {
      throw new Error('Participant not found.');
    }

    if (target.isHost()) {
      throw new Error('The Host cannot be removed.');
    }

    this.socketToUser.delete(target.socketId);
    this.participants.delete(userId);

    return target;
  }

  assignRole(targetUserId, newRole, requesterUserId) {
    const requester = this.participants.get(requesterUserId);
    if (!requester || !requester.isHost()) {
      throw new Error('Only the Host can assign roles.');
    }

    const validRoles = ['moderator', 'participant', 'viewer'];
    if (!validRoles.includes(newRole)) {
      throw new Error('Invalid role specified.');
    }

    const target = this.participants.get(targetUserId);
    if (!target) {
      throw new Error('Participant not found.');
    }

    if (target.isHost()) {
      throw new Error('Host role cannot be changed directly via assignRole. Use transferHost.');
    }

    target.role = newRole;
    return target;
  }

  transferHost(targetUserId, requesterUserId) {
    const currentHost = this.participants.get(requesterUserId);
    if (!currentHost || !currentHost.isHost()) {
      throw new Error('Only current Host can transfer host privileges.');
    }

    const newHost = this.participants.get(targetUserId);
    if (!newHost) {
      throw new Error('Target participant not found.');
    }

    currentHost.role = 'moderator';
    newHost.role = 'host';

    return { oldHost: currentHost, newHost };
  }

  play(requesterUserId) {
    const requester = this.participants.get(requesterUserId);
    if (!requester || !requester.canControlPlayback()) {
      throw new Error('Permission denied: Only Host or Moderator can start playback.');
    }

    this.playState = 'playing';
    this.lastUpdatedAt = Date.now();
    return this.getSyncState();
  }

  pause(requesterUserId) {
    const requester = this.participants.get(requesterUserId);
    if (!requester || !requester.canControlPlayback()) {
      throw new Error('Permission denied: Only Host or Moderator can pause playback.');
    }

    this.currentTime = this.getEstimatedTime();
    this.playState = 'paused';
    this.lastUpdatedAt = Date.now();
    return this.getSyncState();
  }

  seek(timeInSeconds, requesterUserId) {
    const requester = this.participants.get(requesterUserId);
    if (!requester || !requester.canControlPlayback()) {
      throw new Error('Permission denied: Only Host or Moderator can seek.');
    }

    this.currentTime = Math.max(0, Number(timeInSeconds) || 0);
    this.lastUpdatedAt = Date.now();
    return this.getSyncState();
  }

  changeVideo(videoId, requesterUserId) {
    const requester = this.participants.get(requesterUserId);
    if (!requester || !requester.canControlPlayback()) {
      throw new Error('Permission denied: Only Host or Moderator can change video.');
    }

    this.currentVideoId = videoId;
    this.currentTime = 0;
    this.playState = 'playing';
    this.lastUpdatedAt = Date.now();
    return this.getSyncState();
  }

  createActionRequest({ requesterUserId, actionType, payload }) {
    const requester = this.participants.get(requesterUserId);
    if (!requester) throw new Error('Participant not found.');

    const request = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      requesterUserId,
      username: requester.username,
      actionType,
      payload,
      createdAt: new Date()
    };

    this.pendingRequests.push(request);
    return request;
  }

  resolveActionRequest(requestId, approved, reviewerUserId) {
    const reviewer = this.participants.get(reviewerUserId);
    if (!reviewer || !reviewer.canControlPlayback()) {
      throw new Error('Permission denied: Only Host or Moderator can approve requests.');
    }

    const index = this.pendingRequests.findIndex((r) => r.id === requestId);
    if (index === -1) throw new Error('Request not found.');

    const [request] = this.pendingRequests.splice(index, 1);
    return { request, approved };
  }

  getSyncState() {
    return {
      videoId: this.currentVideoId,
      playState: this.playState,
      currentTime: this.getEstimatedTime(),
      lastUpdatedAt: this.lastUpdatedAt
    };
  }

  getParticipantsList() {
    return Array.from(this.participants.values()).map((p) => p.toJSON());
  }

  getParticipantBySocket(socketId) {
    const userId = this.socketToUser.get(socketId);
    return userId ? this.participants.get(userId) : null;
  }
}

class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  createOrGetRoom(roomId, title = 'YouTube Watch Party', initialVideoId = 'jfKfPfyJRdk') {
    if (!this.rooms.has(roomId)) {
      const session = new RoomSession(roomId, title, initialVideoId);
      this.rooms.set(roomId, session);
    }
    return this.rooms.get(roomId);
  }

  deleteRoom(roomId) {
    return this.rooms.delete(roomId);
  }

  findRoomBySocketId(socketId) {
    for (const room of this.rooms.values()) {
      if (room.socketToUser.has(socketId)) {
        return room;
      }
    }
    return null;
  }
}

const roomManager = new RoomManager();

module.exports = {
  Participant,
  RoomSession,
  roomManager
};
