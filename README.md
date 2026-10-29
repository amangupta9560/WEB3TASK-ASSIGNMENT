<div id="top" align="center">
  <img src="docs/assets/logo.svg" alt="SyncParty YouTube Watch Party Logo" width="140" height="140">
  <h1>YouTube Watch Party System</h1>
  <p><b>Real-Time Bidirectional Video Synchronization with Granular Role-Based Access Control</b></p>
  <p>An interactive, synchronized watch party platform enabling multiple users to watch YouTube videos in frame-accurate real-time across the globe, featuring custom player control architecture, host moderation, live reactions, text chat, and email invitations.</p>

  <p>
    <img src="https://img.shields.io/badge/Node.js-24.14.1-339933?style=for-the-badge&amp;logo=node.js&amp;logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&amp;logo=react&amp;logoColor=black" alt="React 19">
    <img src="https://img.shields.io/badge/Vite-6.1.0-646CFF?style=for-the-badge&amp;logo=vite&amp;logoColor=white" alt="Vite 6">
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0.0-06B6D4?style=for-the-badge&amp;logo=tailwindcss&amp;logoColor=white" alt="Tailwind CSS v4">
    <img src="https://img.shields.io/badge/Socket.IO-4.8.1-010101?style=for-the-badge&amp;logo=socket.io&amp;logoColor=white" alt="Socket.IO">
    <img src="https://img.shields.io/badge/Express-4.21.2-000000?style=for-the-badge&amp;logo=express&amp;logoColor=white" alt="Express">
    <img src="https://img.shields.io/badge/MongoDB_Atlas-8.9.5-47A248?style=for-the-badge&amp;logo=mongodb&amp;logoColor=white" alt="MongoDB Atlas">
    <img src="https://img.shields.io/badge/YouTube_IFrame_API-v3-FF0000?style=for-the-badge&amp;logo=youtube&amp;logoColor=white" alt="YouTube IFrame API">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License MIT">
  </p>

  <div style="margin: 20px 0;">
    <a href="YOUR_LIVE_URL_HERE" style="background-color: #ef4444; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);">
      🚀 LAUNCH PUBLIC LIVE DEMO
    </a>
  </div>

  <table align="center" cellpadding="8" cellspacing="0" border="0">
    <tr>
      <td align="center"><a href="YOUR_BACKEND_URL_HERE">🌐 WebSocket Backend URL</a></td>
      <td align="center">•</td>
      <td align="center"><a href="YOUR_DEMO_VIDEO_HERE">🎥 Video Walkthrough</a></td>
      <td align="center">•</td>
      <td align="center"><a href="https://github.com/amangupta9560">🐛 Report Bug</a></td>
      <td align="center">•</td>
      <td align="center"><a href="https://github.com/amangupta9560">✨ Request Feature</a></td>
    </tr>
  </table>
</div>

<hr>

<h2 id="table-of-contents">📑 Table of Contents</h2>

<ol>
  <li><a href="#what-is-watch-party">🔎 What is Watch Party</a></li>
  <li><a href="#who-its-for">👥 Who it's for</a></li>
  <li><a href="#what-problems-it-solves">⚕️ What problems it solves</a></li>
  <li><a href="#features-by-module">✨ Features by module</a></li>
  <li><a href="#screenshots">📸 Screenshots</a></li>
  <li><a href="#project-structure">📂 Project structure</a></li>
  <li><a href="#tech-stack">💻 Tech stack</a></li>
  <li><a href="#system-architecture-and-diagrams">🏗️ System architecture and diagrams</a></li>
  <li><a href="#how-websockets-power-the-sync">🔌 How WebSockets power the sync</a></li>
  <li><a href="#websocket-events-reference">📡 WebSocket events reference</a></li>
  <li><a href="#roles-and-permissions">🔐 Roles and permissions</a></li>
  <li><a href="#how-each-major-feature-works">🧠 How each major feature works</a></li>
  <li><a href="#how-to-run-the-project-locally">⚙️ How to run the project locally</a></li>
  <li><a href="#environment-variables">🔑 Environment variables</a></li>
  <li><a href="#deployment">🚀 Deployment</a></li>
  <li><a href="#package-dependencies">📦 Package dependencies</a></li>
  <li><a href="#available-scripts">📜 Available scripts</a></li>
  <li><a href="#data-model-and-state">🗄️ Data model and state</a></li>
  <li><a href="#security-and-validation">🛡️ Security and validation</a></li>
  <li><a href="#performance-and-scalability">⚡ Performance and scalability</a></li>
  <li><a href="#testing">🧪 Testing</a></li>
  <li><a href="#code-walkthrough-and-viva-prep">🎓 Code walkthrough and viva prep</a></li>
  <li><a href="#troubleshooting-and-faq">🛠️ Troubleshooting and FAQ</a></li>
  <li><a href="#roadmap-and-bonus-features">🗺️ Roadmap and bonus features</a></li>
  <li><a href="#contributing">🤝 Contributing</a></li>
  <li><a href="#contact">📬 Contact</a></li>
  <li><a href="#license">📄 License</a></li>
  <li><a href="#acknowledgements">🙏 Acknowledgements</a></li>
</ol>

<hr>

<h2 id="what-is-watch-party">🔎 What is Watch Party</h2>

<p>The <b>YouTube Watch Party System</b> is a real-time collaborative streaming platform engineered to synchronize video playback across distributed users. Leveraging full-duplex WebSocket connections and the YouTube IFrame Player API, when a host pauses, plays, seeks across the video timeline, or swaps the active video stream, every participant in the watch room follows simultaneously within milliseconds.</p>

<p>Unlike standard screen-sharing tools that consume high network bandwidth and introduce video compression artifacts, Watch Party coordinates lightweight, timestamped state events over WebSockets. Each participant's local client renders high-definition YouTube video directly from YouTube CDN edge servers while staying synchronized through authoritative backend state coordination.</p>

<p>The system enforces strict Role-Based Access Control (RBAC) across Host, Moderator, and Participant tiers. The room creator automatically receives Host privileges, possessing exclusive rights to promote moderators, transfer room ownership, and kick disruptive users. Joiners enter with Participant status, enjoying synchronized playback, live chat, and floating emoji reactions, while being able to submit action requests for Host or Moderator approval.</p>

<table width="100%" cellpadding="12" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #e2e8f0; background-color: #ffffff;">
  <thead>
    <tr bgcolor="#f8fafc">
      <th align="center">Active User Roles</th>
      <th align="center">WebSocket Events</th>
      <th align="center">REST Endpoints</th>
      <th align="center">Supported Platforms</th>
      <th align="center">Tested Concurrency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><b>4</b> (Host, Mod, Participant, Viewer)</td>
      <td align="center"><b>15</b> Real-Time Contract Events</td>
      <td align="center"><b>8</b> Endpoints (Auth, Rooms, Mailer)</td>
      <td align="center">Desktop (Chrome/Edge/Firefox), iOS, Android</td>
      <td align="center">50+ concurrent sockets per room</td>
    </tr>
  </tbody>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="who-its-for">👥 Who it's for</h2>

<table width="100%" cellpadding="10" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th width="30%" align="left">Audience</th>
    <th width="70%" align="left">Key Benefit</th>
  </tr>
  <tr>
    <td><b>Friends &amp; Long-Distance Communities</b></td>
    <td>Watch trailers, esports streams, music playlists, and shows together synchronously without countdowns or manual alignment.</td>
  </tr>
  <tr>
    <td><b>Remote Teams &amp; Online Classrooms</b></td>
    <td>Host educational webinars and presentation walkthroughs with clear host controls, preventing unauthorized disruption from attendees.</td>
  </tr>
  <tr>
    <td><b>Content Creators &amp; Event Hosts</b></td>
    <td>Delegate playback privileges to trusted moderators, kick disruptive users, and interact via live text chat and emoji reactions.</td>
  </tr>
  <tr>
    <td><b>Regular Viewers &amp; Participants</b></td>
    <td>Enjoy zero-lag synchronized video with low bandwidth consumption, and request video changes via interactive approval notifications.</td>
  </tr>
  <tr>
    <td><b>Engineers &amp; Recruiters Evaluating Code</b></td>
    <td>A real-world showcase of production WebSocket engineering, loop-guard architecture, Object-Oriented design, and strict security validation.</td>
  </tr>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="what-problems-it-solves">⚕️ What problems it solves</h2>

<table width="100%" cellpadding="10" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <thead>
    <tr bgcolor="#f1f5f9">
      <th width="45%" align="left">Traditional Dilemma</th>
      <th width="55%" align="left">How Watch Party Solves It</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Discord / Zoom Screen Share Lag:</b> High CPU load, fuzzy video compression, and 1-3 seconds of stream buffering.</td>
      <td><b>Native YouTube Client Streams:</b> Each client streams directly from YouTube CDN at 1080p/4K; only tiny JSON sync packets travel over WebSockets.</td>
    </tr>
    <tr>
      <td><b>"3-2-1 Play!" Manual Countdowns:</b> Friends attempting to sync playback manually always suffer from human timing errors and network latency drift.</td>
      <td><b>Sub-Second Authoritative Sync:</b> Server synchronizes play, pause, and seek events globally within milliseconds using server timestamps.</td>
    </tr>
    <tr>
      <td><b>Trolling &amp; Playhead Hijacking:</b> In open watch rooms without access control, any participant can pause or skip the video.</td>
      <td><b>Granular Role-Based Access Control:</b> Playback controls are restricted to Host and Moderator. Participant attempts are rejected at the server level.</td>
    </tr>
    <tr>
      <td><b>Late Joiners Out of Sync:</b> Users joining 15 minutes into a video have to ask "What time are you at?"</td>
      <td><b>Authoritative State Snapshot:</b> Server computes elapsed drift and transmits <code>sync_state</code> on connection, jumping late joiners to the exact second.</td>
    </tr>
    <tr>
      <td><b>Recursive WebSocket Feedback Loops:</b> Incoming play commands trigger local player events, echoing infinite loops back to the server.</td>
      <td><b><code>isSyncingRef</code> Mutual Exclusion Guard:</b> Temporarily disables local event emission while processing server state updates.</td>
    </tr>
    <tr>
      <td><b>Complicated Friend Invitations:</b> Forcing friends to install heavy software or register complex accounts before joining.</td>
      <td><b>Instant Links &amp; Nodemailer Invites:</b> Share 1-click room URLs or dispatch HTML email invites directly from the room toolbar.</td>
    </tr>
  </tbody>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="features-by-module">✨ Features by module</h2>

<h3>1. Room Creation &amp; Join Module</h3>
<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Feature</th>
    <th>Description</th>
    <th>Roles Permitted</th>
  </tr>
  <tr>
    <td><b>Create Room</b></td>
    <td>Initializes a new watch party room, generates a unique room code, registers the user as Host, and loads the initial video.</td>
    <td>Any user (Authenticated or Guest)</td>
  </tr>
  <tr>
    <td><b>Join by Code / URL</b></td>
    <td>Users join existing rooms via alphanumeric code or shareable deep link. Joiners default to Participant role.</td>
    <td>Any user</td>
  </tr>
  <tr>
    <td><b>Recent Active Discovery</b></td>
    <td>Displays active public watch rooms on the landing page for instantaneous join.</td>
    <td>Public</td>
  </tr>
</table>

