import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

interface TermsOfServiceDialogProps {
  open: boolean;
  onOpenChange: (show: boolean) => void;
}

const TermsOfServiceDialog: React.FC<TermsOfServiceDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-extrabold text-foreground">
            Terms of Service
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Emotional Reset Center — Last Updated: February 2026
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] px-6 pb-6">
          <div className="prose prose-sm max-w-none space-y-5 text-foreground text-sm leading-relaxed">
            <section>
              <h3 className="text-base font-bold text-foreground">
                1. Introduction
              </h3>
              <p className="text-muted-foreground">
                Welcome to Emotional Reset Center (&quot;ERC&quot;,
                &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms
                of Service (&quot;Terms&quot;) govern access to and use of our
                mental health platform, including assessments, digital tools,
                dashboards, reporting features, and related services
                (collectively, the &quot;Services&quot;). By registering an
                organization account, purchasing licenses, or accessing the
                Services, you agree to these Terms.
              </p>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                2. Nature of Services
              </h3>
              <p className="text-muted-foreground">
                Emotional Reset Center provides:
              </p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Digital mental health tools</li>
                <li>Assessment instruments (including ADAPTS assessments)</li>
                <li>Educational and coaching-related resources</li>
                <li>Organizational dashboards with anonymized analytics</li>
              </ul>
              <p className="text-muted-foreground font-medium">
                ⚠️ The Services do not provide medical diagnosis, psychiatric
                treatment, or emergency intervention. The platform is not a
                substitute for professional medical advice.
              </p>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                3. Eligibility & Authority
              </h3>
              <p className="text-muted-foreground">
                By registering, you represent that:
              </p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>You are at least 18 years old.</li>
                <li>You have authority to bind your organization.</li>
                <li>
                  You have authority to enter into agreements on behalf of your
                  organization.
                </li>
              </ul>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                4. Licensing
              </h3>
              <p className="text-muted-foreground">
                Upon payment, ERC grants your organization a limited,
                non-exclusive, non-transferable, non-sublicensable license to
                access the Services for the purchased number of seats and
                subscription period.
              </p>
              <p className="text-muted-foreground">Licenses may not be:</p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Resold</li>
                <li>Shared outside authorized users</li>
                <li>Used for unlawful purposes</li>
              </ul>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                5. Fees & Payment
              </h3>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>
                  All pricing is in Philippine Peso (₱), unless otherwise
                  stated.
                </li>
                <li>Payments are processed securely via PayMongo.</li>
                <li>Fees are non-refundable unless required by law.</li>
                <li>Access may be suspended for non-payment.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                6. Account Responsibilities
              </h3>
              <p className="text-muted-foreground">
                Organizations are responsible for managing user access, ensuring
                user compliance, and safeguarding login credentials. ERC is not
                liable for unauthorized access resulting from failure to protect
                credentials.
              </p>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                7. Data Privacy & Confidentiality
              </h3>
              <p className="text-muted-foreground">
                ERC processes personal data in accordance with Republic Act No.
                10173 (Data Privacy Act of 2012) and regulations of the National
                Privacy Commission (NPC).
              </p>
              <p className="text-muted-foreground">We process:</p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Names</li>
                <li>Email addresses</li>
                <li>Organization information</li>
                <li>Assessment responses and results</li>
                <li>Aggregated analytics</li>
              </ul>
              <p className="text-muted-foreground">
                ERC may generate aggregated, de-identified, anonymized analytics
                based on demographic or cohort trends. These reports do not
                include individual names, cannot reasonably identify a specific
                data subject, and are used to provide organizational insights
                and improve the platform.
              </p>
              <p className="text-muted-foreground">
                No individual mental health results are disclosed at the
                identifiable level unless authorized by the organization and the
                individual user.
              </p>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                8. Sensitive Personal Information
              </h3>
              <p className="text-muted-foreground">
                Mental health assessment results may constitute Sensitive
                Personal Information under RA 10173. ERC implements heightened
                safeguards, including:
              </p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Restricted internal access</li>
                <li>Role-based permissions</li>
                <li>Encrypted transmission</li>
                <li>Secure hosting</li>
              </ul>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                9. Acceptable Use
              </h3>
              <p className="text-muted-foreground">Users may not:</p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                <li>Use the platform for unlawful discrimination</li>
                <li>Attempt re-identification of anonymized reports</li>
                <li>Misuse assessment results</li>
                <li>Harass or stigmatize users based on mental health data</li>
              </ul>
              <p className="text-muted-foreground">
                Violations may result in suspension.
              </p>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                10. Intellectual Property
              </h3>
              <p className="text-muted-foreground">
                All platform content, assessments, scoring methodologies,
                software, and trademarks remain the property of ERC.
                Unauthorized reproduction or distribution is prohibited.
              </p>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                11. Limitation of Liability
              </h3>
              <p className="text-muted-foreground">
                To the maximum extent permitted by Philippine law, ERC is not
                liable for indirect, incidental, or consequential damages. Total
                liability shall not exceed fees paid in the preceding 12 months.
                Nothing excludes liability where prohibited by law.
              </p>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                12. Termination
              </h3>
              <p className="text-muted-foreground">
                ERC may suspend or terminate accounts for non-payment, breach of
                these Terms, or misuse of sensitive data. Upon termination,
                access ceases immediately.
              </p>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                13. Governing Law
              </h3>
              <p className="text-muted-foreground">
                These Terms are governed by the laws of the Republic of the
                Philippines. Disputes shall be resolved in the proper courts of
                the Philippines.
              </p>
            </section>
            <section>
              <h3 className="text-base font-bold text-foreground">
                14. Contact Information
              </h3>
              <p className="text-muted-foreground">
                Emotional Reset Center
                <br />
                [Legal Entity Name]
                <br />
                [Business Address]
                <br />
                [Email Address]
                <br />
                [Phone Number]
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceDialog;
