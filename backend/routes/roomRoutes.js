const express = require('express');
const router = express.Router();
const {
  createRoom,
  getRoom,
  getAllRooms,
  sendInviteEmail
} = require('../controller/roomController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.post('/', optionalAuth, createRoom);
router.get('/', getAllRooms);
router.get('/:roomId', getRoom);
router.post('/:roomId/invite', optionalAuth, sendInviteEmail);

module.exports = router;