<h3>2. Real-Time Playback Synchronization</h3>
<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Feature</th>
    <th>Description</th>
    <th>Roles Permitted</th>
  </tr>
  <tr>
    <td><b>Synchronized Play</b></td>
    <td>Resumes playback simultaneously on all connected viewports.</td>
    <td>👑 Host, 🛡️ Moderator</td>
  </tr>
  <tr>
    <td><b>Synchronized Pause</b></td>
    <td>Halts playback simultaneously on all screens.</td>
    <td>👑 Host, 🛡️ Moderator</td>
  </tr>
  <tr>
    <td><b>Synchronized Seek</b></td>
    <td>Scrubs the playhead to any timestamp across all clients with 1.8-second tolerance guard.</td>
    <td>👑 Host, 🛡️ Moderator</td>
  </tr>
  <tr>
    <td><b>Video Stream Switching</b></td>
    <td>Parses YouTube URLs or 11-character video IDs and loads the new video synchronously for everyone.</td>
    <td>👑 Host, 🛡️ Moderator</td>
  </tr>
  <tr>
    <td><b>Late-Joiner Alignment</b></td>
    <td>Automatically calculates elapsed stream time and starts playback at the authoritative room position.</td>
    <td>Automatic (All Joiners)</td>
  </tr>
</table>

<h3>3. Role-Based Moderation &amp; Administration</h3>
<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Feature</th>
    <th>Description</th>
    <th>Roles Permitted</th>
  </tr>
  <tr>
    <td><b>Promote to Moderator</b></td>
    <td>Host elevates a Participant to Moderator, unlocking play/pause/seek/video controls for that user.</td>
    <td>👑 Host Only</td>
  </tr>
  <tr>
    <td><b>Demote to Participant</b></td>
    <td>Host revokes moderator privileges, reverting user to watch-only status.</td>
    <td>👑 Host Only</td>
  </tr>
  <tr>
    <td><b>Kick Participant</b></td>
    <td>Host forcibly removes a user from the room; kicked socket receives disconnect alert and redirect.</td>
    <td>👑 Host Only</td>
  </tr>
  <tr>
    <td><b>Transfer Room Ownership</b></td>
    <td>Host passes Host status to a selected user; previous host is safely converted to Moderator.</td>
    <td>👑 Host Only</td>
  </tr>
  <tr>
    <td><b>Auto-Host Succession</b></td>
    <td>If the Host disconnects, the server automatically promotes the next senior participant to Host.</td>
    <td>Automatic</td>
  </tr>
</table>

<h3>4. Interactive Engagement &amp; Communication</h3>
<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Feature</th>
    <th>Description</th>
    <th>Roles Permitted</th>
  </tr>
  <tr>
    <td><b>In-Room Live Chat</b></td>
    <td>Real-time message stream with user badges, autoscroll, and timestamp formatting.</td>
    <td>All Roles</td>
  </tr>
  <tr>
    <td><b>Floating Reactions</b></td>
    <td>Quick-action emoji bar (❤️, 🔥, 👏, 😂, 🎉, 🚀) triggering floating CSS animations over the player.</td>
    <td>All Roles</td>
  </tr>
  <tr>
    <td><b>Action Request Queue</b></td>
    <td>Participants can request video changes; Host/Mod receives toast with 1-click Approve/Reject buttons.</td>
    <td>👤 Participant (Request) / 👑 Host, 🛡️ Mod (Review)</td>
  </tr>
  <tr>
    <td><b>Nodemailer Email Invites</b></td>
    <td>Sends formatted HTML invitations with room join links directly to friends via Gmail SMTP.</td>
    <td>All Roles</td>
  </tr>
</table>

<h3>Assignment Requirement Coverage Matrix</h3>
<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <thead>
    <tr bgcolor="#0f172a">
      <th align="left" style="color: #ffffff;">Requirement Specification</th>
      <th align="center" style="color: #ffffff;">Category</th>
      <th align="center" style="color: #ffffff;">Status</th>
      <th align="left" style="color: #ffffff;">Implementing Code Files</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Real-time play/pause synchronization</td>
      <td align="center">Core</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/utils/socketHandler.js</code>, <code>frontend/src/components/YouTubePlayer.jsx</code></td>
    </tr>
    <tr>
      <td>Real-time seek scrub synchronization</td>
      <td align="center">Core</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/utils/roomManager.js</code>, <code>frontend/src/components/YouTubePlayer.jsx</code></td>
    </tr>
    <tr>
      <td>Change video synchronization</td>
      <td align="center">Core</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/utils/socketHandler.js</code>, <code>frontend/src/pages/WatchRoom.jsx</code></td>
    </tr>
    <tr>
      <td>Room-based model with codes &amp; links</td>
      <td align="center">Core</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/controller/roomController.js</code>, <code>frontend/src/pages/Home.jsx</code></td>
    </tr>
    <tr>
      <td>YouTube IFrame Player integration</td>
      <td align="center">Core</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>frontend/src/components/YouTubePlayer.jsx</code>, <code>frontend/index.html</code></td>
    </tr>
    <tr>
      <td>WebSockets communication (bidirectional)</td>
      <td align="center">Core</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/index.js</code>, <code>backend/utils/socketHandler.js</code>, <code>frontend/src/services/socket.js</code></td>
    </tr>
    <tr>
      <td>Role-based access control (Host, Mod, Participant)</td>
      <td align="center">Core</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/utils/roomManager.js</code>, <code>frontend/src/components/ParticipantList.jsx</code></td>
    </tr>
    <tr>
      <td>Host capability: Assign role (promote/demote)</td>
      <td align="center">Host Action</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/utils/socketHandler.js</code>, <code>frontend/src/components/ParticipantList.jsx</code></td>
    </tr>
    <tr>
      <td>Host capability: Remove participant (Kick)</td>
      <td align="center">Host Action</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/utils/socketHandler.js</code>, <code>frontend/src/components/ParticipantList.jsx</code></td>
    </tr>
    <tr>
      <td>Host capability: Transfer host</td>
      <td align="center">Host Action</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/utils/roomManager.js</code>, <code>frontend/src/components/ParticipantList.jsx</code></td>
    </tr>
    <tr>
      <td>Server-side permission validation before events</td>
      <td align="center">Security</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/utils/roomManager.js</code> (canControlPlayback, isHost)</td>
    </tr>
    <tr>
      <td>Participant must request admin/mod approval</td>
      <td align="center">Functional</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>request_action</code>, <code>resolve_action</code> in <code>socketHandler.js</code> &amp; <code>ParticipantList.jsx</code></td>
    </tr>
    <tr>
      <td>Basic text chat in room</td>
      <td align="center">Bonus</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>frontend/src/components/ChatAndReactions.jsx</code></td>
    </tr>
    <tr>
      <td>Live emoji reactions on key moments</td>
      <td align="center">Bonus</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>frontend/src/components/ChatAndReactions.jsx</code>, <code>frontend/src/index.css</code></td>
    </tr>
    <tr>
      <td>OOP concepts for WebSocket server</td>
      <td align="center">Bonus</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>Participant</code>, <code>RoomSession</code>, <code>RoomManager</code> in <code>backend/utils/roomManager.js</code></td>
    </tr>
    <tr>
      <td>Persistent rooms saved in DB</td>
      <td align="center">Bonus</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td>MongoDB Atlas schema in <code>backend/models/Room.js</code></td>
    </tr>
    <tr>
      <td>User authentication (JWT login/register)</td>
      <td align="center">Bonus</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/controller/authController.js</code>, <code>frontend/src/context/AuthContext.jsx</code></td>
    </tr>
    <tr>
      <td>Nodemailer email sending</td>
      <td align="center">User Requirement</td>
      <td align="center"><span style="color: #059669; font-weight: bold;">Done</span></td>
      <td><code>backend/config/mailer.js</code>, <code>frontend/src/components/InviteModal.jsx</code></td>
    </tr>
    <tr>
      <td>Horizontal scaling with Redis Pub/Sub</td>
      <td align="center">Bonus</td>
      <td align="center"><span style="color: #d97706; font-weight: bold;">Architected</span></td>
      <td>Documented in Section 20 (Planned for multi-server clusters)</td>
    </tr>
  </tbody>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="screenshots">📸 Screenshots</h2>

<table width="100%" cellpadding="10" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/01-home-page.png" alt="Home Page View" width="100%">
      <p><i>Figure 5.1: Landing Page Hero &amp; Active Watch Rooms</i></p>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/02-create-room.png" alt="Create Watch Party View" width="100%">
      <p><i>Figure 5.2: Create Watch Party Modal &amp; YouTube URL Selector</i></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/03-host-controls-view.png" alt="Host Controls View" width="100%">
      <p><i>Figure 5.3: Host View with Active Scrub Bar &amp; Playback Controls</i></p>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/04-participant-restricted-view.png" alt="Participant Restricted View" width="100%">
      <p><i>Figure 5.4: Participant Restricted View with Lock Notification</i></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/05-role-assignment-menu.png" alt="Role Assignment Menu" width="100%">
      <p><i>Figure 5.5: Host Administration Menu (Make Mod / Kick / Transfer)</i></p>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/06-participant-list-badges.png" alt="Participant List with Badges" width="100%">
      <p><i>Figure 5.6: Participant List with Role Badges (👑, 🛡️, 👤)</i></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <img src="docs/screenshots/07-change-video-modal.png" alt="Change Video Modal" width="100%">
      <p><i>Figure 5.7: Synchronized Video Changer Modal</i></p>
    </td>
    <td width="50%" align="center">
      <img src="docs/screenshots/08-live-chat-reactions.png" alt="Live Chat and Reactions" width="100%">
      <p><i>Figure 5.8: Real-Time Chat Stream &amp; Floating Emoji Reactions</i></p>
    </td>
  </tr>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="project-structure">📂 Project structure</h2>

