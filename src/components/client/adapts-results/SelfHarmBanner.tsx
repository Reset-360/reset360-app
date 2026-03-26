import { AlertTriangle } from 'lucide-react';
import React from 'react'

const SelfHarmBanner = () => {
  return (
    <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-4 flex gap-3">
      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-rose-900">
          Important! Please read this first.
        </p>
        <p className="text-sm text-rose-700 mt-1 leading-relaxed">
          Your responses indicate you may be having thoughts of hurting
          yourself. You do not have to face this alone. Please reach out to a
          trusted person or crisis resource as soon as possible.
        </p>
      </div>
    </div>
  );
}

export default SelfHarmBanner