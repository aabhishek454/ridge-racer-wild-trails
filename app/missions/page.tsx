"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";

export default function MissionsPage() {
  const missions = useGameStore((s) => s.missions);
  const claimMission = useGameStore((s) => s.claimMission);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="min-h-[60vh] flex items-center justify-center text-white/40">Loading missions...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Missions</h1>
      <p className="text-white/50 text-sm mb-6">Complete challenges to earn bonus coins.</p>

      <div className="space-y-3">
        {missions.map((m) => {
          const pct = Math.min(100, (m.progress / m.target) * 100);
          return (
            <div
              key={m.id}
              className={`rounded-2xl p-4 border ${
                m.claimed ? "bg-slate-900/40 border-white/5 opacity-60"
                : m.completed ? "bg-emerald-900/30 border-emerald-500/40"
                : "bg-slate-800/60 border-white/10"
              }`}
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-bold text-white">{m.title}</h3>
                  <p className="text-white/50 text-xs mt-0.5">{m.description}</p>
                </div>
                <div className="text-amber-400 font-bold text-sm shrink-0">+{m.reward} ●</div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-white/40 mb-1">
                  <span>{Math.floor(m.progress).toLocaleString()} / {m.target.toLocaleString()}</span>
                  <span>{Math.floor(pct)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${m.completed ? "bg-emerald-400" : "bg-gradient-to-r from-cyan-500 to-blue-400"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              {m.completed && !m.claimed && (
                <button
                  onClick={() => claimMission(m.id)}
                  className="mt-3 w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm active:scale-[0.98] transition"
                >
                  CLAIM REWARD
                </button>
              )}
              {m.claimed && (
                <div className="mt-2 text-center text-emerald-400/70 text-xs font-semibold">✓ Claimed</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