<pre><code>WEB3TASK/
├── backend/                               # Production Node.js + Express WebSocket Server
│   ├── config/                            # External service configurations
│   │   ├── cloudinary.js                  # Cloudinary SDK credentials and setup
│   │   ├── db.js                          # MongoDB Atlas Mongoose connection logic
│   │   └── mailer.js                      # Nodemailer SMTP transporter &amp; email sender
│   ├── controller/                        # Application request controllers (MVC)
│   │   ├── authController.js              # User registration, JWT login, token refresh
│   │   └── roomController.js              # Room creation, discovery, Nodemailer invites
│   ├── middleware/                        # Express middleware filters
│   │   ├── authMiddleware.js              # JWT Bearer verification &amp; optionalAuth
│   │   └── errorMiddleware.js             # 404 handler &amp; centralized error formatting
│   ├── models/                            # Mongoose ORM data schemas
│   │   ├── Room.js                        # Room schema, playback state, embedded participants
│   │   └── User.js                        # User schema, bcrypt hash hook, password compare
│   ├── routes/                            # Express REST API route definitions
│   │   ├── authRoutes.js                  # /api/auth endpoints (register, login, me)
│   │   └── roomRoutes.js                  # /api/rooms endpoints (create, get, list, invite)
│   ├── utils/                             # Core WebSocket domain services &amp; helpers
│   │   ├── jwt.js                         # Access &amp; Refresh JWT generation/verification
│   │   ├── roomManager.js                 # OOP Participant, RoomSession, RoomManager classes
│   │   └── socketHandler.js               # Socket.IO event registrations &amp; RBAC checks
│   ├── .env                               # Server environment variables &amp; database secrets
│   ├── .gitignore                         # Backend git ignore rules
│   ├── index.js                           # Express server, Socket.IO &amp; port fallback entry
│   └── package.json                       # Backend scripts and dependencies
├── frontend/                              # Client Single-Page Application (SPA)
│   ├── src/                               # Frontend source root
│   │   ├── components/                    # Reusable React components
│   │   │   ├── ChatAndReactions.jsx       # Real-time text chat &amp; animated floating emojis
│   │   │   ├── InviteModal.jsx            # Deep-link clipboard copy &amp; Nodemailer email invite
│   │   │   ├── Navbar.jsx                 # Top brand bar, room code pill &amp; login modal
│   │   │   ├── ParticipantList.jsx        # Presence list with badges &amp; Host admin menu
│   │   │   └── YouTubePlayer.jsx          # Synchronized player with isSyncingRef loop guard
│   │   ├── context/                       # Global state providers
│   │   │   └── AuthContext.jsx            # JWT authentication, user profile &amp; guest state
│   │   ├── pages/                         # Route view pages
│   │   │   ├── AuthModal.jsx              # Tabbed Sign In, Sign Up, and Guest nickname modal
│   │   │   ├── Home.jsx                   # Hero landing, room creator, code joiner &amp; party list
│   │   │   └── WatchRoom.jsx              # Theater view orchestrating socket events &amp; sync
│   │   ├── services/                      # API &amp; WebSocket transport services
│   │   │   ├── api.js                     # Axios HTTP client with JWT interceptor &amp; fallback
│   │   │   └── socket.js                  # Socket.IO client singleton with port fallback
│   │   ├── App.jsx                        # Root application component &amp; hash router
│   │   ├── index.css                      # Tailwind CSS v4 entry (@import "tailwindcss")
│   │   └── main.jsx                       # React DOM root entry point
│   ├── index.html                         # Root HTML document with YouTube IFrame script
│   ├── package.json                       # Frontend build dependencies &amp; scripts
│   ├── vercel.json                        # Vercel SPA routing rewrite rules
│   └── vite.config.js                     # Vite 6 config with @tailwindcss/vite plugin
├── docs/                                  # Documentation assets &amp; diagrams
│   ├── assets/                            # Brand assets (logo.svg)
│   ├── diagrams/                          # 13 Standalone hand-authored architectural SVGs
│   └── screenshots/                       # High-resolution UI captures &amp; guide
├── .gitignore                             # Monorepo root git ignore rules
├── package.json                           # Root workspace orchestrator
├── vercel.json                            # Monorepo Vercel deployment configuration
└── README.md                              # Authoritative documentation manual
</code></pre>

<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Folder / Module</th>
    <th>Primary Architectural Responsibility</th>
  </tr>
  <tr>
    <td><code>backend/config/</code></td>
    <td>Initializes persistent database connections (Mongoose) and third-party transport services (Nodemailer, Cloudinary).</td>
  </tr>
  <tr>
    <td><code>backend/controller/</code></td>
    <td>Handles stateless HTTP requests, parses payloads, invokes models, and returns structured JSON responses.</td>
  </tr>
  <tr>
    <td><code>backend/utils/roomManager.js</code></td>
    <td>Houses the authoritative in-memory Object-Oriented state engine, calculating video drift, managing participant classes, and enforcing RBAC rules.</td>
  </tr>
  <tr>
    <td><code>backend/utils/socketHandler.js</code></td>
    <td>Listens for incoming Socket.IO events, authenticates caller roles via <code>RoomSession</code>, updates state, and broadcasts events.</td>
  </tr>
  <tr>
    <td><code>frontend/src/components/YouTubePlayer.jsx</code></td>
    <td>Interfaces directly with the YouTube IFrame API, rendering custom controls and executing loop-guarded sync updates.</td>
  </tr>
  <tr>
    <td><code>frontend/src/services/</code></td>
    <td>Provides resilient network communication singletons (Axios and Socket.IO) featuring automatic port conflict retry routines.</td>
  </tr>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="tech-stack">💻 Tech stack</h2>

<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <thead>
    <tr bgcolor="#0f172a">
      <th style="color: #ffffff;">Layer</th>
      <th style="color: #ffffff;">Technology</th>
      <th style="color: #ffffff;">Version</th>
      <th style="color: #ffffff;">Engineering Rationale</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Frontend UI</b></td>
      <td>React</td>
      <td>19.0.0</td>
      <td>Declarative component architecture; provides reactive state synchronization for fast-updating video playback interfaces.</td>
    </tr>
    <tr>
      <td><b>Frontend Tooling</b></td>
      <td>Vite</td>
      <td>6.1.0</td>
      <td>Near-instantaneous Hot Module Replacement (HMR) and optimized Rollup production bundling (392 kB minified).</td>
    </tr>
    <tr>
      <td><b>Styling</b></td>
      <td>Tailwind CSS</td>
      <td>v4.0.0</td>
      <td>Modern CSS engine with <code>@tailwindcss/vite</code>; eliminates stylesheet bloat and provides dark-mode color tokens.</td>
    </tr>
    <tr>
      <td><b>Icons</b></td>
      <td>Lucide React</td>
      <td>0.475.0</td>
      <td>Clean, accessible SVG iconography for player controls, role indicators, and chat interactions.</td>
    </tr>
    <tr>
      <td><b>Backend Server</b></td>
      <td>Node.js / Express</td>
      <td>24.14 / 4.21.2</td>
      <td>Lightweight, asynchronous event loop ideal for high-throughput I/O and concurrent WebSocket connection handling.</td>
    </tr>
    <tr>
      <td><b>Real-Time Sync</b></td>
      <td>Socket.IO</td>
      <td>4.8.1</td>
      <td>Low-latency bidirectional WebSocket engine with automatic fallback to HTTP long-polling, heartbeat pinging, and room multiplexing.</td>
    </tr>
    <tr>
      <td><b>Database</b></td>
      <td>MongoDB Atlas + Mongoose</td>
      <td>8.9.5</td>
      <td>Document-oriented database providing schema validation, embedded participant records, and persistent room state.</td>
    </tr>
    <tr>
      <td><b>Email Delivery</b></td>
      <td>Nodemailer</td>
      <td>6.10.0</td>
      <td>Direct SMTP transport integration dispatching responsive HTML room invitations with fallback logging.</td>
    </tr>
    <tr>
      <td><b>Video Player</b></td>
      <td>YouTube IFrame Player API</td>
      <td>v3</td>
      <td>Official controllable embed player enabling programmatic play, pause, seek, volume, and state listeners.</td>
    </tr>
    <tr>
      <td><b>Authentication</b></td>
      <td>JWT + Bcrypt.js</td>
      <td>9.0.2 / 3.0.2</td>
      <td>Stateless, signed access and refresh tokens paired with salted password hashing (10 rounds).</td>
    </tr>
  </tbody>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="system-architecture-and-diagrams">🏗️ System architecture and diagrams</h2>

<p>The system operates on an event-driven, bidirectional client-server topology. The backend acts as the single source of truth for room playback state and participant permissions, maintaining active sessions in an in-memory OOP registry while asynchronously persisting snapshots to MongoDB Atlas.</p>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/system-architecture.svg" alt="System Architecture Diagram" width="100%">
  <p align="center"><i>Figure 8.1: Full-Stack Component Topology &amp; Transport Protocols</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/websocket-event-flow.svg" alt="WebSocket Event Flow Diagram" width="100%">
  <p align="center"><i>Figure 8.2: WebSocket Event Lifecycle &amp; State Synchronization Pipeline</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/rbac-permission-matrix.svg" alt="RBAC Permission Matrix Diagram" width="100%">
  <p align="center"><i>Figure 8.3: Role-Based Access Control (RBAC) Authoritative Matrix</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/workflow-create-join-room.svg" alt="Workflow Create and Join Room Diagram" width="100%">
  <p align="center"><i>Figure 8.4: Workflow for Room Creation, Deep Link Invitation, &amp; Participant Join</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/workflow-playback-sync.svg" alt="Workflow Playback Sync Diagram" width="100%">
  <p align="center"><i>Figure 8.5: Playback Synchronization &amp; Loop-Guard Execution Engine</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/workflow-role-assignment.svg" alt="Workflow Role Assignment Diagram" width="100%">
  <p align="center"><i>Figure 8.6: Role Promotion, Host Succession, &amp; Kick Action Pipeline</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/sequence-join-and-play.svg" alt="Sequence Diagram Join and Play" width="100%">
  <p align="center"><i>Figure 8.7: Real-Time Sequence Flow across Host, Participant, &amp; WebSocket Server</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/use-case-diagram.svg" alt="Use Case Diagram" width="100%">
  <p align="center"><i>Figure 8.8: System Boundaries &amp; Actor Capability Associations</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/class-diagram.svg" alt="Class Diagram" width="100%">
  <p align="center"><i>Figure 8.9: Backend Object-Oriented Domain Classes &amp; Data Structures</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/room-lifecycle.svg" alt="Room Lifecycle Diagram" width="100%">
  <p align="center"><i>Figure 8.10: Finite State Machine for Room and Participant Lifecycles</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/dfd-level-0.svg" alt="DFD Level 0 Diagram" width="100%">
  <p align="center"><i>Figure 8.11: Data Flow Diagram (DFD Level 0) Context Overview</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/deployment-diagram.svg" alt="Deployment Diagram" width="100%">
  <p align="center"><i>Figure 8.12: Production Cloud Deployment Infrastructure Topology</i></p>
</div>

<div align="center" style="margin: 24px 0;">
  <img src="docs/diagrams/er-diagram.svg" alt="ER Diagram" width="100%">
  <p align="center"><i>Figure 8.13: Entity-Relationship Diagram (ERD) for MongoDB Atlas Collections</i></p>
</div>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="how-websockets-power-the-sync">🔌 How WebSockets power the sync</h2>

<p>Standard HTTP polling introduces high request overhead and 1-3 seconds of network latency, making real-time synchronized scrubbing impossible. WebSockets maintain a persistent, bidirectional TCP connection between clients and the Node.js server.</p>

<ol>
  <li><b>Channel Multiplexing (Rooms):</b> Upon connecting, clients emit <code>join_room</code> with a target <code>roomId</code>. The server executes <code>socket.join(roomId)</code>, isolating events within that room channel without cross-party interference.</li>
  <li><b>Server as Single Source of Truth:</b> The server's <code>RoomSession</code> class holds the authoritative playback state: <code>currentVideoId</code>, <code>playState</code> ('playing' | 'paused'), <code>currentTime</code> (seconds), and <code>lastUpdatedAt</code> (epoch timestamp).</li>
  <li><b>Dynamic Drift Calculation for Late Joiners:</b> When a participant joins an active stream, the server computes elapsed playback time:
    <br><code>currentTime = lastKnownTime + ((Date.now() - lastUpdatedAt) / 1000)</code>
    <br>The joining client receives this snapshot via <code>sync_state</code>, immediately seeking the YouTube player to the exact second.
  </li>
  <li><b>Eliminating Ping-Pong Loops:</b> When User A plays, the server broadcasts <code>sync_state</code> to User B. User B's player updates, which natively fires an <code>onStateChange</code> event. If unmanaged, User B's client would emit another <code>play</code> event back to the server, causing an endless feedback loop. The frontend implements an <b><code>isSyncingRef</code> guard flag</b> that ignores local player events during incoming sync updates.</li>
  <li><b>1.8-Second Seek Threshold:</b> To prevent micro-stutters and audio crackling caused by normal TCP packet variance, incoming seek commands are only executed if the discrepancy between the local player position and the server timestamp exceeds 1.8 seconds.</li>
</ol>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="websocket-events-reference">📡 WebSocket events reference</h2>

<details open>
  <summary><b>Client-to-Server Events</b> (Click to expand / collapse)</summary>
  <table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1; margin-top: 10px;">
    <tr bgcolor="#f8fafc">
      <th>Event Name</th>
      <th>Payload Format</th>
      <th>Required Role</th>
      <th>Server Validation &amp; Error Response</th>
      <th>Broadcast Result</th>
    </tr>
    <tr>
      <td><code>join_room</code></td>
      <td><code>{ roomId, username, userId }</code></td>
      <td>Any</td>
      <td>Requires valid <code>roomId</code>; returns <code>error_message</code> if missing.</td>
      <td>Emits <code>sync_state</code> and <code>role_assigned</code> to joining socket; broadcasts <code>user_joined</code> to room.</td>
    </tr>
    <tr>
      <td><code>leave_room</code></td>
      <td><code>{ roomId }</code></td>
      <td>Any</td>
      <td>Validates active socket association in room session.</td>
      <td>Broadcasts <code>user_left</code> with updated participant list.</td>
    </tr>
    <tr>
      <td><code>play</code></td>
      <td><code>{ roomId }</code></td>
      <td>👑 Host, 🛡️ Mod</td>
      <td>Rejects Participant with <code>error_message</code>: "Permission denied: Only Host or Moderator can start playback."</td>
      <td>Broadcasts <code>sync_state</code> with <code>playState: 'playing'</code> to room.</td>
    </tr>
    <tr>
      <td><code>pause</code></td>
      <td><code>{ roomId }</code></td>
      <td>👑 Host, 🛡️ Mod</td>
      <td>Rejects Participant with <code>error_message</code>: "Permission denied: Only Host or Moderator can pause playback."</td>
      <td>Broadcasts <code>sync_state</code> with <code>playState: 'paused'</code> to room.</td>
    </tr>
    <tr>
      <td><code>seek</code></td>
      <td><code>{ roomId, time }</code></td>
      <td>👑 Host, 🛡️ Mod</td>
      <td>Validates numerical <code>time &gt;= 0</code>; rejects unauthorized caller.</td>
      <td>Broadcasts <code>sync_state</code> with updated <code>currentTime</code>.</td>
    </tr>
    <tr>
      <td><code>change_video</code></td>
      <td><code>{ roomId, videoId }</code></td>
      <td>👑 Host, 🛡️ Mod</td>
      <td>Validates 11-char <code>videoId</code>; rejects unauthorized callers.</td>
      <td>Broadcasts <code>sync_state</code> with new <code>videoId</code> and resets <code>currentTime: 0</code>.</td>
    </tr>
    <tr>
      <td><code>assign_role</code></td>
      <td><code>{ roomId, userId, role }</code></td>
      <td>👑 Host Only</td>
      <td>Rejects non-host with <code>error_message</code>: "Only the Host can assign roles." Validates role in ['moderator', 'participant', 'viewer'].</td>
      <td>Broadcasts <code>role_assigned</code> with new role and updated participant array.</td>
    </tr>
    <tr>
      <td><code>remove_participant</code></td>
      <td><code>{ roomId, userId }</code></td>
      <td>👑 Host Only</td>
      <td>Rejects non-host; rejects attempt to remove Host.</td>
      <td>Emits <code>participant_removed</code> with <code>kicked: true</code> to target socket; broadcasts updated list to room.</td>
    </tr>
    <tr>
      <td><code>transfer_host</code></td>
      <td><code>{ roomId, userId }</code></td>
      <td>👑 Host Only</td>
      <td>Validates caller is current Host and target exists in session.</td>
      <td>Broadcasts <code>host_transferred</code> with <code>oldHost</code> and <code>newHost</code> records.</td>
    </tr>
    <tr>
      <td><code>request_action</code></td>
      <td><code>{ roomId, actionType, payload }</code></td>
      <td>👤 Participant</td>
      <td>Generates pending request object with unique request ID.</td>
      <td>Emits <code>action_requested</code> to Host and Moderators.</td>
    </tr>
    <tr>
      <td><code>resolve_action</code></td>
      <td><code>{ roomId, requestId, approved }</code></td>
      <td>👑 Host, 🛡️ Mod</td>
      <td>Validates caller authority to approve; executes action if approved.</td>
      <td>Broadcasts <code>action_resolved</code>; automatically dispatches sync update if approved.</td>
    </tr>
    <tr>
      <td><code>chat_message</code></td>
      <td><code>{ roomId, message, username }</code></td>
      <td>Any</td>
      <td>Trims text; rejects empty message payloads.</td>
      <td>Broadcasts <code>chat_message</code> with timestamp and message ID to room.</td>
    </tr>
    <tr>
      <td><code>reaction</code></td>
      <td><code>{ roomId, emoji, username }</code></td>
      <td>Any</td>
      <td>Validates emoji string.</td>
      <td>Broadcasts <code>reaction</code> to room for floating animation.</td>
    </tr>
  </table>
</details>

<details open>
  <summary><b>Server-to-Client Events</b> (Click to expand / collapse)</summary>
  <table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1; margin-top: 10px;">
    <tr bgcolor="#f8fafc">
      <th>Event Name</th>
      <th>Payload Format</th>
      <th>Trigger Condition</th>
      <th>Client Action Taken</th>
    </tr>
    <tr>
      <td><code>sync_state</code></td>
      <td><code>{ videoId, playState, currentTime, lastUpdatedAt }</code></td>
      <td>State transition or new participant join</td>
      <td>Enables loop-guard, checks drift &gt; 1.8s, seeks player, updates play/pause state.</td>
    </tr>
    <tr>
      <td><code>role_assigned</code></td>
      <td><code>{ userId, username, role, participants }</code></td>
      <td>Role promotion, demotion, or initial assignment</td>
      <td>Updates local user role badge; unlocks or locks custom player controls.</td>
    </tr>
    <tr>
      <td><code>user_joined</code></td>
      <td><code>{ username, userId, role, participants }</code></td>
      <td>New socket connects to room</td>
      <td>Appends user to sidebar list; posts system chat notice.</td>
    </tr>
    <tr>
      <td><code>user_left</code></td>
      <td><code>{ username, userId, participants }</code></td>
      <td>Socket disconnects or emits leave_room</td>
      <td>Removes user from sidebar list; posts system chat notice.</td>
    </tr>
    <tr>
      <td><code>participant_removed</code></td>
      <td><code>{ userId, participants, kicked, message }</code></td>
      <td>Host executes kick action</td>
      <td>If targeted user: displays alert and routes to Home. If others: updates participant list.</td>
    </tr>
    <tr>
      <td><code>host_transferred</code></td>
      <td><code>{ oldHost, newHost, participants }</code></td>
      <td>Host transfers ownership</td>
      <td>Moves crown icon to new Host; updates local permissions accordingly.</td>
    </tr>
    <tr>
      <td><code>action_requested</code></td>
      <td><code>{ id, requesterUserId, username, actionType, payload }</code></td>
      <td>Participant submits action request</td>
      <td>Displays interactive approval card to Host and Moderators.</td>
    </tr>
    <tr>
      <td><code>action_resolved</code></td>
      <td><code>{ request, approved, reviewedBy }</code></td>
      <td>Host/Mod reviews request</td>
      <td>Notifies requester via toast; removes card from queue.</td>
    </tr>
    <tr>
      <td><code>error_message</code></td>
      <td><code>{ message }</code></td>
      <td>Permission violation or invalid input</td>
      <td>Displays toast notification indicating why action was blocked.</td>
    </tr>
  </table>
</details>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="roles-and-permissions">🔐 Roles and permissions</h2>

<p>Every privileged event is verified strictly on the <b>backend</b> inside <code>RoomSession</code> class methods before any room state is altered. Even if a user bypasses client UI locks, the backend rejects the request.</p>

<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#0f172a">
    <th style="color: #ffffff;">Capability</th>
    <th align="center" style="color: #f59e0b;">👑 Host</th>
    <th align="center" style="color: #6366f1;">🛡️ Moderator</th>
    <th align="center" style="color: #10b981;">👤 Participant</th>
    <th align="center" style="color: #64748b;">👁️ Viewer</th>
  </tr>
  <tr>
    <td><b>Start / Resume Playback</b></td>
    <td align="center">✅ Full</td>
    <td align="center">✅ Full</td>
    <td align="center">❌ Request Approval</td>
    <td align="center">❌ Denied</td>
  </tr>
  <tr>
    <td><b>Pause Playback</b></td>
    <td align="center">✅ Full</td>
    <td align="center">✅ Full</td>
    <td align="center">❌ Request Approval</td>
    <td align="center">❌ Denied</td>
  </tr>
  <tr>
    <td><b>Seek / Scrub Timeline</b></td>
    <td align="center">✅ Full</td>
    <td align="center">✅ Full</td>
    <td align="center">❌ Denied</td>
    <td align="center">❌ Denied</td>
  </tr>
  <tr>
    <td><b>Change Video Stream</b></td>
    <td align="center">✅ Full</td>
    <td align="center">✅ Full</td>
    <td align="center">❌ Request Approval</td>
    <td align="center">❌ Denied</td>
  </tr>
  <tr>
    <td><b>Assign / Change Roles</b></td>
    <td align="center">✅ Full</td>
    <td align="center">❌ Denied</td>
    <td align="center">❌ Denied</td>
    <td align="center">❌ Denied</td>
  </tr>
  <tr>
    <td><b>Kick / Remove Participant</b></td>
    <td align="center">✅ Full</td>
    <td align="center">❌ Denied</td>
    <td align="center">❌ Denied</td>
    <td align="center">❌ Denied</td>
  </tr>
  <tr>
    <td><b>Transfer Room Ownership</b></td>
    <td align="center">✅ Full</td>
    <td align="center">❌ Denied</td>
    <td align="center">❌ Denied</td>
    <td align="center">❌ Denied</td>
  </tr>
  <tr>
    <td><b>Approve Action Requests</b></td>
    <td align="center">✅ Full</td>
    <td align="center">✅ Full</td>
    <td align="center">❌ Denied</td>
    <td align="center">❌ Denied</td>
  </tr>
  <tr>
    <td><b>In-Room Chat &amp; Reactions</b></td>
    <td align="center">✅ Full</td>
    <td align="center">✅ Full</td>
    <td align="center">✅ Full</td>
    <td align="center">✅ Full</td>
  </tr>
</table>

<p><b>Host Succession Rule:</b> The room creator is designated default Admin. Host actions cannot be performed by others. If the Host intentionally leaves or disconnects, the server automatically promotes the next participant in the room session to Host, ensuring watch sessions never become leaderless.</p>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="how-each-major-feature-works">🧠 How each major feature works</h2>

