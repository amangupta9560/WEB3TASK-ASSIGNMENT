import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, MessageSquare } from 'lucide-react';

const REACTION_EMOJIS = ['❤️', '🔥', '👏', '😂', '🎉', '🚀'];

const ChatAndReactions = ({
  messages = [],
  reactions = [],
  onSendMessage,
  onSendReaction,
  currentUsername
}) => {
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage?.(text.trim());
    setText('');
  };

  return (
    <div className="relative flex flex-col h-full bg-slate-900/60 rounded-2xl border border-slate-800 backdrop-blur-md overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {reactions.map((r) => (
          <div
            key={r.id}
            className="absolute bottom-16 right-8 text-3xl animate-float-up select-none"
            style={{
              right: `${Math.floor(Math.random() * 60) + 20}px`
            }}
          >
            {r.emoji}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between p-3.5 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-red-500" />
          <h3 className="font-semibold text-slate-100 text-sm">Room Chat</h3>
        </div>
        <span className="text-xs text-slate-400">Live</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 text-xs py-8">
            <Smile className="w-8 h-8 mb-2 opacity-50" />
            <p>No messages yet. Say hello to the room!</p>
          </div>
        ) : (
          messages.map((m) => {
            const isMe = m.username === currentUsername;
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-400 px-1 mb-0.5">
                  {isMe ? 'You' : m.username}
                </span>
                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs break-words shadow-sm ${
                    isMe
                      ? 'bg-red-600 text-white rounded-tr-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-tl-none'
                  }`}
                >
                  {m.message}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-3 py-1.5 bg-slate-950/40 border-t border-slate-800 flex items-center justify-around">
        {REACTION_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSendReaction?.(emoji)}
            className="text-lg hover:scale-130 active:scale-95 transition-transform p-1 cursor-pointer select-none"
            title={`React ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-3 bg-slate-950/60 border-t border-slate-800 flex items-center space-x-2"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Send a chat message..."
          className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="p-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white rounded-xl transition-all active:scale-95 shadow-md shadow-red-600/20"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

export default ChatAndReactions;