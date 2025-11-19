// 🎨 Risk styling helpers
export function getRiskLevelColor(
  riskLevel: string
) {
  if (riskLevel.includes('High')) return 'bg-red-500';
  if (riskLevel.includes('Moderate')) return 'bg-amber-500';
  return 'bg-emerald-500';
}
export function getRiskTextColor(
  riskLevel: string
) {
  if (riskLevel.includes('High')) return 'text-red-500';
  if (riskLevel.includes('Moderate')) return 'text-amber-500';
  return 'text-emerald-500';
}

export function getRiskAccentClasses(riskLevel: string): string {
  if (riskLevel.includes('High')) {
    return 'border-destructive/40 bg-destructive/5';
  }
  if (riskLevel.includes('Moderate')) {
    return 'border-amber-500/40 bg-amber-500/5';
  }
  return 'border-emerald-500/40 bg-emerald-500/20';
}

// 🔢 Utility: safely normalize for a progress bar
export function normalizeTo100(value: number, max: number): number {
  if (max <= 0) return 0;
  const ratio = value / max;
  return Math.min(100, Math.max(0, ratio * 100));
}