<ol>
  <li><b>Creating a Room and Becoming Host:</b>
    <ul>
      <li>User enters a room title and optional YouTube URL on the Home landing page.</li>
      <li>Frontend issues <code>POST /api/rooms</code> with <code>{ title, videoUrl, username }</code>.</li>
      <li>Backend controller (<code>roomController.js</code>) parses the 11-character video ID, generates a short unique code (e.g., <code>room-7f2a1b</code>) via <code>crypto.randomBytes(3).toString('hex')</code>, and saves the room document in MongoDB Atlas.</li>
      <li><code>roomManager.createOrGetRoom()</code> instantiates an in-memory <code>RoomSession</code>.</li>
      <li>Browser navigates to <code>/#room=room-7f2a1b</code>, connects the Socket.IO client, and emits <code>join_room</code>.</li>
      <li>Since the participant set was empty, the server automatically marks this user as <code>role: 'host'</code>.</li>
    </ul>
  </li>
  <li><b>Joining by Code or Link as Participant:</b>
    <ul>
      <li>Joiner clicks a shared link (<code>/#room=room-7f2a1b</code>) or inputs the code on the Home page.</li>
      <li>Frontend connects to Socket.IO and emits <code>join_room { roomId, username, userId }</code>.</li>
      <li>Server's <code>RoomSession.addParticipant()</code> verifies existing participants; since a Host already exists, this user is assigned <code>role: 'participant'</code>.</li>
      <li>Server immediately emits <code>sync_state</code> and <code>role_assigned</code> to the joiner socket, and broadcasts <code>user_joined</code> to existing room members.</li>
    </ul>
  </li>
  <li><b>Play / Pause Synchronization:</b>
    <ul>
      <li>Host or Moderator clicks the Play/Pause button on the custom control bar.</li>
      <li>Client emits <code>play { roomId }</code> or <code>pause { roomId }</code>.</li>
      <li>Server identifies caller socket; <code>canControlPlayback()</code> verifies Host or Moderator status.</li>
      <li><code>RoomSession</code> transitions <code>playState</code> and records <code>lastUpdatedAt = Date.now()</code>.</li>
      <li>Server broadcasts <code>sync_state</code> to all room sockets via <code>io.to(roomId).emit('sync_state', ...)</code>.</li>
      <li>Each client's <code>YouTubePlayer</code> activates <code>isSyncingRef = true</code>, calls <code>player.playVideo()</code> or <code>player.pauseVideo()</code>, and clears the guard after 500ms.</li>
    </ul>
  </li>
  <li><b>Seek Scrub Synchronization:</b>
    <ul>
      <li>Host or Moderator drags the progress slider or clicks skip buttons (+10s / -10s).</li>
      <li>Client emits <code>seek { roomId, time: targetSeconds }</code>.</li>
      <li>Server verifies caller role, updates <code>currentTime</code> in <code>RoomSession</code>, and broadcasts <code>sync_state</code>.</li>
      <li>Receiving clients calculate drift: <code>Math.abs(localCurrentTime - serverTime)</code>. If drift exceeds 1.8 seconds, client calls <code>player.seekTo(serverTime, true)</code>.</li>
    </ul>
  </li>
  <li><b>Change Video Synchronization:</b>
    <ul>
      <li>Host or Moderator opens the "Change Video" modal, inputs a new YouTube link or ID, and submits.</li>
      <li>Client emits <code>change_video { roomId, videoId }</code>.</li>
      <li>Server verifies role, sets <code>currentVideoId = videoId</code>, resets <code>currentTime = 0</code>, sets <code>playState = 'playing'</code>, and updates MongoDB.</li>
      <li>Server broadcasts <code>sync_state</code>. All connected clients invoke <code>player.loadVideoById({ videoId, startSeconds: 0 })</code>.</li>
    </ul>
  </li>
  <li><b>Late-Joiner State Alignment:</b>
    <ul>
      <li>When a user joins 20 minutes into a live party, server evaluates:
        <br><code>estimatedTime = currentTime + ((Date.now() - lastUpdatedAt) / 1000)</code>
      </li>
      <li>The joiner's player immediately loads the video and seeks to <code>estimatedTime</code>, keeping all screens in sync.</li>
    </ul>
  </li>
  <li><b>Assigning Roles &amp; Broadcasting:</b>
    <ul>
      <li>Host selects a user in the participant list and clicks "Make Moderator" or "Demote to Participant".</li>
      <li>Client emits <code>assign_role { roomId, userId, role: 'moderator' }</code>.</li>
      <li>Server checks <code>requester.isHost()</code>. If true, updates <code>target.role = 'moderator'</code> and updates MongoDB.</li>
      <li>Server broadcasts <code>role_assigned</code> to all room members. The target user's UI unlocks playback controls immediately.</li>
    </ul>
  </li>
  <li><b>Kicking a Participant:</b>
    <ul>
      <li>Host clicks "Remove Participant" on a selected user.</li>
      <li>Client emits <code>remove_participant { roomId, userId }</code>.</li>
      <li>Server checks <code>requester.isHost()</code>, disallows removing Host, and deletes user from room maps.</li>
      <li>Server emits <code>participant_removed { kicked: true }</code> to target socket, forcing disconnect and navigation to Home.</li>
      <li>Server broadcasts updated participant array to remaining room members.</li>
    </ul>
  </li>
  <li><b>Transferring Host Ownership:</b>
    <ul>
      <li>Host clicks "Transfer Host" on a participant.</li>
      <li>Client emits <code>transfer_host { roomId, userId }</code>.</li>
      <li>Server sets <code>oldHost.role = 'moderator'</code> and <code>newHost.role = 'host'</code>.</li>
      <li>Server broadcasts <code>host_transferred</code>. The UI moves the crown badge to the new Host.</li>
    </ul>
  </li>
  <li><b>Participant Action Approval Workflow:</b>
    <ul>
      <li>Participant attempts to change video or clicks "Request Permission".</li>
      <li>Client emits <code>request_action { roomId, actionType: 'change_video', payload: { videoId } }</code>.</li>
      <li>Server enqueues request and emits <code>action_requested</code> to Host and Moderators.</li>
      <li>Host/Mod clicks "Approve" (emits <code>resolve_action { requestId, approved: true }</code>).</li>
      <li>Server executes the video change automatically and broadcasts <code>sync_state</code> to the party.</li>
    </ul>
  </li>
</ol>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="how-to-run-the-project-locally">⚙️ How to run the project locally</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js version 18.x, 20.x, or 24.x (Tested on Node <code>v24.14.1</code>)</li>
  <li>npm package manager version 10.x or 11.x</li>
  <li>Internet connectivity for YouTube IFrame API and MongoDB Atlas access</li>
</ul>

<h3>Step-by-Step Installation</h3>

<ol>
  <li><b>Clone or Navigate to the Workspace:</b>
<pre><code>cd WEB3TASK</code></pre>
  </li>

  <li><b>Install Backend Dependencies:</b>
<pre><code>cd backend
npm install</code></pre>
  </li>

  <li><b>Install Frontend Dependencies:</b>
<pre><code>cd ../frontend
npm install
cd ..</code></pre>
  </li>

  <li><b>Configure Environment Variables:</b>
    <p>Ensure <code>backend/.env</code> and <code>frontend/.env</code> are configured as detailed in Section 14.</p>
  </li>

  <li><b>Start Backend &amp; Frontend Servers:</b>
    <p><b>Terminal 1 (Backend WebSocket Server):</b></p>
<pre><code>cd backend
npm start</code></pre>
    <p><i>Server starts on <code>http://localhost:5000</code> (or automatically falls back to <code>5001</code> if port 5000 is occupied).</i></p>

    <p><b>Terminal 2 (Frontend React App):</b></p>
<pre><code>cd frontend
npm run dev</code></pre>
    <p><i>Vite dev server starts on <code>http://localhost:5173</code>.</i></p>
  </li>

  <li><b>Test Multi-User Synchronization Across Two Windows:</b>
    <ul>
      <li>Open Window 1 (Standard): Navigate to <code>http://localhost:5173</code>, create a party as "Alice (Host)". Copy the room code.</li>
      <li>Open Window 2 (Incognito): Navigate to <code>http://localhost:5173</code>, enter the room code as "Bob (Participant)".</li>
      <li>Click Play, Pause, or Seek in Window 1: Window 2 follows in synchronized real-time!</li>
      <li>Attempt to Seek in Window 2: Restricted notice appears, proving role enforcement!</li>
      <li>Promote Bob to Moderator in Window 1: Window 2 controls unlock immediately!</li>
    </ul>
  </li>
</ol>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="environment-variables">🔑 Environment variables</h2>

<h3>Backend Environment Variables (<code>backend/.env</code>)</h3>
<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Variable</th>
    <th>Required</th>
    <th>Example / Value Format</th>
    <th>Description</th>
    <th>Used In</th>
  </tr>
  <tr>
    <td><code>PORT</code></td>
    <td>Yes</td>
    <td><code>5000</code></td>
    <td>HTTP and WebSocket server port (auto-falls back if taken).</td>
    <td><code>backend/index.js</code></td>
  </tr>
  <tr>
    <td><code>MONGODB_URI</code></td>
    <td>Yes</td>
    <td><code>mongodb://user:pass@shard-00.mongodb.net:27017/?ssl=true</code></td>
    <td>MongoDB Atlas connection string with replica set parameters.</td>
    <td><code>backend/config/db.js</code></td>
  </tr>
  <tr>
    <td><code>JWT_SECRET</code></td>
    <td>Yes</td>
    <td><code>your_jwt_access_secret_key_at_least_64_chars</code></td>
    <td>Cryptographic key for signing user authentication access tokens.</td>
    <td><code>backend/utils/jwt.js</code></td>
  </tr>
  <tr>
    <td><code>JWT_REFRESH_SECRET</code></td>
    <td>Yes</td>
    <td><code>your_jwt_refresh_secret_key_at_least_64_chars</code></td>
    <td>Cryptographic key for signing refresh session tokens.</td>
    <td><code>backend/utils/jwt.js</code></td>
  </tr>
  <tr>
    <td><code>NODE_ENV</code></td>
    <td>No</td>
    <td><code>development</code> | <code>production</code></td>
    <td>Application runtime environment mode.</td>
    <td><code>backend/index.js</code></td>
  </tr>
  <tr>
    <td><code>EMAIL_USER</code></td>
    <td>Yes</td>
    <td><code>techfusion9560@gmail.com</code></td>
    <td>Gmail account address for Nodemailer SMTP delivery.</td>
    <td><code>backend/config/mailer.js</code></td>
  </tr>
  <tr>
    <td><code>EMAIL_PASS</code></td>
    <td>Yes</td>
    <td><code>your_16_character_app_password</code></td>
    <td>Google account 16-character App Password (not login password).</td>
    <td><code>backend/config/mailer.js</code></td>
  </tr>
  <tr>
    <td><code>CLOUDINARY_API_KEY</code></td>
    <td>No</td>
    <td><code>519328666166445</code></td>
    <td>Cloudinary API credentials for user profile media.</td>
    <td><code>backend/config/cloudinary.js</code></td>
  </tr>
  <tr>
    <td><code>CLOUDINARY_API_SECRET</code></td>
    <td>No</td>
    <td><code>your_cloudinary_api_secret</code></td>
    <td>Cloudinary API secret key.</td>
    <td><code>backend/config/cloudinary.js</code></td>
  </tr>
  <tr>
    <td><code>CLOUDINARY_CLOUD_NAME</code></td>
    <td>No</td>
    <td><code>zwhenx4q</code></td>
    <td>Cloudinary registered cloud name.</td>
    <td><code>backend/config/cloudinary.js</code></td>
  </tr>
  <tr>
    <td><code>CLIENT_URL</code></td>
    <td>No</td>
    <td><code>http://localhost:5173</code></td>
    <td>Allowed CORS frontend origin and base URL for invite links.</td>
    <td><code>backend/index.js</code></td>
  </tr>
</table>

<h3>Frontend Environment Variables (<code>frontend/.env</code>)</h3>
<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Variable</th>
    <th>Required</th>
    <th>Example / Value Format</th>
    <th>Description</th>
    <th>Used In</th>
  </tr>
  <tr>
    <td><code>VITE_API_URL</code></td>
    <td>Yes</td>
    <td><code>http://localhost:5000</code></td>
    <td>Base URL for Express REST API endpoints.</td>
    <td><code>frontend/src/services/api.js</code></td>
  </tr>
  <tr>
    <td><code>VITE_SOCKET_URL</code></td>
    <td>Yes</td>
    <td><code>http://localhost:5000</code></td>
    <td>Host target for Socket.IO WebSocket gateway.</td>
    <td><code>frontend/src/services/socket.js</code></td>
  </tr>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="deployment">🚀 Deployment</h2>

<div style="background-color: #eff6ff; border-left: 5px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 4px;">
  <p><b>Public Production Deployment:</b></p>
  <p><b>Live Application URL:</b> <a href="YOUR_LIVE_URL_HERE">YOUR_LIVE_URL_HERE</a></p>
  <p><b>WebSocket Backend Service:</b> <a href="YOUR_BACKEND_URL_HERE">YOUR_BACKEND_URL_HERE</a></p>
</div>

<h3>Frontend Deployment on Vercel</h3>
<ol>
  <li>Connect your repository to <a href="https://vercel.com">Vercel</a>.</li>
  <li>Set <b>Root Directory</b> to <code>frontend</code>.</li>
  <li>Build Command: <code>npm run build</code></li>
  <li>Output Directory: <code>dist</code></li>
  <li>Configure Environment Variables in Vercel Dashboard:
    <ul>
      <li><code>VITE_API_URL</code> = <code>https://your-backend-app.onrender.com</code></li>
      <li><code>VITE_SOCKET_URL</code> = <code>https://your-backend-app.onrender.com</code></li>
    </ul>
  </li>
  <li>Deploy! (<code>frontend/vercel.json</code> includes SPA rewrites to ensure direct route links like <code>/#room=id</code> load seamlessly).</li>
</ol>

<h3>WebSocket Backend Deployment on Render / Railway</h3>
<ol>
  <li>Create a new <b>Web Service</b> on <a href="https://render.com">Render</a> or <a href="https://railway.app">Railway</a>.</li>
  <li>Set <b>Root Directory</b> to <code>backend</code>.</li>
  <li>Runtime: <b>Node</b></li>
  <li>Build Command: <code>npm install</code></li>
  <li>Start Command: <code>node index.js</code></li>
  <li>Add Environment Variables: <code>PORT=5000</code>, <code>MONGODB_URI</code>, <code>JWT_SECRET</code>, <code>EMAIL_USER</code>, <code>EMAIL_PASS</code>, and set <code>CLIENT_URL</code> to your live Vercel domain.</li>
  <li><i>Architecture Note:</i> Vercel serverless functions cannot maintain persistent TCP WebSocket connections. Therefore, the Socket.IO server must run on a persistent container host like Render or Railway.</li>
</ol>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="package-dependencies">📦 Package dependencies</h2>

<h3>Backend Dependencies (<code>backend/package.json</code>)</h3>
<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Package</th>
    <th>Version</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td><code>express</code></td>
    <td>^4.21.2</td>
    <td>Fast, minimalist web framework for REST API routing and HTTP server creation.</td>
  </tr>
  <tr>
    <td><code>socket.io</code></td>
    <td>^4.8.1</td>
    <td>Low-latency bidirectional WebSocket engine powering real-time room synchronization.</td>
  </tr>
  <tr>
    <td><code>mongoose</code></td>
    <td>^8.9.5</td>
    <td>MongoDB object modeling tool for schema validation, models, and queries.</td>
  </tr>
  <tr>
    <td><code>jsonwebtoken</code></td>
    <td>^9.0.2</td>
    <td>Signs and verifies JSON Web Tokens for secure stateless authentication.</td>
  </tr>
  <tr>
    <td><code>bcryptjs</code></td>
    <td>^3.0.2</td>
    <td>Hashes and salts passwords using the Blowfish cipher for data security.</td>
  </tr>
  <tr>
    <td><code>nodemailer</code></td>
    <td>^6.10.0</td>
    <td>SMTP email dispatch engine delivering formatted room invitation emails.</td>
  </tr>
  <tr>
    <td><code>cloudinary</code></td>
    <td>^2.5.1</td>
    <td>Cloud media storage SDK for avatar and room thumbnail management.</td>
  </tr>
  <tr>
    <td><code>cors</code></td>
    <td>^2.8.5</td>
    <td>Middleware enabling Cross-Origin Resource Sharing between frontend and backend.</td>
  </tr>
  <tr>
    <td><code>dotenv</code></td>
    <td>^16.4.7</td>
    <td>Loads environment variables from <code>.env</code> file into <code>process.env</code>.</td>
  </tr>
  <tr>
    <td><code>nodemon</code> <i>(dev)</i></td>
    <td>^3.1.9</td>
    <td>Development utility that automatically restarts server on code changes.</td>
  </tr>
</table>

<h3>Frontend Dependencies (<code>frontend/package.json</code>)</h3>
<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Package</th>
    <th>Version</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td><code>react</code></td>
    <td>^19.0.0</td>
    <td>Core component UI rendering library with modern hooks support.</td>
  </tr>
  <tr>
    <td><code>react-dom</code></td>
    <td>^19.0.0</td>
    <td>DOM rendering bindings for React.</td>
  </tr>
  <tr>
    <td><code>socket.io-client</code></td>
    <td>^4.8.1</td>
    <td>Client-side WebSocket client maintaining persistent real-time server connection.</td>
  </tr>
  <tr>
    <td><code>axios</code></td>
    <td>^1.7.9</td>
    <td>Promise-based HTTP client for executing REST requests with interceptors.</td>
  </tr>
  <tr>
    <td><code>lucide-react</code></td>
    <td>^0.475.0</td>
    <td>Icon library for player controls, role indicators, and navigation badges.</td>
  </tr>
  <tr>
    <td><code>vite</code> <i>(dev)</i></td>
    <td>^6.1.0</td>
    <td>Next-generation frontend dev server and production asset bundler.</td>
  </tr>
  <tr>
    <td><code>@vitejs/plugin-react</code> <i>(dev)</i></td>
    <td>^4.3.4</td>
    <td>Vite plugin providing Fast Refresh and JSX compilation support.</td>
  </tr>
  <tr>
    <td><code>tailwindcss</code> <i>(dev)</i></td>
    <td>^4.0.0</td>
    <td>Next-generation utility-first styling engine with native CSS import support.</td>
  </tr>
  <tr>
    <td><code>@tailwindcss/vite</code> <i>(dev)</i></td>
    <td>^4.0.0</td>
    <td>Official Vite plugin integrating Tailwind CSS v4 directly into the build pipeline.</td>
  </tr>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="available-scripts">📜 Available scripts</h2>

<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Location</th>
    <th>Script Command</th>
    <th>Shell Invocation</th>
    <th>Execution Purpose</th>
  </tr>
  <tr>
    <td>Root</td>
    <td><code>start</code></td>
    <td><code>node backend/index.js</code></td>
    <td>Runs backend production server from root directory.</td>
  </tr>
  <tr>
    <td>Root</td>
    <td><code>build</code></td>
    <td><code>cd frontend &amp;&amp; npm run build</code></td>
    <td>Compiles frontend React production assets into <code>frontend/dist/</code>.</td>
  </tr>
  <tr>
    <td>Backend</td>
    <td><code>start</code></td>
    <td><code>node index.js</code></td>
    <td>Starts Express and Socket.IO server on port 5000 (with auto-fallback).</td>
  </tr>
  <tr>
    <td>Backend</td>
    <td><code>dev</code></td>
    <td><code>nodemon index.js</code></td>
    <td>Starts backend development server with file watch and auto-restart.</td>
  </tr>
  <tr>
    <td>Frontend</td>
    <td><code>dev</code></td>
    <td><code>vite</code></td>
    <td>Launches local Vite development server on <code>http://localhost:5173</code> with HMR.</td>
  </tr>
  <tr>
    <td>Frontend</td>
    <td><code>build</code></td>
    <td><code>vite build</code></td>
    <td>Builds optimized HTML/CSS/JS bundles for production deployment.</td>
  </tr>
  <tr>
    <td>Frontend</td>
    <td><code>preview</code></td>
    <td><code>vite preview</code></td>
    <td>Serves local preview of compiled production build in <code>dist/</code>.</td>
  </tr>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="data-model-and-state">🗄️ Data model and state</h2>

<p>The system utilizes a dual-tier state strategy: <b>In-Memory OOP Maps</b> for zero-latency WebSocket broadcasting, paired with <b>MongoDB Atlas</b> for durable room persistence.</p>

<h3>MongoDB Atlas Collections &amp; Mongoose Schemas</h3>

<h4>1. Room Schema (<code>backend/models/Room.js</code>)</h4>
<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Field Name</th>
    <th>BSON Type</th>
    <th>Index / Constraints</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>roomId</code></td>
    <td>String</td>
    <td>Unique, Indexed, Trim</td>
    <td>Unique party identifier (e.g., <code>room-k9x2</code>).</td>
  </tr>
  <tr>
    <td><code>title</code></td>
    <td>String</td>
    <td>Required</td>
    <td>Human-readable watch party title.</td>
  </tr>
  <tr>
    <td><code>host</code></td>
    <td>ObjectId</td>
    <td>Ref: 'User', Optional</td>
    <td>Host user ID reference (if authenticated).</td>
  </tr>
  <tr>
    <td><code>hostUsername</code></td>
    <td>String</td>
    <td>Required</td>
    <td>Display name of the party creator.</td>
  </tr>
  <tr>
    <td><code>currentVideoId</code></td>
    <td>String</td>
    <td>Default: 'jfKfPfyJRdk'</td>
    <td>Active 11-character YouTube video ID.</td>
  </tr>
  <tr>
    <td><code>playState</code></td>
    <td>String</td>
    <td>Enum: ['playing', 'paused']</td>
    <td>Authoritative playback state of the room.</td>
  </tr>
  <tr>
    <td><code>currentTime</code></td>
    <td>Number</td>
    <td>Default: 0</td>
    <td>Authoritative video position in seconds.</td>
  </tr>
  <tr>
    <td><code>participants</code></td>
    <td>Array of Objects</td>
    <td>Embedded Subdocuments</td>
    <td>Active participants: <code>{ userId, username, role, joinedAt }</code>.</td>
  </tr>
  <tr>
    <td><code>isPrivate</code></td>
    <td>Boolean</td>
    <td>Default: false</td>
    <td>Controls whether party appears in public discovery lists.</td>
  </tr>
</table>

<h4>2. User Schema (<code>backend/models/User.js</code>)</h4>
<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <tr bgcolor="#f8fafc">
    <th>Field Name</th>
    <th>BSON Type</th>
    <th>Index / Constraints</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>name</code></td>
    <td>String</td>
    <td>Required, Max: 50</td>
    <td>Full user display name.</td>
  </tr>
  <tr>
    <td><code>email</code></td>
    <td>String</td>
    <td>Unique, Indexed, Lowercase</td>
    <td>User email matching RFC regex format.</td>
  </tr>
  <tr>
    <td><code>password</code></td>
    <td>String</td>
    <td>Required, Min: 6</td>
    <td>Bcrypt-hashed password (excluded from JSON serialization).</td>
  </tr>
  <tr>
    <td><code>avatar</code></td>
    <td>String</td>
    <td>Default: ''</td>
    <td>Optional avatar URL stored in Cloudinary.</td>
  </tr>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="security-and-validation">🛡️ Security and validation</h2>

<ol>
  <li><b>Server-Side Role Enforcement:</b> Client-side UI disables controls for Participants, but the backend re-validates the caller's role on every single event (<code>play</code>, <code>pause</code>, <code>seek</code>, <code>change_video</code>, <code>assign_role</code>, <code>remove_participant</code>, <code>transfer_host</code>). Unauthorized calls are rejected with <code>error_message</code> events.</li>
  <li><b>YouTube Video ID Sanitization:</b> URLs are parsed via regex <code>/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&amp;v=))([\w-]{11})/</code>. Only valid 11-character alphanumeric strings are accepted, preventing script injection or invalid embeds.</li>
  <li><b>Password Security:</b> Uses <code>bcryptjs</code> with a salt factor of 10. Passwords are never stored or transmitted in plain text, and <code>toJSON()</code> overrides ensure password hashes are omitted from all API responses.</li>
  <li><b>Stateless JWT Bearer Authentication:</b> Signed with HS256 using 64-character secrets. Access tokens expire after 24 hours; refresh tokens are validated against separate secrets.</li>
  <li><b>CORS Origin Whitelisting:</b> Production origins (Vercel domains, localhost) are validated dynamically; unauthorized origins are blocked.</li>
