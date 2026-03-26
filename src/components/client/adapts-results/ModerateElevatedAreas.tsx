import React, { useState } from 'react';
import SubscaleBar from './SubscaleBar';
import SeverityPill from './SeverityPill';
import { FACTOR_META } from '@/constants/adapts/FactorMeta';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { RCADSFactor, TScoreResult } from '@/types/adapts';

/**
 * For moderate risk: shows the primary elevated subscale's description first,
 * then collapses secondary elevated subscales under "Other areas to watch".
 * This prevents overwhelming the client with too many findings at once.
 */
function ModerateElevatedAreas({ result }: { result: TScoreResult }) {
  const [expanded, setExpanded] = useState(false);

  const PRIORITY_ORDER: RCADSFactor[] = [
    'MDD',
    'OCD',
    'GAD',
    'PD',
    'SoA',
    'SeA',
  ];
  
  const elevated = PRIORITY_ORDER.filter((f) =>
    result.elevatedSubscales.includes(f)
  );

  const primary = elevated[0];
  const secondary = elevated.slice(1);

  if (!primary) return null;

  return (
    <div className="space-y-3">
      {/* Primary elevated subscale — always visible */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-amber-900">
              {FACTOR_META[primary].label}
            </p>
            <p className="text-xs text-amber-700 mt-1">
              {FACTOR_META[primary].description}
            </p>
          </div>
          <SeverityPill percentOfMax={result.subscales[primary].percentOfMax} />
        </div>
        <SubscaleBar
          percentOfMax={result.subscales[primary].percentOfMax}
          isElevated={true}
        />
      </div>

      {/* Secondary elevated subscales — collapsed */}
      {secondary.length > 0 && (
        <>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
            {expanded
              ? 'Hide'
              : `${secondary.length} other area${secondary.length > 1 ? 's' : ''} to watch`}
          </button>

          {expanded && (
            <div className="space-y-2">
              {secondary.map((f) => (
                <div
                  key={f}
                  className="rounded-xl border border-border bg-muted/30 p-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {FACTOR_META[f].label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {FACTOR_META[f].description}
                      </p>
                    </div>
                    <SeverityPill
                      percentOfMax={result.subscales[f].percentOfMax}
                    />
                  </div>
                  <SubscaleBar
                    percentOfMax={result.subscales[f].percentOfMax}
                    isElevated={true}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ModerateElevatedAreas;
