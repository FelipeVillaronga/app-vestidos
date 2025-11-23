import React from "react";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-8rem)]">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Privacy Policy – GlamRent
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
        Effective Date: November 22, 2025
      </p>

      <p className="mt-6 text-slate-600 dark:text-slate-400">
        At GlamRent, we respect your privacy and are committed to protecting the
        personal information you share with us. This policy explains what data
        we collect, how we use it, and your rights concerning your information.
      </p>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            We collect information necessary to provide our rental services.
          </p>
          <h3 className="text-lg font-medium mt-4">
            1.1 Personal Data You Provide
          </h3>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>
              <strong>Identification Data:</strong> Name, email address, phone
              number, and account password (stored encrypted).
            </li>
            <li>
              <strong>Transaction Data:</strong> Rental history, delivery
              address, and billing information (excluding full payment card
              details, which are handled by our secure payment processor).
            </li>
          </ul>

          <h3 className="text-lg font-medium mt-4">
            1.2 Data Collected Automatically
          </h3>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>
              <strong>Usage Data:</strong> Information about how you access and
              use the service, such as IP address, browser type, pages viewed,
              time spent on pages, and referring URLs.
            </li>
            <li>
              <strong>Cookies and Tracking:</strong> We use cookies and similar
              tracking technologies to track activity on our service and hold
              certain information, crucial for functionality (e.g., shopping
              cart) and analytics.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            2. How We Use Your Information
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            We use the collected data for various purposes:
          </p>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>To process and manage your rentals and transactions.</li>
            <li>To provide, maintain, and improve our Service.</li>
            <li>
              To communicate with you regarding your account or reservations
              (essential communications).
            </li>
            <li>
              To detect, prevent, and address technical issues or security
              breaches.
            </li>
            <li>
              To send you promotional communications, if you have explicitly
              opted in (Newsletter subscriptions).
            </li>
            <li>
              For internal analytics and research to enhance our product
              offerings.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Sharing Your Information</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            We do not sell or rent your personal data to third parties. We may
            share information only in the following limited circumstances:
          </p>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>
              <strong>Service Providers:</strong> With trusted third-party
              vendors who perform services on our behalf, such as payment
              processing (e.g., Stripe, PayPal), delivery carriers, and email
              services. These providers are bound by strict confidentiality
              agreements.
            </li>
            <li>
              <strong>Legal Requirements:</strong> To comply with legal
              obligations, protect the rights and property of GlamRent, or
              ensure the safety of our users and the public.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger,
              sale of company assets, financing, or acquisition of all or a
              portion of our business by another company.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Data Security</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            The security of your data is paramount. We implement commercially
            acceptable measures designed to protect your Personal Data from
            unauthorized access, disclosure, alteration, or destruction. We use
            **SSL/TLS encryption** for data transmission and **hashing** for
            passwords.
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            However, remember that no method of transmission over the Internet
            or method of electronic storage is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            5. Your Data Protection Rights
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Depending on your location, you have certain rights regarding your
            data:
          </p>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>
              <strong>The Right to Access:</strong> You have the right to
              request copies of your personal data.
            </li>
            <li>
              <strong>The Right to Rectification:</strong> You have the right to
              request that we correct any information you believe is inaccurate
              or complete information you believe is incomplete.
            </li>
            <li>
              <strong>The Right to Erasure ("Right to be Forgotten"):</strong>{" "}
              You have the right to request that we erase your personal data
              under certain conditions.
            </li>
            <li>
              <strong>The Right to Object:</strong> You have the right to object
              to our processing of your personal data, particularly for direct
              marketing purposes.
            </li>
          </ul>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            To exercise these rights, please contact us using the details
            provided in Section 7.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            6. Changes to This Privacy Policy
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Effective Date" at the top. You are advised to
            review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Contact Us</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-6">
            <li>
              By Email:{" "}
              <a
                href="mailto:privacy@glamrent.com"
                className="text-indigo-400 hover:text-indigo-300"
              >
                privacy@glamrent.com
              </a>
            </li>
            <li>
              By visiting our Contact Page:{" "}
              <a
                href="/contact"
                className="text-indigo-400 hover:text-indigo-300"
              >
                /contact
              </a>{" "}
              (Once implemented!)
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