</ol>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="performance-and-scalability">⚡ Performance and scalability</h2>

<h3>Current Implemented Architecture</h3>
<ul>
  <li><b>In-Memory OOP State:</b> Sockets query memory maps directly in O(1) time without blocking on disk or database I/O for real-time events.</li>
  <li><b>Asynchronous Non-Blocking DB Writes:</b> State updates (play, pause, seek) dispatch non-blocking Mongoose updates so database latency never delays WebSocket broadcasts.</li>
  <li><b>Client Drift Tolerance:</b> 1.8-second threshold prevents redundant seeking across minor network variations.</li>
</ul>

<h3>Proposed Horizontal Scaling Design (Multi-Server Clusters)</h3>
<p>To scale from a single server to 1,000+ concurrent rooms and 50,000+ simultaneous viewers across multiple geographic regions, the following architecture is designed:</p>
<ol>
  <li><b>Socket.IO Redis Adapter (Pub/Sub):</b> Replaces local in-memory event emission with Redis Pub/Sub channels (<code>@socket.io/redis-adapter</code>). When Host on Server A emits <code>play</code>, Redis broadcasts the message to Server B and C, synchronizing clients regardless of which node they are connected to.</li>
  <li><b>Redis State Caching:</b> Room state (playState, timestamp, participants) stored in Redis hashes (<code>HSET room:id ...</code>) with sub-millisecond read/write latency.</li>
  <li><b>Load Balancer with Sticky Sessions:</b> NGINX or AWS ALB configured with cookie-based session stickiness to ensure HTTP polling fallbacks route to the same instance during handshake.</li>
