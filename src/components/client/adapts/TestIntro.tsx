import React, { useCallback, useEffect, useState } from 'react';
import AOS from 'aos';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  ArrowLeftIcon,
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
import useQuizStore from '@/store/QuizState';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import moment from 'moment';
import { startAssessment } from '@/services/adaptsService';
import useAuthStore from '@/store/AuthState';
import useEntitlementState from '@/store/EntitlementState';
import { toast } from 'sonner';
import DisclosureSection from './DisclosureSection';

const TestIntro = () => {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const currentEntitlement = useEntitlementState((s) => s.currentEntitlement);

  const [error, setError] = useState('');

  // 🧑‍💻 quiz state
  const assessment = useQuizStore((s) => s.assessment);
  const hydrateFromAssessment = useQuizStore((s) => s.hydrateFromAssessment);
  const setHasStarted = useQuizStore((s) => s.setHasStarted);

  // 🚀 Initialize AOS animation library
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // ▶️ Start the assessment
  // Save assessment on API
  const handleStart = useCallback(async () => {
    if (!user?._id) return;

    if (!currentEntitlement) {
      setError(
        'This test requires a seat code. You can purchase one or redeem an existing code, and then you’ll be ready to continue.'
      );
      return;
    }

    const startAssessmentParams = {
      userId: user._id,
      type: currentEntitlement.type,
      assessmentId: currentEntitlement.assessmentId,
    };

    const assessment = await startAssessment(startAssessmentParams);

    if (assessment) {
      hydrateFromAssessment(assessment);
      setHasStarted(true);
    }
  }, [assessment, currentEntitlement]);

  // ↩️ Go back (dashboard or root)
  const handleBack = useCallback(() => {
    router.push(user ? '/client/dashboard' : '/');
  }, [router]);

  const handlePrivacyPage = useCallback(() => {
    router.push('/privacy-policy');
  }, [router]);

  return (
    <div className="max-w-4xl w-full space-y-8 py-24">
      {/* 🌟 Hero */}
      <div
        className="space-y-6 text-center"
        data-aos="fade-down"
        data-aos-delay="50"
      >
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
            The ADAPTS Screening
          </h1>
          <p className="text-lg text-muted-foreground mx-auto">
            Anxiety and Depression Assessment for Parents, Teachers and Students
          </p>
        </div>
      </div>

      {/* What to Expect */}
      <Card
        className="p-8 mb-8 bg-card/20 backdrop-blur"
        data-aos="fade-up"
        data-aos-delay="200"
      >
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
                You will see statements about feelings and behaviors.
              </p>
              <p className="text-sm text-muted-foreground">
                For each item choose the response that best fits how you have
                been feeling recently:{' '}
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

      {/* Disclosure Section */}
      <div className="mb-4" data-aos="fade-up" data-aos-delay="400">
        <DisclosureSection />
      </div>

      {/* Important Notice */}
      <Card
        className="p-6 mb-8 bg-accent/10 border-accent/30 backdrop-blur"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Important
            </h3>
            <p className="text-foreground/90 leading-relaxed text-sm">
              <b>This screening is not a clinical diagnosis</b>. If you or
              someone is in immediate danger or needs urgent help, contact
              emergency services or your school&apos;s mental health staff right
              away.
            </p>
          </div>
        </div>
      </Card>

      {/* Safety Notice */}
      <Card
        className="p-6 mb-8 bg-red-500/10 border-red-500/30 backdrop-blur"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="flex gap-4 text-foreground text-sm">
          <Phone className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2 text-red-700">
              Safety Notice
            </h3>
            <p className="mb-3">
              If you are experiencing severe emotional distress, suicidal
              thoughts, or thoughts of self-harm, please seek immediate help
              from:
            </p>
            <ul className="space-y-2 mb-3">
              <li>• A licensed mental health professional</li>
              <li>• Emergency services</li>
              <li>• Your primary care doctor</li>
            </ul>
            <p className="font-semibold mb-2">National Crisis Hotlines:</p>
            <ul className="space-y-1">
              <li>
                <strong>1553</strong> — National Center for Mental Health Crisis
                Hotline
              </li>
              <li>
                <strong>2919</strong> — Department of Health Hopeline PH
              </li>
              <li>
                <strong>911</strong> — For all emergencies
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Data Privacy Notice */}
      <Card
        className="p-6 mb-8 bg-violet-500/10 border-violet-500/30 backdrop-blur"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="flex gap-4 text-foreground">
          <FileCheck className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />

          <div>
            <h3 className="text-lg font-semibold mb-2 text-violet-500">
              Data Privacy Notice
            </h3>
            <p className="mb-3 text-sm">
              Your personal data is collected and processed in accordance with
              the Data Privacy Act of 2012 (RA 10173).
            </p>
            <p className="mb-3 text-sm">
              Information you voluntarily provide during this assessment,
              including responses related to emotional well-being, will be used
              only for self-reflection, support, coaching, and program planning.
              This assessment is not a diagnostic or clinical tool.
            </p>
            <p className="mb-3 text-sm">
              Your responses are treated as confidential and accessed only by
              authorized personnel. Individual results are not shared with third
              parties without consent, except when required by law or to protect
              safety. Data may be reported only in anonymized or aggregated
              form.
            </p>
            <p className="mb-3 text-sm">
              Appropriate security measures are in place to protect your
              information. You may exercise your rights as a data subject,
              including access, correction, or withdrawal of consent, in
              accordance with applicable law.
            </p>
            <Button
              variant={'link'}
              onClick={handlePrivacyPage}
              className="inline-flex items-center gap-2 text-primary hover:underline m-0 p-0"
            >
              <span className="text-sm text-violet-500 font-medium">
                Read the full Data Privacy Policy
              </span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Consent Notice */}
      <Card
        className="p-6 mb-8 bg-emerald-200/10 border-emerald-200/30 backdrop-blur"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="flex gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Consent
            </h3>
            <p className="text-foreground/90 leading-relaxed text-sm">
              By starting the assessment, you acknowledge the Full Disclosure &
              Limitations and the Data Privacy Notice, and agree that your
              responses may be saved and used to provide support and program
              planning in accordance with the ERC Privacy Policy.
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

        {error && <p className="text-xs py-5 text-red-500">{error}</p>}

        {/* 🔙 Back button with left arrow icon */}
        <Button variant="link" onClick={handleBack} className="flex mx-auto">
          <ArrowLeftIcon />
          Back
        </Button>

        <p className="text-sm text-muted-foreground">
          By continuing, you confirm that you have read and understood the Data
          Privacy Notice and Full Disclosure.
        </p>
      </div>
    </div>
  );
};

export default TestIntro;
