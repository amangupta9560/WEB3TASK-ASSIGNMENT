import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, FastForward, Volume2, VolumeX, Maximize2, ShieldAlert } from 'lucide-react';

const YouTubePlayer = ({
  videoId,
  playState,
  currentTime,
  userRole,
  onPlay,
  onPause,
  onSeek,
  onRequestAction
}) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const isSyncingRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [localPlayState, setLocalPlayState] = useState('paused');
  const [localTime, setLocalTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showRestrictedNotice, setShowRestrictedNotice] = useState(false);

  const canControl = userRole === 'host' || userRole === 'moderator';

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const s = Math.floor(seconds);
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    let checkInterval = null;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return false;

      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }

      playerRef.current = new window.YT.Player('yt-player-target', {
        height: '100%',
        width: '100%',
        videoId: videoId || 'jfKfPfyJRdk',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          iv_load_policy: 3,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            setIsReady(true);
            try {
              setDuration(event.target.getDuration() || 0);
              event.target.setVolume(80);
            } catch (e) {}
          },
          onStateChange: (event) => {
            if (isSyncingRef.current) return;

            if (event.data === window.YT.PlayerState.PLAYING) {
              setLocalPlayState('playing');
              if (canControl) {
                onPlay?.();
              }
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setLocalPlayState('paused');
              if (canControl) {
                onPause?.();
              }
            }
          }
        }
      });

      return true;
    };

    if (!initPlayer()) {
      checkInterval = setInterval(() => {
        if (initPlayer()) {
          clearInterval(checkInterval);
        }
      }, 300);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [videoId]);

  useEffect(() => {
    if (!isReady || !playerRef.current) return;

    try {
      isSyncingRef.current = true;

      const currentUrl = playerRef.current.getVideoUrl?.() || '';
      if (videoId && !currentUrl.includes(videoId)) {
        playerRef.current.loadVideoById({
          videoId,
          startSeconds: currentTime || 0
        });
      }

      const currentPos = playerRef.current.getCurrentTime?.() || 0;
      if (typeof currentTime === 'number' && Math.abs(currentPos - currentTime) > 1.8) {
        playerRef.current.seekTo(currentTime, true);
        setLocalTime(currentTime);
      }

      const playerState = playerRef.current.getPlayerState?.();
      if (playState === 'playing' && playerState !== 1) {
        playerRef.current.playVideo();
        setLocalPlayState('playing');
      } else if (playState === 'paused' && playerState === 1) {
        playerRef.current.pauseVideo();
        setLocalPlayState('paused');
      }

      const timeout = setTimeout(() => {
        isSyncingRef.current = false;
      }, 500);

      return () => clearTimeout(timeout);
    } catch (err) {
      isSyncingRef.current = false;
    }
  }, [playState, currentTime, videoId, isReady]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isReady && playerRef.current?.getCurrentTime) {
        try {
          const t = playerRef.current.getCurrentTime() || 0;
          setLocalTime(t);
          const d = playerRef.current.getDuration() || 0;
          if (d > 0 && d !== duration) setDuration(d);
        } catch (e) {}
      }
    }, 500);

    return () => clearInterval(timer);
  }, [isReady, duration]);

  const handleTogglePlay = () => {
    if (!canControl) {
      triggerRestrictedNotice();
      return;
    }

    if (localPlayState === 'playing') {
      onPause?.();
    } else {
      onPlay?.();
    }
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setLocalTime(newTime);
    if (!canControl) {
      triggerRestrictedNotice();
      return;
    }
    if (playerRef.current?.seekTo) {
      isSyncingRef.current = true;
      playerRef.current.seekTo(newTime, true);
      setTimeout(() => {
        isSyncingRef.current = false;
      }, 400);
    }
    onSeek?.(newTime);
  };

  const handleJumpSeconds = (delta) => {
    if (!canControl) {
      triggerRestrictedNotice();
      return;
    }
    const newTime = Math.max(0, Math.min(duration, localTime + delta));
    setLocalTime(newTime);
    if (playerRef.current?.seekTo) {
      playerRef.current.seekTo(newTime, true);
    }
    onSeek?.(newTime);
  };

  const handleToggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    if (playerRef.current) {
      playerRef.current.setVolume(val);
      if (val > 0 && isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
    }
  };

  const triggerRestrictedNotice = () => {
    setShowRestrictedNotice(true);
    setTimeout(() => setShowRestrictedNotice(false), 3500);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col group"
      style={{ aspectRatio: '16/9' }}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div id="yt-player-target" className="w-full h-full" />
      </div>

      <div
        onClick={handleTogglePlay}
        className="absolute inset-0 cursor-pointer z-10"
      />

      {showRestrictedNotice && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-amber-500/95 text-slate-950 px-4 py-2.5 rounded-xl font-medium shadow-lg flex items-center space-x-2 text-sm backdrop-blur transition-all animate-bounce">
          <ShieldAlert className="w-4 h-4" />
          <span>Playback control is restricted to Host & Moderator.</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRequestAction?.('control');
            }}
            className="underline font-bold hover:text-black ml-1 cursor-pointer"
          >
            Request Permission
          </button>
        </div>
      )}

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-4 z-20 transition-opacity duration-300 opacity-95 group-hover:opacity-100 flex flex-col space-y-2">
        <div className="flex items-center space-x-3 w-full">
          <span className="text-xs font-mono text-slate-300 select-none min-w-[45px]">
            {formatTime(localTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step="0.5"
            value={localTime}
            onChange={handleSeekChange}
            disabled={!canControl}
            className={`w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500 hover:h-2.5 transition-all ${
              !canControl ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          />
          <span className="text-xs font-mono text-slate-400 select-none min-w-[45px]">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleTogglePlay();
              }}
              title={canControl ? (localPlayState === 'playing' ? 'Pause' : 'Play') : 'Restricted to Host/Mod'}
              className={`p-2 rounded-xl transition-all ${
                canControl
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 active:scale-95'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {localPlayState === 'playing' ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleJumpSeconds(-10);
              }}
              disabled={!canControl}
              title="-10s"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-all disabled:opacity-40"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleJumpSeconds(10);
              }}
              disabled={!canControl}
              title="+10s"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-all disabled:opacity-40"
            >
              <FastForward className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 pl-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleMute();
                }}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-red-400" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                onClick={(e) => e.stopPropagation()}
                className="w-16 md:w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
                canControl
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {canControl ? 'Sync Controller' : 'Synced Watcher'}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}
              title="Fullscreen"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;