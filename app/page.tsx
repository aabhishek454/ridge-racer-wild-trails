"use client";

import Link from "next/link";
import { useGameStore } from "@/store/gameStore";
import { VEHICLES } from "@/game/config/vehicles";
import { useEffect, useState } from "react";

export default function HomePage() {
  const coins = useGameStore((s) => s.coins);
  const totalDistance = useGameStore((s) => s.totalDistance);
  const selected = useGameStore((s) => s.selectedVehicle);
  const vehicle = VEHICLES[selected];
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-white/40 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100dvh-4rem)] overflow-hidden pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d2137] to-[#1a3a2a]">
        <svg className="absolute bottom-0 left-0 right-0 w-full h-48 text-emerald-900/40" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,200 L0,120 Q150,40 300,90 T600,70 T900,100 T1200,60 L1200,200 Z" />
        </svg>
        <svg className="absolute bottom-0 left-0 right-0 w-full h-32 text-emerald-800/50" viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,150 L0,100 Q200,30 400,80 T800,50 T1200,90 L1200,150 Z" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-emerald-300">
              RIDGE RACER
            </span>
          </h1>
          <p className="text-lg sm:text-xl font-bold text-amber-400/90 tracking-[0.3em] mt-1">WILD TRAILS</p>
        </div>

        <div className="flex gap-4 mb-8 text-sm">
          <div className="bg-black/40 backdrop-blur rounded-full px-4 py-2 border border-yellow-500/30 flex items-center gap-2">
            <span className="text-yellow-400">●</span>
            <span className="font-bold text-yellow-200">{coins.toLocaleString()}</span>
          </div>
          <div className="bg-black/40 backdrop-blur rounded-full px-4 py-2 border border-white/10">
            <span className="text-white/50">Total </span>
            <span className="font-bold">{Math.floor(totalDistance).toLocaleString()} m</span>
          </div>
        </div>

        <div className="mb-8 text-center">
          <div className="inline-block px-8 py-4 rounded-2xl border border-white/10" style={{ background: `linear-gradient(135deg, ${vehicle.color}33, transparent)` }}>
            <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Current Vehicle</div>
            <div className="text-xl font-bold" style={{ color: vehicle.color }}>{vehicle.name}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/maps" className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-black text-xl text-center shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition">
            PLAY
          </Link>
          <Link href="/garage" className="w-full py-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white font-bold text-lg text-center hover:bg-white/15 active:scale-[0.98] transition">
            GARAGE
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/missions" className="py-3 rounded-xl bg-white/5 border border-white/10 text-white/90 font-semibold text-center hover:bg-white/10 transition">Missions</Link>
            <Link href="/settings" className="py-3 rounded-xl bg-white/5 border border-white/10 text-white/90 font-semibold text-center hover:bg-white/10 transition">Settings</Link>
          </div>
        </div>

        <p className="mt-10 text-white/30 text-xs text-center max-w-sm">
          Arrow keys / WASD to drive · Space brake · P pause<br />Touch controls on mobile
        </p>
      </div>
    </div>
  );
}
