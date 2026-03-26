'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TECHNIQUES,
  USER_TYPE_CONTENT,
  type TechniqueId,
} from '@/constants/practice/content';
import { EClientSegment } from '@/types/client';
import GuidedExercise from '@/constants/practice/GuidedExercise';
import TechniqueCard from './TechniqueCard';
import useAuthStore from '@/store/AuthState';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import LoadingSpinner from '@/components/layout/LoadingSpinner';

export default function CalmRoomClient({
  defaultUserType = EClientSegment.STUDENT,
}: {
  defaultUserType?: EClientSegment;
}) {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const clientProfile = useAuthStore((s) => s.clientProfile);

  useEffect(() => {
    if (clientProfile) {
      setUserType(clientProfile.segment);
      setShowSelect(false);
      setLoading(false)
    } else {
      setShowSelect(true);
    }
  }, [clientProfile]);

  const [userType, setUserType] = useState<EClientSegment>(defaultUserType);
  const [showSelect, setShowSelect] = useState(false);
  const [activeTechniqueId, setActiveTechniqueId] =
    useState<TechniqueId | null>(null);

  const activeTechnique = activeTechniqueId
    ? (TECHNIQUES.find((t) => t.id === activeTechniqueId) ?? null)
    : null;

  const userContent = USER_TYPE_CONTENT[userType];

  if (activeTechnique) {
    return (
      <GuidedExercise
        technique={activeTechnique}
        userType={userType}
        onBack={() => setActiveTechniqueId(null)}
      />
    );
  }

  const clientName = clientProfile?.firstName ?? '';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0b3d] relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-sky-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-600/6 rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-5 py-10 md:py-16">
        {/* Header */}
        <div className="mb-10">
          {/* Platform badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs text-white/50 font-medium tracking-wide">
              Reset360 · The Calm Room
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
            {clientName ? (
              <>Hi <span className="text-pink-500">{clientName}</span>,</>
            ) : 'Hello,'} {userContent.greeting}
          </h1>
          <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
            {userContent.pageIntro}
          </p>

          {/* User type selector Keep this for testing/demo purposes */}
          <div
            className={cn(
              'mt-5 flex items-center gap-3',
              !showSelect && 'hidden'
            )}
          >
            <span className="text-xs text-white/30">Showing tools for</span>
            <Select
              value={userType}
              onValueChange={(v) => setUserType(v as EClientSegment)}
            >
              <SelectTrigger className="w-44 h-8 text-xs border-white/15 bg-white/5 text-white/80 hover:bg-white/10 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a24] border-white/10 text-white/80">
                <SelectItem
                  value={EClientSegment.STUDENT}
                  className="text-xs focus:bg-white/10 focus:text-white"
                >
                  Students
                </SelectItem>
                <SelectItem
                  value={EClientSegment.INDIVIDUAL}
                  className="text-xs focus:bg-white/10 focus:text-white"
                >
                  College / Young Adults
                </SelectItem>
                <SelectItem
                  value={EClientSegment.PARENT}
                  className="text-xs focus:bg-white/10 focus:text-white"
                >
                  Parents
                </SelectItem>
                <SelectItem
                  value={EClientSegment.TEACHER}
                  className="text-xs focus:bg-white/10 focus:text-white"
                >
                  Teachers
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Technique list */}
        <div className="space-y-3">
          {TECHNIQUES.map((technique, i) => (
            <TechniqueCard
              key={technique.id}
              technique={technique}
              userType={userType}
              index={i}
              onClick={() => setActiveTechniqueId(technique.id)}
            />
          ))}
        </div>

        <div className="flex pt-5 justify-center">
          <Button
            variant={'ghost'}
            onClick={() => router.replace('/client/dashboard')}
            className={cn(
              'group text-left transition-all duration-300 p-1 text-white '
            )}
          >
            <Home /> Back to Dashboard
          </Button>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-[11px] text-white/50 text-center leading-relaxed">
          Reset360 grounding tools are here to support your emotional self‑regulation. 
          They’re meant to be gentle guides, not a replacement for professional mental health care. 
          If you ever find yourself in crisis, please reach out right away to a trusted professional or emergency service. You don’t have to go through it alone.
        </p>
      </div>
    </div>
  );
}
