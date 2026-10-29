const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['host', 'moderator', 'participant', 'viewer'],
      default: 'participant'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Room title is required'],
      trim: true,
      default: 'YouTube Watch Party'
    },
    description: {
      type: String,
      default: ''
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    hostUsername: {
      type: String,
      required: true
    },
    currentVideoId: {
      type: String,
      default: 'jfKfPfyJRdk'
    },
    playState: {
      type: String,
      enum: ['playing', 'paused'],
      default: 'paused'
    },
    currentTime: {
      type: Number,
      default: 0
    },
    participants: [participantSchema],
    isPrivate: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Room', roomSchema);
