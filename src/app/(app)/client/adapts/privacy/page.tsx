'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PrivacyPolicy = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Button
          variant={'link'}
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Assessment</span>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ERC Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Effective Date: January 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 space-y-8 text-foreground/90 leading-relaxed">
          <p>
            Emotional Reset Center (&quot;ERC&quot;, &quot;we&quot;,
            &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
            privacy and ensuring the security of your personal data. This
            Privacy Policy explains how we collect, use, store, disclose, and
            protect personal information in compliance with the Data Privacy Act
            of 2012 (Republic Act No. 10173) and its Implementing Rules and
            Regulations, as enforced by the National Privacy Commission (NPC) of
            the Philippines.
          </p>
          <p>
            By accessing or using ERC services, platforms, assessments, or
            programs, you acknowledge that you have read and understood this
            Privacy Policy.
          </p>

          {/* Privacy Summary */}
          <section className="bg-primary/10 border border-info/30 rounded-lg p-5">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Privacy Summary (Short Form)
            </h2>
            <p className="mb-3">
              ERC collects and processes personal data in accordance with the
              Data Privacy Act of 2012 (RA 10173).
            </p>
            <p className="mb-3">
              We collect only the information you voluntarily provide, including
              assessment responses and basic identifying details when required,
              for the purposes of self-reflection, screening, coaching support,
              and program planning. ADAPTS and other ERC assessments are not
              diagnostic or clinical tools.
            </p>
            <p className="mb-3">
              Your responses are treated as confidential and accessed only by
              authorized personnel. We do not sell personal data and do not
              share individual responses with third parties without consent,
              except when required by law or to protect safety. Data may be
              reported only in anonymized or aggregated form.
            </p>
            <p>
              ERC applies reasonable security measures to protect your data and
              retains it only for as long as necessary. You have the right to
              access, correct, or withdraw consent regarding your personal data,
              subject to applicable laws.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              👉 Read the full ERC Privacy Policy below.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              1. Scope of This Policy
            </h2>
            <p className="mb-3">
              This Privacy Policy applies to all personal data collected by ERC
              through:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                Digital platforms and web applications (including Reset360)
              </li>
              <li>Assessments and screening tools (including ADAPTS)</li>
              <li>Coaching, guidance, and wellness programs</li>
              <li>Communications, registrations, and inquiries</li>
            </ul>
            <p className="mt-3">
              This policy covers both online and offline data processing
              activities.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              2. Types of Personal Data We Collect
            </h2>
            <p className="mb-3">
              ERC may collect the following categories of personal data:
            </p>

            <h3 className="font-semibold text-foreground mt-4 mb-2">
              2.1 Personal Information
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Name, email address, phone number</li>
              <li>Organization, school, or program affiliation</li>
              <li>Account or login credentials (where applicable)</li>
            </ul>

            <h3 className="font-semibold text-foreground mt-4 mb-2">
              2.2 Sensitive Personal Information
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Responses to mental health screening and reflection tools</li>
              <li>Emotional, behavioral, or psychological self-reports</li>
              <li>Program participation records related to well-being</li>
            </ul>
            <p className="mt-3">
              Sensitive personal information is processed with heightened
              safeguards, consistent with the Data Privacy Act.
            </p>

            <h3 className="font-semibold text-foreground mt-4 mb-2">
              2.3 Technical and Usage Data
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Device information, browser type, and IP address</li>
              <li>
                Activity logs for system security and performance monitoring
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              3. Purpose of Data Collection and Processing
            </h2>
            <p className="mb-3">
              ERC collects and processes personal data solely for legitimate and
              specific purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                Facilitating self-reflection, screening, and wellness
                assessments
              </li>
              <li>Supporting coaching, guidance, and program delivery</li>
              <li>Improving platform functionality and user experience</li>
              <li>Program monitoring, evaluation, and planning</li>
              <li>Compliance with legal and regulatory obligations</li>
            </ul>
            <p className="mt-3 font-medium">
              ERC assessments, including ADAPTS, are not diagnostic or clinical
              tools and are not used for medical diagnosis, treatment planning,
              insurance determinations, or employment decisions.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              4. Legal Basis for Processing
            </h2>
            <p className="mb-3">
              ERC processes personal data based on one or more of the following
              legal grounds:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Your freely given, informed, and explicit consent</li>
              <li>Fulfillment of contractual or program-related obligations</li>
              <li>Compliance with legal requirements</li>
              <li>
                Legitimate interests of ERC, provided these do not override your
                fundamental rights and freedoms
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              5. Data Sharing and Disclosure
            </h2>
            <p className="mb-3 font-medium">
              ERC does not sell or trade personal data.
            </p>
            <p className="mb-3">
              Personal data may be shared only under the following
              circumstances:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                With authorized ERC personnel and program partners who are bound
                by confidentiality obligations
              </li>
              <li>
                When required by law, court order, or government regulation
              </li>
              <li>To protect the safety, rights, or welfare of individuals</li>
              <li>
                In anonymized or aggregated form for reporting, research, or
                program improvement purposes
              </li>
            </ul>
            <p className="mt-3 font-medium">
              Individual-level mental health data is never shared without
              appropriate safeguards and consent.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              6. Data Storage and Security Measures
            </h2>
            <p className="mb-3">
              ERC implements reasonable and appropriate organizational,
              physical, and technical safeguards to protect personal data,
              including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Role-based access controls</li>
              <li>Secure servers and encrypted storage where applicable</li>
              <li>Regular system monitoring and security updates</li>
              <li>
                Internal data handling policies and staff confidentiality
                agreements
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Despite best efforts, no data transmission or storage system can
              be guaranteed to be completely secure.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              7. Data Retention
            </h2>
            <p className="mb-3">
              ERC retains personal data only for as long as necessary to fulfill
              the stated purposes or to comply with legal, regulatory, or
              institutional requirements.
            </p>
            <p>
              When data is no longer required, it is securely deleted,
              anonymized, or archived in accordance with applicable standards.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              8. Data Subject Rights
            </h2>
            <p className="mb-3">
              In accordance with the Data Privacy Act, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Be informed about the processing of your personal data</li>
              <li>Access your personal data</li>
              <li>Object to data processing in certain circumstances</li>
              <li>Request correction of inaccurate or outdated data</li>
              <li>
                Withdraw consent, subject to legal and contractual limitations
              </li>
              <li>
                Request data deletion, blocking, or anonymization when
                appropriate
              </li>
              <li>Lodge a complaint with the National Privacy Commission</li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Requests may be subject to identity verification and reasonable
              processing time.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              9. Children and Minors
            </h2>
            <p>
              When ERC services involve minors, data collection and processing
              are conducted in accordance with applicable laws and institutional
              policies. Parental or guardian consent is obtained where required.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              10. Changes to This Privacy Policy
            </h2>
            <p className="mb-3">
              ERC may update this Privacy Policy from time to time to reflect
              legal, regulatory, or operational changes. Updates will be posted
              on ERC platforms with the revised effective date.
            </p>
            <p>
              Continued use of ERC services after updates constitutes
              acknowledgment of the revised policy.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              11. Contact Information
            </h2>
            <p className="mb-3">
              For questions, concerns, or requests related to data privacy, you
              may contact:
            </p>
            <div className="bg-accent/50 rounded-lg p-4">
              <p className="font-semibold">ERC Data Protection Officer</p>
              <p>Email: reggie@emotionalresetcenter.com</p>
            </div>
            <p className="mt-3">
              You may also contact the National Privacy Commission of the
              Philippines for further information or to lodge a complaint.
            </p>
          </section>

          {/* Footer */}
          <div className="border-t border-border pt-6 mt-8">
            <p className="text-center text-muted-foreground italic">
              ERC is committed to ethical practice, transparency, and respect
              for your privacy. This policy reflects our ongoing effort to make
              mental health reflection and support accessible while safeguarding
              individual rights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
