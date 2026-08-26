"use client";

import { VehicleId, VEHICLES } from "@/game/config/vehicles";
import { useGameStore } from "@/store/gameStore";

interface VehicleCardProps {
  id: VehicleId;
  selected: boolean;
  onSelect: () => void;
}

export function VehicleCard({ id, selected, onSelect }: VehicleCardProps) {
  const v = VEHICLES[id];
  const store = useGameStore();
  const owned = store.ownedVehicles.includes(id);
  const canUnlock = store.canUnlockVehicle(id);
  const upgrades = store.vehicleUpgrades[id];

  return (
    <div
      className={`relative rounded-2xl p-4 border transition-all cursor-pointer ${
        selected
          ? "bg-gradient-to-br from-cyan-900/60 to-slate-900 border-cyan-400/60 shadow-lg shadow-cyan-500/20"
          : owned
          ? "bg-slate-800/80 border-white/10 hover:border-white/30"
          : "bg-slate-900/60 border-white/5 opacity-80"
      }`}
      onClick={onSelect}
    >
      <div
        className="h-20 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${v.color}44, ${v.accent}22)` }}
      >
        <svg width={v.chassisWidth * 0.55 + 40} height={v.chassisHeight * 0.55 + v.wheelRadius * 1.1 + 10} viewBox={`0 0 ${v.chassisWidth + 40} ${v.chassisHeight + v.wheelRadius * 2 + 20}`}>
          <rect x={20} y={10} width={v.chassisWidth} height={v.chassisHeight} rx={6} fill={v.color} stroke={v.accent} strokeWidth={2} />
          <rect x={20 + v.chassisWidth * 0.4} y={4} width={v.chassisWidth * 0.35} height={v.chassisHeight * 0.6} rx={3} fill="rgba(255,255,255,0.3)" />
          <circle cx={20 + 15} cy={10 + v.chassisHeight + 4} r={v.wheelRadius * 0.9} fill={v.wheelColor} />
          <circle cx={20 + v.chassisWidth - 15} cy={10 + v.chassisHeight + 4} r={v.wheelRadius * 0.9} fill={v.wheelColor} />
        </svg>
        {!owned && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
        )}
      </div>

      <h3 className="font-bold text-white text-lg">{v.name}</h3>
      <p className="text-white/50 text-xs mt-0.5 line-clamp-2">{v.description}</p>

      {owned ? (
        <div className="mt-3 flex gap-1">
          {(["engine", "grip", "suspension", "fuel"] as const).map((k) => (
            <div key={k} className="flex-1">
              <div className="text-[9px] text-white/40 uppercase">{k.slice(0, 3)}</div>
              <div className="h-1.5 bg-white/10 rounded-full mt-0.5">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${(upgrades[k] / 8) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 text-xs text-amber-400/90">
          {canUnlock ? (
            <button
              onClick={(e) => { e.stopPropagation(); store.unlockVehicle(id); }}
              className="w-full py-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold hover:bg-amber-500/30"
            >
              Unlock · {v.unlockCoins} ●
            </button>
          ) : (
            <div>Need {v.unlockDistance.toLocaleString()} m{v.unlockCoins > 0 && ` & ${v.unlockCoins} coins`}</div>
          )}
        </div>
      )}

      {selected && owned && (
        <div className="absolute top-2 right-2 bg-cyan-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">SELECTED</div>
      )}
    </div>
  );
}
