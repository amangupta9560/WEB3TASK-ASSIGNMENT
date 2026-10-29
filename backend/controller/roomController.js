const crypto = require('crypto');
const Room = require('../models/Room');
const { roomManager } = require('../utils/roomManager');
const { sendEmail } = require('../config/mailer');

const extractYouTubeId = (urlOrId) => {
  if (!urlOrId) return 'jfKfPfyJRdk';
  const clean = urlOrId.trim();
  const match = clean.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : clean.length === 11 ? clean : 'jfKfPfyJRdk';
};

const createRoom = async (req, res, next) => {
  try {
    const { title, videoUrl, username, isPrivate } = req.body;

    const hostUsername = req.user ? req.user.name : username || 'Host';
    const hostId = req.user ? req.user._id : null;

    const randomCode = crypto.randomBytes(3).toString('hex');
    const roomId = `room-${randomCode}`;
    const videoId = extractYouTubeId(videoUrl);

    const room = await Room.create({
      roomId,
      title: title || `${hostUsername}'s Watch Party`,
      host: hostId,
      hostUsername,
      currentVideoId: videoId,
      playState: 'paused',
      currentTime: 0,
      isPrivate: !!isPrivate,
      participants: [
        {
          userId: hostId ? hostId.toString() : `host_${Date.now()}`,
          username: hostUsername,
          role: 'host'
        }
      ]
    });

    roomManager.createOrGetRoom(roomId, room.title, videoId);

    res.status(201).json({
      success: true,
      message: 'Room created successfully.',
      data: {
        room
      }
    });
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    let room = await Room.findOne({ roomId });

    const activeSession = roomManager.getRoom(roomId);

    if (!room && !activeSession) {
      return res.status(404).json({
        success: false,
        message: 'Watch Party Room not found.'
      });
    }

    if (!room && activeSession) {
      room = {
        roomId: activeSession.roomId,
        title: activeSession.title,
        currentVideoId: activeSession.currentVideoId,
        playState: activeSession.playState,
        currentTime: activeSession.currentTime,
        hostUsername: 'Host'
      };
    }

    res.status(200).json({
      success: true,
      data: {
        room,
        activeParticipants: activeSession ? activeSession.getParticipantsList() : []
      }
    });
  } catch (error) {
    next(error);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({ isPrivate: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: {
        rooms
      }
    });
  } catch (error) {
    next(error);
  }
};

const sendInviteEmail = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { recipientEmail, inviterName } = req.body;

    if (!recipientEmail) {
      return res.status(400).json({
        success: false,
        message: 'Recipient email address is required.'
      });
    }

    const room = await Room.findOne({ roomId });
    const roomTitle = room ? room.title : 'YouTube Watch Party';
    const sender = inviterName || (req.user ? req.user.name : 'A friend');
    const clientBaseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const joinUrl = `${clientBaseUrl}/room/${roomId}`;

    const emailSubject = `🎬 You're invited to watch: "${roomTitle}"`;
    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 580px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #334155;">
        <div style="background: linear-gradient(135deg, #ef4444, #dc2626); padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">YouTube Watch Party</h1>
          <p style="color: #fee2e2; margin: 6px 0 0 0; font-size: 14px;">Synchronized Video Streaming & Live Chat</p>
        </div>
        <div style="padding: 28px;">
          <h2 style="color: #f1f5f9; font-size: 18px; margin-top: 0;">Hey there! 👋</h2>
          <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
            <strong>${sender}</strong> has invited you to join an interactive YouTube Watch Party:
          </p>
          <div style="background: #1e293b; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
            <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Party Title</p>
            <p style="margin: 4px 0 0 0; color: #ffffff; font-size: 17px; font-weight: bold;">${roomTitle}</p>
            <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 13px;">Room Code: <code style="background: #0f172a; padding: 2px 8px; border-radius: 4px; color: #38bdf8;">${roomId}</code></p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${joinUrl}" style="background: #ef4444; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
              Join Watch Party Now
            </a>
          </div>
          <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 24px;">
            Or copy and paste this link in your browser:<br/>
            <a href="${joinUrl}" style="color: #38bdf8;">${joinUrl}</a>
          </p>
        </div>
        <div style="background: #090d16; padding: 16px; text-align: center; color: #475569; font-size: 12px;">
          Synchronized playback powered by WebSockets & YouTube IFrame API.
        </div>
      </div>
    `;

    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml,
      text: `${sender} has invited you to join a YouTube Watch Party (${roomTitle}). Join here: ${joinUrl}`
    });

    res.status(200).json({
      success: true,
      message: 'Invitation processed.',
      delivery: emailResult,
      joinUrl
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom,
  getRoom,
  getAllRooms,
  sendInviteEmail
};
