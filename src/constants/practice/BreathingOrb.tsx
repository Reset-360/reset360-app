import { cn } from '@/lib/utils';
import { Wind } from 'lucide-react';

function BreathingOrb({
  phase,
}: {
  phase: 'inhale' | 'hold' | 'exhale' | 'idle';
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 pt-14 ">
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <div
          className={cn(
            'absolute rounded-full transition-all duration-1000',
            phase === 'inhale'
              ? 'w-52 h-52 bg-sky-500/10 scale-110'
              : phase === 'hold'
                ? 'w-52 h-52 bg-sky-500/15'
                : phase === 'exhale'
                  ? 'w-40 h-40 bg-sky-500/10 scale-90'
                  : 'w-44 h-44 bg-sky-500/8'
          )}
        />
        {/* Middle ring */}
        <div
          className={cn(
            'absolute rounded-full border transition-all duration-1000',
            phase === 'inhale'
              ? 'w-40 h-40 border-sky-400/30 scale-110'
              : phase === 'hold'
                ? 'w-40 h-40 border-sky-400/40'
                : phase === 'exhale'
                  ? 'w-28 h-28 border-sky-400/20 scale-90'
                  : 'w-32 h-32 border-sky-400/20'
          )}
        />
        {/* Core orb */}
        <div
          className={cn(
            'relative rounded-full flex items-center justify-center transition-all duration-1000',
            phase === 'inhale'
              ? 'w-28 h-28 bg-sky-500/30 border border-sky-400/50 scale-110'
              : phase === 'hold'
                ? 'w-28 h-28 bg-sky-500/40 border border-sky-400/60'
                : phase === 'exhale'
                  ? 'w-20 h-20 bg-sky-500/20 border border-sky-400/30 scale-90'
                  : 'w-24 h-24 bg-sky-500/25 border border-sky-400/40'
          )}
        >
          <Wind className="w-8 h-8 text-sky-300/70" />
        </div>
      </div>
      <p
        className={cn(
          'mt-14 text-sm font-medium tracking-widest uppercase transition-all duration-500',
          phase === 'idle' ? 'text-white/30' : 'text-sky-300'
        )}
      >
        {phase === 'inhale'
          ? 'Breathe in'
          : phase === 'hold'
            ? 'Hold'
            : phase === 'exhale'
              ? 'Breathe out'
              : 'Ready'}
      </p>
    </div>
  );
}

export default BreathingOrb;
