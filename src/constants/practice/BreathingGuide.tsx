import { useCallback, useEffect, useRef, useState } from 'react';
import BreathingOrb from './BreathingOrb';
import { Button } from '@/components/ui/button';

function BreathingGuide() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'idle'>(
    'idle'
  );
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const PHASES: Array<{
    name: 'inhale' | 'hold' | 'exhale';
    duration: number;
  }> = [
    { name: 'inhale', duration: 4 },
    { name: 'hold', duration: 2 },
    { name: 'exhale', duration: 6 },
  ];

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setPhase('idle');
    setCount(0);
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
    let phaseIndex = 0;
    let tick = 0;
    setPhase(PHASES[0].name);
    setCount(PHASES[0].duration);

    intervalRef.current = setInterval(() => {
      tick++;
      const current = PHASES[phaseIndex];
      const remaining = current.duration - tick;

      if (remaining <= 0) {
        phaseIndex = (phaseIndex + 1) % PHASES.length;
        if (phaseIndex === 0) setCycles((c) => c + 1);
        tick = 0;
        setPhase(PHASES[phaseIndex].name);
        setCount(PHASES[phaseIndex].duration);
      } else {
        setCount(remaining);
      }
    }, 1000);
  }, []);

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    },
    []
  );

  return (
    <div className="flex flex-col items-center">
      <BreathingOrb phase={phase} />
      {cycles > 0 && (
        <p className="text-white/40 text-xs mb-4">
          {cycles} cycle{cycles !== 1 ? 's' : ''} completed
        </p>
      )}
      {isRunning && (
        <p className="text-sky-300/60 text-2xl font-light mb-6 tabular-nums">
          {count}
        </p>
      )}
      <Button
        onClick={isRunning ? stop : start}
        variant="outline"
        className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white px-8"
      >
        {isRunning ? 'Stop' : 'Start breathing guide'}
      </Button>
    </div>
  );
}

export default BreathingGuide;
