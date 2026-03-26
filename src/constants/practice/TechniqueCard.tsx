import { EClientSegment } from '@/types/client';
import { TechniqueContent } from './content';
import { TECHNIQUE_COLORS } from './techniques';
import { cn } from '@/lib/utils';
import { TechniqueIcon } from './TechniqueIcon';
import { ChevronRight } from 'lucide-react';

function TechniqueCard({
  technique,
  userType,
  index,
  onClick,
}: {
  technique: TechniqueContent;
  userType: EClientSegment;
  index: number;
  onClick: () => void;
}) {
  const colors = TECHNIQUE_COLORS[technique.id];

  return (
    <button
      onClick={onClick}
      className={cn(
        'group w-full text-left rounded-2xl border transition-all duration-300 p-5',
        'bg-white/[0.04] hover:bg-white/[0.08]',
        colors.border,
        'hover:shadow-lg',
        colors.glow
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'p-2.5 rounded-xl border shrink-0 transition-all duration-300',
            colors.border,
            'bg-white/5 group-hover:bg-white/10',
            colors.text
          )}
        >
          <TechniqueIcon id={technique.id} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white/90 text-sm">
              {technique.title}
            </span>
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-full border',
                colors.pill
              )}
            >
              {technique.duration}
            </span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            {technique.tagline}
          </p>
          <p className="text-xs text-white/30 mt-1.5 truncate">
            <span className="text-white/40">Best for: </span>
            {technique.bestFor}
          </p>
        </div>

        <ChevronRight className="w-4 h-4 text-white/25 group-hover:text-white/60 shrink-0 mt-1 transition-all duration-200 group-hover:translate-x-0.5" />
      </div>
    </button>
  );
}

export default TechniqueCard;