</ol>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="testing">🧪 Testing</h2>

<p>The repository includes an end-to-end WebSocket integration test script validating full event lifecycles, role promotion, RBAC unauthorized action rejection, real-time sync, and participant kick mechanisms.</p>

<h3>Automated Integration Test Verification</h3>
<p>Run the automated end-to-end verification test:</p>
<pre><code>$env:NODE_PATH="frontend/node_modules"; node -e "
const { io } = require('socket.io-client');
const s = io('http://localhost:5001');
s.on('connect', () => {
  console.log('✅ Connected to WebSocket Server successfully!');
  s.emit('join_room', { roomId: 'health-test', username: 'TestRunner' });
});
s.on('role_assigned', d => {
  console.log('✅ Received Role Assignment:', d.role);
  s.disconnect();
  process.exit(0);
});
"</code></pre>

<h3>Manual Multi-User Synchronization Testing Checklist</h3>
<ol>
  <li><b>Room Creation:</b> Host creates room ➔ Receives 👑 Host badge and full controls.</li>
  <li><b>Participant Join:</b> Participant joins via code ➔ Receives 👤 Participant badge; controls are disabled.</li>
  <li><b>Unauthorized Control Rejection:</b> Participant attempts playback control ➔ Backend emits "Permission denied" toast.</li>
  <li><b>Host Play / Pause:</b> Host clicks play/pause ➔ Participant player plays/pauses in sync.</li>
  <li><b>Host Scrub:</b> Host seeks to 1:30 ➔ Participant player scrubs to 1:30 without jitter.</li>
  <li><b>Video Change:</b> Host inputs new video link ➔ New video loads on all screens.</li>
  <li><b>Role Elevation:</b> Host promotes Participant to Moderator ➔ Participant controls unlock immediately.</li>
  <li><b>Action Approval:</b> Participant requests video change ➔ Host approves ➔ Video changes globally.</li>
  <li><b>Kick Action:</b> Host kicks participant ➔ Kicked user is redirected home with alert.</li>
</ol>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="code-walkthrough-and-viva-prep">🎓 Code walkthrough and viva prep</h2>

<details open>
  <summary><b>15 Detailed Viva &amp; Code Walkthrough Questions &amp; Answers</b> (Click to expand / collapse)</summary>

  <h4>Q1: Why did you choose Socket.IO instead of raw WebSockets (ws)?</h4>
  <p><b>Answer:</b> While raw <code>ws</code> is lightweight, Socket.IO provides battle-tested enterprise features essential for a watch party: automatic reconnection, room multiplexing (<code>socket.join(roomId)</code>), automatic HTTP long-polling fallback if corporate firewalls block WebSockets, built-in heartbeat/ping-timeout detection, and seamless readiness for horizontal Redis scaling.</p>

  <h4>Q2: How does the application prevent infinite feedback loops during synchronization?</h4>
  <p><b>Answer:</b> In <code>frontend/src/components/YouTubePlayer.jsx</code>, we maintain a mutable reference: <code>const isSyncingRef = useRef(false);</code>. When a <code>sync_state</code> event arrives from the WebSocket, we set <code>isSyncingRef.current = true;</code> before programmatically calling <code>player.seekTo()</code> or <code>player.playVideo()</code>. When the player natively fires its <code>onStateChange</code> event, the handler checks <code>if (isSyncingRef.current) return;</code>, preventing the client from echoing the event back to the server. The flag resets after a 500ms timeout.</p>

  <h4>Q3: How do you handle video playback drift between users on different connections?</h4>
  <p><b>Answer:</b> Network packet arrival varies by milliseconds. If we forced a player seek on every minor update, the video would constantly stutter. We implemented a <b>1.8-second tolerance threshold</b>:
  <pre><code>if (Math.abs(localCurrentTime - serverTime) &gt; 1.8) {
  playerRef.current.seekTo(serverTime, true);
}</code></pre>
  If local playback is within 1.8 seconds of the server timestamp, natural playback continues smoothly without audio artifacts.</p>

  <h4>Q4: How does a late joiner get synchronized to a video already playing for 20 minutes?</h4>
  <p><b>Answer:</b> In <code>backend/utils/roomManager.js</code>, the <code>RoomSession</code> class tracks <code>currentTime</code> and <code>lastUpdatedAt</code>. When a user connects midway, the server evaluates:
  <pre><code>getEstimatedTime() {
  if (this.playState === 'playing') {
    const elapsedSeconds = (Date.now() - this.lastUpdatedAt) / 1000;
    return this.currentTime + elapsedSeconds;
  }
  return this.currentTime;
}</code></pre>
  This estimated timestamp is sent via <code>sync_state</code>, immediately seeking the new joiner to the active playhead.</p>

  <h4>Q5: How is Role-Based Access Control enforced on the backend?</h4>
  <p><b>Answer:</b> Role enforcement is executed server-side before any state mutation. When a socket emits <code>change_video</code>, <code>socketHandler.js</code> looks up the <code>Participant</code> instance associated with <code>socket.id</code>. It invokes <code>roomSession.changeVideo(videoId, participant.userId)</code>:
  <pre><code>changeVideo(videoId, requesterUserId) {
  const requester = this.participants.get(requesterUserId);
  if (!requester || !requester.canControlPlayback()) {
    throw new Error('Permission denied: Only Host or Moderator can change video.');
  }
  this.currentVideoId = videoId;
  ...
}</code></pre>
  If unauthorized, the server catches the error and emits an <code>error_message</code> back only to that socket, ensuring no unauthorized broadcasts occur.</p>

  <h4>Q6: Why did you structure the WebSocket server using Object-Oriented Programming (OOP)?</h4>
  <p><b>Answer:</b> As suggested in the assignment bonus, encapsulating state into <code>Participant</code>, <code>RoomSession</code>, and <code>RoomManager</code> classes provides clean separation of concerns. The <code>Participant</code> class encapsulates identity and permission methods (<code>canControlPlayback</code>, <code>isHost</code>); <code>RoomSession</code> encapsulates playback state, drift calculations, and atomic state mutation methods; <code>RoomManager</code> serves as a global singleton registry.</p>

  <h4>Q7: What happens when the Host abruptly closes their browser tab or disconnects?</h4>
  <p><b>Answer:</b> In <code>RoomSession.removeParticipantBySocketId(socketId)</code>:
  <pre><code>if (participant &amp;&amp; participant.isHost() &amp;&amp; this.participants.size &gt; 0) {
  const nextUser = this.participants.values().next().value;
  if (nextUser) {
    nextUser.role = 'host';
  }
}</code></pre>
  If the host leaves and other users remain, the server automatically promotes the next senior participant to Host and broadcasts <code>host_transferred</code>, preventing orphaned rooms.</p>

  <h4>Q8: How does the Participant Action Request workflow operate?</h4>
  <p><b>Answer:</b> When a participant wishes to change the video, they emit <code>request_action { roomId, actionType: 'change_video', payload: { videoId } }</code>. The server queues this request in <code>roomSession.pendingRequests</code> and emits <code>action_requested</code> to the room. The Host or Moderator receives an interactive card with Approve and Reject buttons. Clicking Approve emits <code>resolve_action</code>, which automatically executes the action and broadcasts the resulting <code>sync_state</code>.</p>

  <h4>Q9: Why can't the WebSocket backend be hosted on Vercel Serverless Functions?</h4>
  <p><b>Answer:</b> Serverless functions on platforms like Vercel or AWS Lambda are stateless and ephemeral, terminating execution after handling an HTTP request. WebSockets require a persistent, long-lived TCP connection that remains open for hours. Therefore, the WebSocket backend must run on a containerized, persistent web service like Render or Railway.</p>

  <h4>Q10: How do you parse YouTube URLs into clean video IDs?</h4>
  <p><b>Answer:</b> In <code>backend/controller/roomController.js</code> and <code>frontend/src/pages/WatchRoom.jsx</code>, we use a robust regular expression:
  <pre><code>/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&amp;v=))([\w-]{11})/</code></pre>
  This extracts the 11-character video ID from standard watch URLs, short URLs (<code>youtu.be</code>), embedded URLs, or raw 11-character IDs, discarding tracking parameters like <code>&amp;t=</code> or <code>&amp;si=</code>.</p>

  <h4>Q11: How did you implement email invitations using Nodemailer?</h4>
  <p><b>Answer:</b> In <code>backend/config/mailer.js</code>, we configure a Nodemailer transporter using Gmail SMTP credentials. <code>roomController.js</code> generates a responsive, branded HTML email template containing the room title, inviter name, unique room code, and a stylized button linking to <code>/#room=id</code>. It includes fallback logging so development environments function seamlessly even if credentials fail.</p>

  <h4>Q12: How does the client handle port conflicts in development?</h4>
  <p><b>Answer:</b> If port 5000 is occupied by another process on the developer's computer, <code>backend/index.js</code> catches <code>EADDRINUSE</code> and automatically switches to port 5001. Both <code>frontend/src/services/api.js</code> and <code>socket.js</code> feature automatic fallback logic that retries on port 5001 if port 5000 fails to respond.</p>

  <h4>Q13: How is user identity managed if someone does not want to register?</h4>
  <p><b>Answer:</b> In <code>frontend/src/context/AuthContext.jsx</code>, we generate and persist a persistent guest ID: <code>guest_${Date.now()}_${Math.random().toString(36).substr(2, 4)}</code> in <code>localStorage</code>. Users can enter a custom guest nickname or register an account with JWT authentication.</p>

  <h4>Q14: What is the purpose of the <code>isPrivate</code> flag in the Room model?</h4>
  <p><b>Answer:</b> <code>isPrivate: Boolean</code> controls room visibility. When false, the room appears in the public discovery feed via <code>GET /api/rooms</code>. When true, the party can only be joined by individuals who possess the explicit room code or direct deep link.</p>

  <h4>Q15: What trade-offs were made between native YouTube controls and custom UI controls?</h4>
  <p><b>Answer:</b> Standard YouTube iframes embed their own play/pause/seek buttons. However, native iframe controls do not respect backend role enforcement (a participant could click play directly on the iframe). We set <code>controls: 0</code> and <code>disablekb: 1</code> in the YouTube Player parameters and built a custom synchronized control bar. This allows our code to intercept clicks, verify permissions, and enforce role-based access before any action takes place.</p>
