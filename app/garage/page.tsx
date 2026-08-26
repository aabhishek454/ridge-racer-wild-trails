"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { VEHICLE_ORDER, VehicleId, VEHICLES } from "@/game/config/vehicles";
import { VehicleCard } from "@/components/VehicleCard";
import { UpgradePanel } from "@/components/UpgradePanel";

export default function GaragePage() {
  const store = useGameStore();
  const [selected, setSelected] = useState<VehicleId>(store.selectedVehicle);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSelected(store.selectedVehicle);
  }, [store.selectedVehicle]);

  if (!mounted) {
    return <div className="min-h-[60vh] flex items-center justify-center text-white/40">Loading garage...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Garage</h1>
        <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-1.5 flex items-center gap-2">
          <span className="text-yellow-400">●</span>
          <span className="font-bold text-yellow-200">{store.coins.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {VEHICLE_ORDER.map((id) => (
          <VehicleCard
            key={id}
            id={id}
            selected={selected === id}
            onSelect={() => {
              setSelected(id);
              if (store.ownedVehicles.includes(id)) store.selectVehicle(id);
            }}
          />
        ))}
      </div>

      <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/10">
        <h2 className="text-lg font-bold text-white mb-1">Upgrades — {VEHICLES[selected].name}</h2>
        <p className="text-white/40 text-xs mb-4">Improve performance with coins earned on the trails.</p>
        <UpgradePanel vehicleId={selected} />
      </div>
    </div>
  );
}
