import React, { useEffect } from 'react';
import AOS from 'aos';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  ArrowRight,
  Clock,
  FileCheck,
  FileText,
  Info,
  Lock,
  Phone,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';

const DemoTestIntro = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="max-w-4xl w-full space-y-8 py-24">
      {/* 🌟 Hero */}
      <div className="space-y-6 text-center">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/50 to-accent/20 flex items-center justify-center">
            <Image
              src={'/logo/logo_250.png'}
              width={50}
              height={50}
              alt="Reset 360 Logo"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            The <span className="text-primary">ADAPTS</span> Screening
          </h1>
          <p className="text-lg text-muted-foreground mx-auto">
            Anxiety and Depression Assessment for Parents, Teachers and Students
          </p>
        </div>
      </div>

      <Card className="p-8 mb-8 bg-card/20 backdrop-blur">
        <h2 className="text-2xl font-semibold text-foreground">
          What to expect
        </h2>
        <div className="space-y-4 mt-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                You will answer 10 short statements about feelings and
                experiences.
              </p>
              <p className="text-sm text-muted-foreground">
                Each item is written in a simple, general way so it can be used
                for different audiences.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Time: about 2–3 minutes
              </p>
              <p className="text-sm text-muted-foreground">
                This is a quick demo version designed for introduction and
                walkthrough.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Choose one response for each statement
              </p>
              <p className="text-sm text-muted-foreground">
                Select the option that best reflects how you have been feeling
                recently:{' '}
                <span className="font-semibold">
                  NEVER, RARELY, SOMETIMES, OFTEN
                </span>{' '}
                or <span className="font-semibold">ALL THE TIME</span>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                This is a demo experience
              </p>
              <p className="text-sm text-muted-foreground">
                The purpose is to give you a preview of how ADAPTS works and
                what the assessment experience feels like.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                This demo is for introduction only
              </p>
              <p className="text-sm text-muted-foreground">
                It is not a diagnosis, but a simple preview of the platform and
                its assessment flow.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="text-center">
        {/* ▶️ Start button */}
        <Button
          onClick={onStart}
          size="lg"
          className="bg-violet-500 hover:bg-primary transition-opacity text-lg px-12 py-6 h-auto"
        >
          Start Assessment
        </Button>
      </div>
    </div>
  );
};

export default DemoTestIntro;