</details>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="troubleshooting-and-faq">🛠️ Troubleshooting and FAQ</h2>

<details open>
  <summary><b>Top 10 Technical Issues &amp; Solutions</b> (Click to expand / collapse)</summary>

  <h4>1. Video playback does not start automatically (Autoplay Blocked)</h4>
  <p><b>Cause:</b> Modern web browsers (Chrome, Safari) block unmuted video autoplay unless the user has interacted with the document.</p>
  <p><b>Solution:</b> The user must click anywhere on the page or unmute the player. Our UI includes a full-viewport click handler overlay to satisfy browser interaction policies.</p>

  <h4>2. YouTube Player displays "Video unavailable" or "Playback on other websites has been disabled"</h4>
  <p><b>Cause:</b> Certain YouTube content creators disable external iframe embedding on their videos.</p>
  <p><b>Solution:</b> Use embeddable videos. The landing page includes verified sample presets (Lofi Girl, Blender Open Movie, Nature relaxation streams).</p>

  <h4>3. Port 5000 is already in use (EADDRINUSE)</h4>
  <p><b>Cause:</b> Another application (e.g., Apple AirPlay, local server) is using port 5000.</p>
  <p><b>Solution:</b> Our server detects <code>EADDRINUSE</code> automatically and re-binds to port 5001. The frontend's Axios and Socket.IO services detect this and switch to port 5001 automatically.</p>

  <h4>4. Participant clicks play/pause, but nothing happens</h4>
  <p><b>Cause:</b> Role-based access control is actively protecting playback. Only Host and Moderator can control playback.</p>
  <p><b>Solution:</b> The Participant should click "Request Permission" or ask the Host to elevate their role to Moderator via the participant sidebar menu.</p>

  <h4>5. WebSocket fails to connect in production (Mixed Content Error)</h4>
  <p><b>Cause:</b> If the frontend is hosted on HTTPS (e.g., Vercel) and attempts to connect to an unencrypted <code>ws://</code> or <code>http://</code> backend URL, browsers block the request.</p>
  <p><b>Solution:</b> Ensure <code>VITE_SOCKET_URL</code> uses <code>https://</code> in production. Socket.IO automatically upgrades <code>https://</code> to secure <code>wss://</code> WebSockets.</p>

  <h4>6. Free-tier backend server takes 30-50 seconds to respond on first load (Cold Start)</h4>
  <p><b>Cause:</b> Free-tier cloud instances (Render, Koyeb) spin down after 15 minutes of inactivity.</p>
  <p><b>Solution:</b> Wait 45 seconds on initial load for the container to wake up. Subsequent WebSocket connections will be instantaneous.</p>

  <h4>7. CORS error when calling backend REST endpoints</h4>
  <p><b>Cause:</b> The backend's allowed origin list does not match the frontend's origin.</p>
  <p><b>Solution:</b> In <code>backend/index.js</code>, update <code>CLIENT_URL</code> in <code>.env</code> with your live frontend domain.</p>

  <h4>8. Participant video jumps or jitters during playback</h4>
  <p><b>Cause:</b> High network latency causing minor time drift checks.</p>
  <p><b>Solution:</b> The 1.8-second seek threshold absorbs normal jitter. Ensure the participant's network connection is stable and video quality is set appropriately.</p>

  <h4>9. Nodemailer Gmail delivery error: Invalid login (535-5.7.8)</h4>
  <p><b>Cause:</b> Gmail requires a 16-character App Password when 2-Factor Authentication is enabled; standard passwords are rejected.</p>
  <p><b>Solution:</b> Generate an App Password in Google Account settings (Security ➔ 2-Step Verification ➔ App Passwords) and place it in <code>EMAIL_PASS</code> in <code>backend/.env</code>.</p>

  <h4>10. Room Code returns "Room Not Found"</h4>
  <p><b>Cause:</b> Typo in the room code or connecting to a different backend server instance.</p>
  <p><b>Solution:</b> Copy the room code directly from the Host's "Invite Friends" modal to ensure exact character matching.</p>
</details>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="roadmap-and-bonus-features">🗺️ Roadmap and bonus features</h2>

<table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #cbd5e1;">
  <thead>
    <tr bgcolor="#0f172a">
      <th style="color: #ffffff;">Feature / Capability</th>
      <th style="color: #ffffff;">Category</th>
      <th style="color: #ffffff;">Priority</th>
      <th style="color: #ffffff;">Implementation Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>OOP WebSocket Server Architecture</b></td>
      <td>Bonus Idea</td>
      <td>High</td>
      <td><span style="color: #059669; font-weight: bold;">Completed</span> (Participant, RoomSession, RoomManager)</td>
    </tr>
    <tr>
      <td><b>Persistent Database Rooms (MongoDB)</b></td>
      <td>Bonus Idea</td>
      <td>High</td>
      <td><span style="color: #059669; font-weight: bold;">Completed</span> (Room schema &amp; state persistence)</td>
    </tr>
    <tr>
      <td><b>JWT User Authentication System</b></td>
      <td>Bonus Idea</td>
      <td>Medium</td>
      <td><span style="color: #059669; font-weight: bold;">Completed</span> (Register, Login, Refresh tokens)</td>
    </tr>
    <tr>
      <td><b>Live In-Room Text Chat</b></td>
      <td>Bonus Idea</td>
      <td>Medium</td>
      <td><span style="color: #059669; font-weight: bold;">Completed</span> (Real-time message stream &amp; badges)</td>
    </tr>
    <tr>
      <td><b>Floating Emoji Reactions</b></td>
      <td>Bonus Idea</td>
      <td>Low</td>
      <td><span style="color: #059669; font-weight: bold;">Completed</span> (Floating CSS keyframe animations)</td>
    </tr>
    <tr>
      <td><b>Transfer Host Role</b></td>
      <td>Bonus Idea</td>
      <td>Medium</td>
      <td><span style="color: #059669; font-weight: bold;">Completed</span> (Atomic role handoff &amp; succession)</td>
    </tr>
    <tr>
      <td><b>Participant Action Approval Flow</b></td>
      <td>Requirement</td>
      <td>High</td>
      <td><span style="color: #059669; font-weight: bold;">Completed</span> (Approval queue &amp; prompt cards)</td>
    </tr>
    <tr>
      <td><b>Nodemailer Email Invitations</b></td>
      <td>Requirement</td>
      <td>High</td>
      <td><span style="color: #059669; font-weight: bold;">Completed</span> (HTML templates &amp; SMTP dispatch)</td>
    </tr>
    <tr>
      <td><b>Redis Pub/Sub Horizontal Scaling</b></td>
      <td>Bonus Idea</td>
      <td>Medium</td>
      <td><span style="color: #d97706; font-weight: bold;">Architected</span> (Planned for multi-node cluster)</td>
    </tr>
    <tr>
      <td><b>Shared Playlist Queue</b></td>
      <td>Enhancement</td>
      <td>Low</td>
      <td><span style="color: #64748b; font-weight: bold;">Planned</span> (Collaborative video queue)</td>
    </tr>
  </tbody>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="contributing">🤝 Contributing</h2>

<ol>
  <li><b>Fork the Repository</b> on GitHub.</li>
  <li><b>Create a Feature Branch:</b>
<pre><code>git checkout -b feature/amazing-feature</code></pre>
  </li>
  <li><b>Commit Your Changes:</b> Follow standard Conventional Commits convention:
<pre><code>git commit -m "feat: add video playback queue management"</code></pre>
  </li>
  <li><b>Push to the Branch:</b>
<pre><code>git push origin feature/amazing-feature</code></pre>
  </li>
  <li><b>Open a Pull Request:</b> Describe the modifications, architectural rationale, and attach test verification logs.</li>
</ol>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="contact">📬 Contact</h2>

<table cellpadding="8" cellspacing="0" border="0">
  <tr>
    <td><b>Candidate Name:</b></td>
    <td>Aman Gupta</td>
  </tr>
  <tr>
    <td><b>Target Role:</b></td>
    <td>Full Stack Developer</td>
  </tr>
  <tr>
    <td><b>Company / Assignment:</b></td>
    <td>Web3Task</td>
  </tr>
  <tr>
    <td><b>Email Address:</b></td>
    <td><a href="mailto:ag0567688@gmail.com">ag0567688@gmail.com</a></td>
  </tr>
  <tr>
    <td><b>Mobile Number:</b></td>
    <td><a href="tel:+919651585712">+91 9651585712</a></td>
  </tr>
  <tr>
    <td><b>GitHub Profile:</b></td>
    <td><a href="https://github.com/amangupta9560">https://github.com/amangupta9560</a></td>
  </tr>
  <tr>
    <td><b>LinkedIn Profile:</b></td>
    <td><a href="https://www.linkedin.com/in/amangupta9454/">https://www.linkedin.com/in/amangupta9454/</a></td>
  </tr>
  <tr>
    <td><b>Submission Date:</b></td>
    <td>30 Oct 2026</td>
  </tr>
</table>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="license">📄 License</h2>

<p>This project is licensed under the <b>MIT License</b> — see the root <code>LICENSE</code> file for full terms and conditions.</p>

<p align="right"><a href="#top">▲ Back to Top</a></p>

<hr>

<h2 id="acknowledgements">🙏 Acknowledgements</h2>

<ul>
  <li><a href="https://developers.google.com/youtube/iframe_api_reference">YouTube IFrame Player API Documentation</a> for embedded video playback methods.</li>
  <li><a href="https://socket.io/docs/v4/">Socket.IO Documentation</a> for WebSocket room and event streaming design patterns.</li>
  <li><a href="https://tailwindcss.com/docs">Tailwind CSS v4 Documentation</a> for high-performance styling primitives.</li>
  <li><a href="https://lucide.dev/">Lucide Icons</a> for accessible, modern UI iconography.</li>
  <li><a href="https://www.mongodb.com/atlas">MongoDB Atlas</a> for managed cloud database clustering.</li>
</ul>

<hr>

<div align="center">
  <p>Built with ❤️ by <b>Aman Gupta</b> for the Full-Stack Developer Role Assignment at <b>Web3Task</b></p>
  <p><a href="#top">▲ Back to Top of Page</a></p>
  <p>© 2026 SyncParty System. All rights reserved.</p>
</div>
