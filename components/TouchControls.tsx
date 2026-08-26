"use client";

interface TouchControlsProps {
  onBrake: (pressed: boolean) => void;
  onGas: (pressed: boolean) => void;
}

export function TouchControls({ onBrake, onGas }: TouchControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between items-end p-4 sm:p-6 pointer-events-none md:hidden">
      <button
        className="pointer-events-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-red-600/80 active:bg-red-500 border-4 border-red-300/50 text-white font-black text-lg shadow-2xl active:scale-95 transition-transform backdrop-blur-sm flex items-center justify-center select-none touch-none"
        onTouchStart={(e) => { e.preventDefault(); onBrake(true); }}
        onTouchEnd={(e) => { e.preventDefault(); onBrake(false); }}
        onTouchCancel={() => onBrake(false)}
        onMouseDown={() => onBrake(true)}
        onMouseUp={() => onBrake(false)}
        onMouseLeave={() => onBrake(false)}
        aria-label="Brake"
      >
        BRAKE
      </button>
      <button
        className="pointer-events-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-600/80 active:bg-emerald-500 border-4 border-emerald-300/50 text-white font-black text-lg shadow-2xl active:scale-95 transition-transform backdrop-blur-sm flex items-center justify-center select-none touch-none"
        onTouchStart={(e) => { e.preventDefault(); onGas(true); }}
        onTouchEnd={(e) => { e.preventDefault(); onGas(false); }}
        onTouchCancel={() => onGas(false)}
        onMouseDown={() => onGas(true)}
        onMouseUp={() => onGas(false)}
        onMouseLeave={() => onGas(false)}
        aria-label="Accelerate"
      >
        GAS
      </button>
    </div>
  );
}
