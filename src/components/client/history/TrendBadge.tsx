import { Minus, TrendingDown, TrendingUp } from 'lucide-react';

function TrendBadge({ current, previous }: { current?: number; previous?: number }) {
  if (!current || !previous) return null;
  const delta = current - previous;
  if (Math.abs(delta) < 2) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <Minus className="w-3 h-3" /> Stable
      </span>
    );
  }
  if (delta < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
        <TrendingDown className="w-3.5 h-3.5" /> Improving
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-rose-500 font-medium">
      <TrendingUp className="w-3.5 h-3.5" /> Increasing
    </span>
  );
}

export default TrendBadge