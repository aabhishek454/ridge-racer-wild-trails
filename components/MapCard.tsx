"use client";

import { MapId, MAPS } from "@/game/config/maps";
import { useGameStore } from "@/store/gameStore";
import Link from "next/link";

export function MapCard({ id }: { id: MapId }) {
  const m = MAPS[id];
  const store = useGameStore();
  const unlocked = store.unlockedMaps.includes(id);
  const best = store.bestDistance[id] || 0;
  const canUnlock = store.canUnlockMap(id);
  const stars = "★".repeat(m.difficulty) + "☆".repeat(5 - m.difficulty);

  return (
    <div className={`rounded-2xl overflow-hidden border transition ${unlocked ? "border-white/15 bg-slate-800/80" : "border-white/5 bg-slate-900/50 opacity-75"}`}>
      <div className="h-28 relative" style={{ background: `linear-gradient(to bottom, ${m.skyTop}, ${m.skyBottom})` }}>
        <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: `linear-gradient(to top, ${m.groundColor}, transparent)` }} />
        <div className="absolute inset-0 flex items-end p-3">
          <h3 className="text-xl font-black text-white drop-shadow-lg">{m.name}</h3>
        </div>
        {!unlocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-3xl">🔒</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-amber-400 text-sm mb-1">{stars}</div>
        <p className="text-white/50 text-xs mb-3 line-clamp-2">{m.description}</p>

        {unlocked ? (
          <>
            <div className="text-xs text-white/40 mb-3">
              Best: <span className="text-white font-semibold">{best.toLocaleString()} m</span>
            </div>
            <Link
              href={`/game?map=${id}`}
              className="block w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition"
            >
              PLAY
            </Link>
          </>
        ) : (
          <div className="text-xs text-amber-400/80">
            {canUnlock ? (
              <button onClick={() => store.unlockMap(id)} className="w-full py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold">
                Unlock Now
              </button>
            ) : (
              <div>
                Reach {m.unlockDistance.toLocaleString()} total meters
                <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (store.totalDistance / m.unlockDistance) * 100)}%` }} />
                </div>
                <div className="text-right text-white/40 mt-0.5">
                  {Math.floor(Math.min(100, (store.totalDistance / m.unlockDistance) * 100))}%
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
