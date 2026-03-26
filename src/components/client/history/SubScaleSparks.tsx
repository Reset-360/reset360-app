import { FACTOR_META } from '@/constants/adapts/FactorMeta';
import { IAssessment, RCADSFactor } from '@/types/adapts';
import clsx from 'clsx';

function SubScaleSparks({ subscales }: { subscales?: IAssessment['subscales'] }) {
  if (!subscales) return null;

  const factors: RCADSFactor[] = ['MDD', 'GAD', 'PD', 'SoA', 'SeA', 'OCD'];

  return (
    <div className="flex items-end gap-1 h-6">
      {factors.map((f) => {
        const sub = subscales[f];
        if (!sub) return null;
        const pct = sub.percentOfMax ?? 0;
        const isElevated = sub.isBorderlineClinical || sub.isClinical;
        return (
          <div key={f} className="flex flex-col items-center gap-0.5 group relative">
            <div
              className={clsx(
                'w-2 rounded-sm transition-all',
                isElevated ? 'bg-amber-400' : 'bg-muted-foreground/25'
              )}
              style={{ height: `${Math.max(4, (pct / 100) * 24)}px` }}
            />
            {/* Tooltip */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-popover border border-border text-xs text-foreground px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm z-10">
              {FACTOR_META[f]?.label ?? f}: {pct}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SubScaleSparks