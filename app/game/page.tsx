"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GameCanvas } from "@/components/GameCanvas";
import { MapId, MAPS } from "@/game/config/maps";
import { VehicleId } from "@/game/config/vehicles";
import { useGameStore } from "@/store/gameStore";

function GameInner() {
  const search = useSearchParams();
  const router = useRouter();
  const store = useGameStore();
  const mapParam = (search.get("map") as MapId) || "green_valley";
  const mapId: MapId = MAPS[mapParam] ? mapParam : "green_valley";
  const vehicleId: VehicleId = store.selectedVehicle;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!store.unlockedMaps.includes(mapId)) {
      router.replace("/maps");
      return;
    }
    setReady(true);
  }, [mapId, store.unlockedMaps, router]);

  if (!ready) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-black text-white/50">
        Loading trail...
      </div>
    );
  }

  return (
    <GameCanvas
      mapId={mapId}
      vehicleId={vehicleId}
      onExit={() => router.push("/")}
    />
  );
}

export default function GamePage() {
  return (
    <Suspense
      fallback={
        <div className="h-[100dvh] flex items-center justify-center bg-black text-white/50">
          Loading...
        </div>
      }
    >
      <GameInner />
    </Suspense>
  );
}
