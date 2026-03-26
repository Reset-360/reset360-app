import { EClientSegment } from '@/types/client';
import { TechniqueContent, USER_TYPE_CONTENT } from './content';
import { useState } from 'react';
import { TECHNIQUE_COLORS } from './techniques';
import { cn } from '@/lib/utils';
import { ArrowLeft, CheckCircle, ChevronRight, Lightbulb, Timer } from 'lucide-react';
import { TechniqueIcon } from './TechniqueIcon';
import BreathingGuide from './BreathingGuide';
import { Button } from '@/components/ui/button';
import StepProgress from './StepProgress';

function GuidedExercise({
  technique,
  userType,
  onBack,
}: {
  technique: TechniqueContent;
  userType: EClientSegment;
  onBack: () => void;
}) {
  const [stage, setStage] = useState<'intro' | 'steps' | 'done'>('intro');
  const [stepIndex, setStepIndex] = useState(0);
  const colors = TECHNIQUE_COLORS[technique.id];
  const userContent = USER_TYPE_CONTENT[userType];
  const tip = userContent.contextualTips[technique.id];

  function beginSteps() {
    setStage('steps');
    setStepIndex(0);
  }
  function nextStep() {
    if (stepIndex < technique.steps.length - 1) setStepIndex((i) => i + 1);
    else setStage('done');
  }
  function restart() {
    setStage('intro');
    setStepIndex(0);
  }

  return (
    <div
      className={cn(
        'min-h-screen bg-gradient-to-br',
        colors.bg,
        'relative overflow-hidden'
      )}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-5 py-8 min-h-screen flex flex-col">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm transition-colors mb-8 w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          All tools
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={cn(
              'p-2.5 rounded-xl border',
              colors.border,
              'bg-white/5'
            )}
          >
            <div className={colors.text}>{<TechniqueIcon id={technique.id} />}</div>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              {technique.title}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <Timer className="w-3 h-3 text-white/40" />
              <span className="text-xs text-white/40">
                {technique.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Contextual tip pill */}
        <div
          className={cn(
            'rounded-xl border px-4 py-3 mb-6 flex gap-2.5',
            colors.border,
            'bg-white/5'
          )}
        >
          <Lightbulb
            className={cn('w-3.5 h-3.5 shrink-0 mt-0.5', colors.text)}
          />
          <p className="text-xs text-white/60 leading-relaxed">
            {tip}
          </p>
        </div>

        {/* ── INTRO ── */}
        {stage === 'intro' && (
          <div className="flex-1 flex flex-col">
            {/* Special breathing guide */}
            {technique.id === 'breathing' && (
              <div className="mb-6">
                <BreathingGuide />
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-5">
              <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                About this exercise
              </h2>
              <p className="text-sm text-white/75 leading-relaxed">
                {technique.intro}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-6">
              <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                {technique.steps.length} steps · {technique.duration}
              </h2>
              <div className="space-y-2.5">
                {technique.steps.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span
                      className={cn(
                        'text-xs font-bold shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center',
                        colors.border,
                        colors.text,
                        'bg-white/5'
                      )}
                    >
                      {i + 1}
                    </span>
                    <p className="text-xs text-white/50 leading-relaxed">
                      {step.instruction.slice(0, 72)}
                      {step.instruction.length > 72 ? '…' : ''}
                      {step.duration && (
                        <span className={cn('ml-1', colors.text)}>
                          {' '}
                          · {step.duration}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={beginSteps}
              className={cn(
                'w-full py-6 text-sm font-semibold tracking-wide rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 text-white transition-all'
              )}
            >
              Begin guided exercise →
            </Button>
          </div>
        )}

        {/* ── STEPS ── */}
        {stage === 'steps' && (
          <div className="flex-1 flex flex-col">
            <StepProgress
              current={stepIndex}
              total={technique.steps.length}
              techniqueId={technique.id}
            />

            <div className="flex-1 flex flex-col justify-center py-8">
              <div
                className={cn(
                  'rounded-3xl border p-8 mb-6 transition-all duration-500',
                  colors.border,
                  'bg-white/5 shadow-2xl',
                  colors.glow
                )}
              >
                {technique.steps[stepIndex].duration && (
                  <div
                    className={cn(
                      'flex items-center gap-1.5 mb-4',
                      colors.text
                    )}
                  >
                    <Timer className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">
                      {technique.steps[stepIndex].duration}
                    </span>
                  </div>
                )}
                <p className="text-lg text-white/90 leading-relaxed font-light">
                  {technique.steps[stepIndex].instruction}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={nextStep}
                className="w-full py-6 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 text-white font-medium transition-all"
              >
                {stepIndex < technique.steps.length - 1
                  ? 'Continue'
                  : 'Complete exercise'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <button
                onClick={restart}
                className="w-full text-xs text-white/30 hover:text-white/50 transition-colors py-1"
              >
                Start over
              </button>
            </div>
          </div>
        )}

        {/* ── DONE ── */}
        {stage === 'done' && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-8">
              <div
                className={cn(
                  'w-16 h-16 rounded-full border mx-auto mb-5 flex items-center justify-center',
                  colors.border,
                  'bg-white/10'
                )}
              >
                <CheckCircle className={cn('w-7 h-7', colors.text)} />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-1">
                Well done.
              </h2>
              <p className="text-sm text-white/50">Exercise complete</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-4">
              <p className="text-sm text-white/75 leading-relaxed">
                {technique.closing}
              </p>
            </div>

            <div
              className={cn(
                'rounded-2xl border p-4 mb-8 flex gap-3',
                colors.border,
                'bg-white/5'
              )}
            >
              <Lightbulb
                className={cn('w-4 h-4 shrink-0 mt-0.5', colors.text)}
              />
              <div>
                <p className={cn('text-xs font-semibold mb-1', colors.text)}>
                  Daily practice tip
                </p>
                <p className="text-xs text-white/55 leading-relaxed">
                  {technique.tip}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={restart}
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-xl"
              >
                Do it again
              </Button>
              <Button
                variant="outline"
                onClick={onBack}
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-xl"
              >
                All tools
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GuidedExercise;
