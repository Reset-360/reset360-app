import { cn } from '@/lib/utils';
import { TechniqueId } from './content';
import { TECHNIQUE_COLORS } from './techniques';

function StepProgress({
  current,
  total,
  techniqueId,
}: {
  current: number;
  total: number;
  techniqueId: TechniqueId;
}) {
  const colors = TECHNIQUE_COLORS[techniqueId];
  return (
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-1 rounded-full transition-all duration-500',
            i < current
              ? cn('bg-current opacity-100', colors.text)
              : i === current
                ? cn('bg-current opacity-70 w-6', colors.text)
                : 'bg-white/15 w-3'
          )}
          style={{
            width: i < current ? '12px' : i === current ? '24px' : '12px',
          }}
        />
      ))}
      <span className="text-xs text-white/40 ml-2">
        {current + 1}/{total}
      </span>
    </div>
  );
}

export default StepProgress;
