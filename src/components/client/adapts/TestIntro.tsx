import React, { useCallback, useEffect } from 'react';
import AOS from 'aos';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  ArrowLeftIcon,
  Clock,
  FileText,
  Info,
  Lock,
  RotateCcw,
} from 'lucide-react';
import useQuizStore from '@/store/QuizState';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import moment from 'moment';

const TestIntro = () => {
  const router = useRouter();

  // 🧑‍💻 quiz state
  const setHasStarted = useQuizStore((s) => s.setHasStarted);
  const setStartedAt = useQuizStore((s) => s.setStartedAt);

  // 🚀 Initialize AOS animation library
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // ▶️ Start the assessment
  const handleStart = useCallback(() => {
    setHasStarted(true);
    setStartedAt(moment().format('YYYY-MM-DD HH:mm'))

  }, [setHasStarted]);

  // ↩️ Go back (dashboard or root)
  const handleBack = useCallback(() => {
    router.back()
  }, [router]);

  return (
    <div className="max-w-4xl w-full space-y-8 my-10">
      {/* 🌟 Hero */}
      <div className="space-y-6 text-center" data-aos="fade-down" data-aos-delay="50">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent/5 flex items-center justify-center">
            <Image src={'/logo/logo_250.png'} width={50} height={50} alt='Reset 360 Logo' />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            The ADAPTS Screening
          </h1>
          <p className="text-lg text-muted-foreground mx-auto">
            Anxiety and Depression Assessment for Parents, Teachers and Students
          </p>
        </div>
      </div>

      {/* What to Expect */}
      <Card className="p-8 mb-8 bg-card/20 backdrop-blur" data-aos="fade-up" data-aos-delay="200">
        <h2 className="text-2xl font-semibold text-foreground">
          What to expect
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                You will see statements about
                feelings and behaviors. 
              </p>
              <p className="text-sm text-muted-foreground">
                For each item choose the response that best
                fits how you have been feeling recently:{' '}
                <span className="font-semibold">
                  NEVER, RARELY, SOMETIMES, OFTEN,
                </span>{' '}
                or <span className="font-semibold">ALL THE TIME</span>.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Time: about 15–20 minutes
              </p>
              <p className="text-sm text-muted-foreground">
                Take your time to answer thoughtfully
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Questions: 50 items, one response per item
              </p>
              <p className="text-sm text-muted-foreground">
                Choose the option that best describes you
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Progress is saved automatically
              </p>
              <p className="text-sm text-muted-foreground">
                You can resume if you leave
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Your responses are confidential
              </p>
              <p className="text-sm text-muted-foreground">
                Used to guide supportive programs. Contact your school counselor
                for privacy concerns.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Important Notice */}
      <Card className="p-6 mb-8 bg-accent/10 border-accent/30 backdrop-blur" data-aos="fade-up" data-aos-delay="500">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Important
            </h3>
            <p className="text-foreground/90 leading-relaxed">
              This screening is not a clinical diagnosis. If you or someone is
              in immediate danger or needs urgent help, contact emergency
              services or your school&apos;s mental health staff right away.
            </p>
          </div>
        </div>
      </Card>

      {/* Consent Notice */}
      <Card className="p-6 mb-8 bg-emerald-200/10 border-emerald-200/30 backdrop-blur" data-aos="fade-up" data-aos-delay="200">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Consent
            </h3>
            <p className="text-foreground/90 leading-relaxed">
              By starting the assessment you agree that your responses will be saved
              and used to provide support and program planning.
            </p>
          </div>
        </div>
      </Card>

      <div className="text-center" data-aos="fade-down" data-aos-delay="900">
        {/* ▶️ Start button */}
        <Button
          onClick={handleStart}
          size="lg"
          className="bg-violet-500 hover:bg-primary transition-opacity text-lg px-12 py-6 h-auto"
        >
          Start Assessment
        </Button>

        {/* 🔙 Back button with left arrow icon */}
        <Button variant="link" onClick={handleBack} className="flex mx-auto">
          <ArrowLeftIcon />
          Back
        </Button>

        {/* ⏱ Time estimate */}
        <p className="text-sm text-muted-foreground">
          Takes approximately 15-20 minutes
        </p>
      </div>
    </div>
  );
};

export default TestIntro;
