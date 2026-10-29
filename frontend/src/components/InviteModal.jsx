import React, { useState } from 'react';
import { X, Copy, Check, Mail, Send, Share2 } from 'lucide-react';
import { roomAPI } from '../services/api';

const InviteModal = ({ isOpen, onClose, roomId, roomTitle, currentUsername }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  if (!isOpen) return null;

  const roomLink = `${window.location.origin}/#room=${roomId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSending(true);
    setStatusMessage(null);

    try {
      const res = await roomAPI.sendInvite(roomId, email.trim(), currentUsername);
      if (res.data.success) {
        setStatusMessage({
          type: 'success',
          text: `Invitation processed! Sent to ${email}`
        });
        setEmail('');
      } else {
        setStatusMessage({
          type: 'warning',
          text: res.data.message || 'Invitation created.'
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to send invite email.'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 mb-1">
          <div className="p-2 bg-red-600/10 text-red-500 rounded-xl">
            <Share2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold">Invite Friends</h3>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          Share this party with friends to watch YouTube together in real time.
        </p>

        <div className="space-y-3 mb-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Party Link
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={roomLink}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors shrink-0"
                title="Copy Link"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Room Code
            </label>
            <div className="flex items-center space-x-2">
              <span className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-mono font-bold text-red-400">
                {roomId}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors shrink-0"
                title="Copy Code"
              >
                {copiedCode ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-300 mb-2">
            <Mail className="w-3.5 h-3.5 text-red-400" />
            <span>Send Email Invite (Nodemailer)</span>
          </label>

          <form onSubmit={handleSendEmail} className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={sending || !email.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 shrink-0 shadow-lg shadow-red-600/20"
              >
                {sending ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>

            {statusMessage && (
              <div
                className={`p-2.5 rounded-xl text-xs ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                {statusMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;