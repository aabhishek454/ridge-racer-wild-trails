"use client";

import { useEffect, useState } from "react";

interface HUDProps {
  distance: number;
  coins: number;
  fuel: number;
  maxFuel: number;
  speed: number;
  airtime: boolean;
  eventText: string;
  eventKey: number;
  fps?: number;
}

export function HUD({
  distance, coins, fuel, maxFuel, speed, airtime, eventText, eventKey, fps,
}: HUDProps) {
  const [showEvent, setShowEvent] = useState(false);
  const fuelPct = Math.max(0, Math.min(100, (fuel / maxFuel) * 100));
  const lowFuel = fuelPct < 20;

  useEffect(() => {
    if (eventText) {
      setShowEvent(true);
      const t = setTimeout(() => setShowEvent(false), 1800);
      return () => clearTimeout(t);
    }
  }, [eventKey, eventText]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 font-sans">
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
        <div className="bg-black/50 backdrop-blur-md rounded-xl px-3 py-2 border border-white/10">
          <div className="text-[10px] uppercase tracking-widest text-white/60">Distance</div>
          <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
            {distance.toLocaleString()} <span className="text-sm font-normal text-white/70">m</span>
          </div>
        </div>
      </div>

      <div className="absolute top-3 left-1/2 -translate-x-1/2 sm:top-4">
        <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-yellow-500/30 flex items-center gap-2">
          <span className="text-yellow-400 text-lg">●</span>
          <span className="text-xl font-bold text-yellow-300 tabular-nums">{coins}</span>
        </div>
      </div>

      <div className="absolute top-3 right-16 sm:top-4 sm:right-20">
        <div className={`bg-black/50 backdrop-blur-md rounded-xl px-3 py-2 border ${lowFuel ? "border-red-500/60 animate-pulse" : "border-white/10"}`}>
          <div className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Fuel</div>
          <div className="w-24 sm:w-32 h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${lowFuel ? "bg-gradient-to-r from-red-600 to-red-400" : "bg-gradient-to-r from-emerald-600 to-emerald-400"}`}
              style={{ width: `${fuelPct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2">
        <div className="bg-black/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/15 text-center min-w-[120px]">
          <div className="text-3xl sm:text-4xl font-bold text-white tabular-nums">{Math.round(speed)}</div>
          <div className="text-xs text-white/50 uppercase tracking-wider">km/h</div>
          <div className="mt-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-150" style={{ width: `${Math.min(100, speed)}%` }} />
          </div>
        </div>
      </div>

      {airtime && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2">
          <div className="bg-purple-600/80 text-white text-sm font-bold px-4 py-1 rounded-full animate-bounce">AIRTIME</div>
        </div>
      )}

      {showEvent && eventText && (
        <div key={eventKey} className="absolute top-1/3 left-1/2 -translate-x-1/2 animate-event">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-lg sm:text-2xl px-6 py-3 rounded-xl shadow-2xl border-2 border-white/30 tracking-wide">
            {eventText}
          </div>
        </div>
      )}

      {fps !== undefined && (
        <div className="absolute bottom-2 left-2 text-xs text-white/40">{fps} FPS</div>
      )}
    </div>
  );
}
