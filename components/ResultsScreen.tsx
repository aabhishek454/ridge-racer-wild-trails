"use client";

interface Results {
  distance: number;
  coins: number;
  distanceBonus: number;
  airBonus: number;
  totalCoins: number;
  airtime: number;
  flips: number;
  checkpoints: number;
  fuelCans: number;
}

interface ResultsScreenProps {
  results: Results;
  onRetry: () => void;
  onGarage: () => void;
  onMaps: () => void;
}

export function ResultsScreen({ results, onRetry, onGarage, onMaps }: ResultsScreenProps) {
  return (
    <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/10 shadow-2xl my-4">
        <h2 className="text-center text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-1">
          RUN COMPLETE
        </h2>
        <p className="text-center text-white/50 text-sm mb-6">Great trail!</p>

        <div className="space-y-3 mb-6">
          <Row label="Distance" value={`${results.distance.toLocaleString()} m`} />
          <Row label="Coins collected" value={String(results.coins)} highlight />
          <Row label="Distance bonus" value={`+${results.distanceBonus}`} />
          <Row label="Airtime bonus" value={`+${results.airBonus}`} />
          <Row label="Total earned" value={`+${results.totalCoins}`} big highlight />
          <div className="h-px bg-white/10 my-2" />
          <Row label="Airtime" value={`${results.airtime.toFixed(1)} s`} />
          <Row label="Flips" value={String(results.flips)} />
          <Row label="Checkpoints" value={String(results.checkpoints)} />
          <Row label="Fuel cans" value={String(results.fuelCans)} />
        </div>

        <div className="flex flex-col gap-2.5">
          <button onClick={onRetry} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-lg transition active:scale-[0.98] shadow-lg shadow-emerald-500/25">
            RETRY
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <button onClick={onGarage} className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/15 transition">GARAGE</button>
            <button onClick={onMaps} className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/15 transition">MAPS</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight, big }: { label: string; value: string; highlight?: boolean; big?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-white/60 text-sm">{label}</span>
      <span className={`font-bold tabular-nums ${big ? "text-2xl text-amber-400" : highlight ? "text-lg text-yellow-300" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}
