"use client";

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
  onExit: () => void;
}

export function PauseMenu({ onResume, onRestart, onExit }: PauseMenuProps) {
  return (
    <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 max-w-sm w-full border border-white/10 shadow-2xl text-center">
        <h2 className="text-3xl font-black text-white mb-6 tracking-tight">PAUSED</h2>
        <div className="flex flex-col gap-3">
          <button onClick={onResume} className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg transition active:scale-95">
            Resume
          </button>
          <button onClick={onRestart} className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition active:scale-95">
            Restart
          </button>
          <button onClick={onExit} className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-lg transition active:scale-95 border border-white/20">
            Exit to Menu
          </button>
        </div>
        <p className="mt-6 text-white/40 text-xs">P / Esc to resume · R to restart</p>
      </div>
    </div>
  );
}
