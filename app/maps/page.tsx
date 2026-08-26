"use client";

import { useEffect, useState } from "react";
import { MAP_ORDER } from "@/game/config/maps";
import { MapCard } from "@/components/MapCard";
import { useGameStore } from "@/store/gameStore";

export default function MapsPage() {
  const totalDistance = useGameStore((s) => s.totalDistance);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="min-h-[60vh] flex items-center justify-center text-white/40">Loading maps...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Maps</h1>
        <p className="text-white/50 text-sm mt-1">Total distance: {Math.floor(totalDistance).toLocaleString()} m</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MAP_ORDER.map((id) => (
          <MapCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
}
