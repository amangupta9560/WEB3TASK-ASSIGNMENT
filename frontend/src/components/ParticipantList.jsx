import React, { useState } from 'react';
import { Crown, Shield, User, UserX, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';

const ParticipantList = ({
  participants = [],
  currentUserId,
  currentUserRole,
  pendingRequests = [],
  onAssignRole,
  onRemoveParticipant,
  onTransferHost,
  onResolveRequest
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const isHost = currentUserRole === 'host';
  const isMod = currentUserRole === 'moderator';

  const getRoleBadge = (role) => {
    switch (role) {
      case 'host':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Crown className="w-3 h-3" />
            <span>Host</span>
          </span>
        );
      case 'moderator':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <Shield className="w-3 h-3" />
            <span>Moderator</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            <User className="w-3 h-3 text-slate-400" />
            <span>Participant</span>
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/60 rounded-2xl border border-slate-800 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="font-semibold text-slate-100 text-sm">Room Participants</h3>
        </div>
        <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded-full">
          {participants.length}
        </span>
      </div>

      {(isHost || isMod) && pendingRequests.length > 0 && (
        <div className="my-3 p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              Pending Requests ({pendingRequests.length})
            </span>
          </div>
          {pendingRequests.map((req) => (
            <div
              key={req.id}
              className="bg-slate-900/80 p-2.5 rounded-lg border border-indigo-900/40 flex items-center justify-between text-xs"
            >
              <div className="truncate pr-2">
                <span className="font-semibold text-white">{req.username}</span> requested to{' '}
                <span className="text-indigo-300 font-mono font-medium">{req.actionType}</span>
              </div>
              <div className="flex items-center space-x-1 shrink-0">
                <button
                  onClick={() => onResolveRequest?.(req.id, true)}
                  title="Approve"
                  className="p-1 hover:bg-emerald-500/20 text-emerald-400 rounded transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onResolveRequest?.(req.id, false)}
                  title="Reject"
                  className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-2 space-y-2 divide-y divide-slate-800/40">
        {participants.map((p) => {
          const isCurrentUser = p.userId === currentUserId;
          const isTargetHost = p.role === 'host';

          return (
            <div
              key={p.userId}
              className="pt-2 first:pt-0 flex items-center justify-between group hover:bg-slate-800/30 p-2 rounded-xl transition-all"
            >
              <div className="flex items-center space-x-2.5 truncate">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center font-bold text-xs text-white uppercase shadow-sm">
                  {p.username?.charAt(0) || 'U'}
                </div>
                <div className="truncate">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm font-medium text-slate-200 truncate">
                      {p.username}
                    </span>
                    {isCurrentUser && (
                      <span className="text-[10px] text-slate-400 font-normal">(You)</span>
                    )}
                  </div>
                  <div className="mt-0.5">{getRoleBadge(p.role)}</div>
                </div>
              </div>

              {isHost && !isCurrentUser && !isTargetHost && (
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === p.userId ? null : p.userId)
                    }
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeDropdown === p.userId && (
                    <div className="absolute right-0 top-8 z-30 w-48 bg-slate-950 border border-slate-700/80 rounded-xl shadow-xl py-1 text-xs text-slate-200 backdrop-blur-lg">
                      {p.role !== 'moderator' ? (
                        <button
                          onClick={() => {
                            onAssignRole?.(p.userId, 'moderator');
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center space-x-2 text-blue-400"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          <span>Make Moderator</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            onAssignRole?.(p.userId, 'participant');
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center space-x-2 text-slate-300"
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>Demote to Participant</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onTransferHost?.(p.userId);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center space-x-2 text-amber-400"
                      >
                        <Crown className="w-3.5 h-3.5" />
                        <span>Transfer Host</span>
                      </button>

                      <div className="border-t border-slate-800 my-1" />

                      <button
                        onClick={() => {
                          onRemoveParticipant?.(p.userId);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-red-500/20 flex items-center space-x-2 text-red-400"
                      >
                        <UserX className="w-3.5 h-3.5" />
                        <span>Remove Participant</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticipantList;