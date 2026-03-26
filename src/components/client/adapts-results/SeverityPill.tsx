import React from 'react';

function SeverityPill({ percentOfMax }: { percentOfMax: number }) {
  if (percentOfMax >= 75)
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 w-[95px] text-center">
        Very High
      </span>
    );
  if (percentOfMax >= 55)
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-200 text-amber-700 w-[95px]  text-center">
        Elevated
      </span>
    );
  if (percentOfMax >= 35)
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 w-[95px] text-center">
        Moderate
      </span>
    );
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 w-[95px]  text-center">
      Low
    </span>
  );
}

export default SeverityPill;
