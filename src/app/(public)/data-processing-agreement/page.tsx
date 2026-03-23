import React from 'react'

export const metadata = {
  title: "Data Processing Agreement",
  description: "Reset 360’s Data Processing Agreement outlines our commitment to privacy, security, and compliance with data protection regulations.",
};

const DataProcessingAgreement = () => {
  return (
    <main className="container max-w-3xl mx-auto px-6 py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">Data Processing Agreement</h1>
        <p className="text-xs text-muted-foreground mt-2">
          Emotional Reset Center — Last Updated: February 2026
        </p>
      </div>

      <div className="prose prose-sm max-w-none space-y-8 text-foreground text-sm leading-relaxed">
        <p className="text-muted-foreground">
          This DPA forms part of the Terms of Service between Emotional Reset Center
          (&quot;Processor&quot;) and the subscribing organization (&quot;Personal Information
          Controller&quot;).
        </p>

        <section>
          <h3 className="text-base font-bold text-foreground">1. Roles of the Parties</h3>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li>The Organization is the Personal Information Controller (PIC).</li>
            <li>ERC acts as a Personal Information Processor (PIP) under RA 10173.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-bold text-foreground">2. Categories of Data Processed</h3>
          <p className="text-muted-foreground">ERC may process:</p>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li>Personal information (name, email)</li>
            <li>Organizational information</li>
            <li>Assessment responses</li>
            <li>Assessment results</li>
            <li>Usage analytics</li>
          </ul>
          <p className="text-muted-foreground mt-2">
            Some data may qualify as Sensitive Personal Information.
          </p>
        </section>

        <section>
          <h3 className="text-base font-bold text-foreground">3. Purpose of Processing</h3>
          <p className="text-muted-foreground">Data is processed solely for:</p>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li>Providing access to mental health tools</li>
            <li>Delivering assessment scoring</li>
            <li>Generating anonymized analytics</li>
            <li>Providing organizational insights</li>
            <li>Customer support</li>
          </ul>
          <p className="text-muted-foreground mt-2">ERC does not sell personal data.</p>
        </section>

        <section>
          <h3 className="text-base font-bold text-foreground">4. Aggregation & De-Identification</h3>
          <p className="text-muted-foreground">
            ERC may generate anonymized or aggregated data for cohort-based reporting, demographic
            insights, and platform improvements. Such aggregated data cannot identify individual
            users, does not include names or direct identifiers, and may be retained for statistical
            purposes.
          </p>
        </section>

        <section>
          <h3 className="text-base font-bold text-foreground">5. Security Measures</h3>
          <p className="text-muted-foreground">ERC implements:</p>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li>HTTPS encryption</li>
            <li>Secure hosting infrastructure</li>
            <li>Access controls</li>
            <li>Confidentiality agreements with staff</li>
            <li>Logging and monitoring mechanisms</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-bold text-foreground">6. Data Breach Notification</h3>
          <p className="text-muted-foreground">
            In case of a personal data breach, ERC shall notify the Organization without undue
            delay, cooperate in compliance with NPC breach reporting rules, and assist in mitigation
            efforts.
          </p>
        </section>

        <section>
          <h3 className="text-base font-bold text-foreground">7. Data Subject Rights</h3>
          <p className="text-muted-foreground">
            The Organization remains responsible for responding to access, correction, erasure, and
            data portability requests. ERC shall reasonably assist where required.
          </p>
        </section>

        <section>
          <h3 className="text-base font-bold text-foreground">8. Retention & Deletion</h3>
          <p className="text-muted-foreground">
            Personal data is retained for the duration of the subscription and as required by law.
            Upon termination, data will be returned or securely deleted within a reasonable period,
            unless legally required to retain.
          </p>
        </section>

        <section>
          <h3 className="text-base font-bold text-foreground">9. Sub-Processors</h3>
          <p className="text-muted-foreground">
            ERC may engage third-party providers (e.g., hosting, payment processors). Such providers
            are contractually bound to data protection obligations consistent with RA 10173.
          </p>
        </section>

        <section>
          <h3 className="text-base font-bold text-foreground">10. Cross-Border Transfers</h3>
          <p className="text-muted-foreground">
            If data is transferred outside the Philippines, ERC ensures adequate safeguards in
            accordance with NPC guidelines.
          </p>
        </section>

        <section>
          <h3 className="text-base font-bold text-foreground">11. Governing Law</h3>
          <p className="text-muted-foreground">
            This DPA is governed by the laws of the Republic of the Philippines.
          </p>
        </section>
      </div>
    </main>
  )
}

export default DataProcessingAgreement