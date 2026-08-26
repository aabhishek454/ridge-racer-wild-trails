"use client";

import { VehicleId, VEHICLES, getEffectiveStats } from "@/game/config/vehicles";
import { useGameStore, UpgradeKey } from "@/store/gameStore";
import { MAX_UPGRADE_LEVEL } from "@/game/config/constants";

const LABELS: Record<UpgradeKey, string> = {
  engine: "Engine",
  grip: "Grip",
  suspension: "Suspension",
  fuel: "Fuel Tank",
};

export function UpgradePanel({ vehicleId }: { vehicleId: VehicleId }) {
  const store = useGameStore();
  const upgrades = store.vehicleUpgrades[vehicleId];
  const base = VEHICLES[vehicleId];
  const effective = getEffectiveStats(base, upgrades);
  const owned = store.ownedVehicles.includes(vehicleId);

  if (!owned) {
    return <div className="text-center text-white/40 py-8">Unlock this vehicle to upgrade it.</div>;
  }

  const keys: UpgradeKey[] = ["engine", "grip", "suspension", "fuel"];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: "Speed", value: effective.topSpeed },
          { label: "Accel", value: effective.acceleration },
          { label: "Grip", value: effective.grip },
          { label: "Susp.", value: effective.suspension },
        ].map((s) => (
          <div key={s.label} className="bg-white/5 rounded-lg p-2">
            <div className="text-[10px] text-white/50 uppercase">{s.label}</div>
            <div className="h-2 bg-white/10 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full" style={{ width: `${s.value * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      {keys.map((key) => {
        const level = upgrades[key];
        const maxed = level >= MAX_UPGRADE_LEVEL;
        const cost = store.getUpgradeCost(level);
        const canAfford = store.coins >= cost;

        return (
          <div key={key} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-white text-sm">{LABELS[key]}</span>
                <span className="text-cyan-400 text-xs font-bold">LVL {level}{maxed ? " MAX" : ""}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all" style={{ width: `${(level / MAX_UPGRADE_LEVEL) * 100}%` }} />
              </div>
            </div>
            <button
              disabled={maxed || !canAfford}
              onClick={() => store.upgradeVehicle(vehicleId, key)}
              className={`shrink-0 px-3 py-2 rounded-lg text-xs font-bold transition ${
                maxed ? "bg-white/5 text-white/30 cursor-not-allowed"
                : canAfford ? "bg-amber-500 hover:bg-amber-400 text-black active:scale-95"
                : "bg-white/5 text-white/40 cursor-not-allowed"
              }`}
            >
              {maxed ? "MAX" : `${cost} ●`}
            </button>
          </div>
        );
      })}
    </div>
  );
}
