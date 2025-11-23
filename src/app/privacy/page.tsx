import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  const sections = [
    {
      icon: "📊",
      title: "Information We Collect",
      content: (
        <>
          <p className="mb-4">
            We collect information necessary to provide our rental services.
          </p>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Personal Data You Provide
          </h3>
          <ul className="space-y-2 list-disc pl-6 mb-4">
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
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Data Collected Automatically
          </h3>
          <ul className="space-y-2 list-disc pl-6">
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
        </>
      ),
    },
    {
      icon: "🎯",
      title: "How We Use Your Information",
      content: (
        <>
          <p className="mb-3">
            We use the collected data for various purposes:
          </p>
          <ul className="space-y-2 list-disc pl-6">
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
        </>
      ),
    },
    {
      icon: "🤝",
      title: "Sharing Your Information",
      content: (
        <>
          <p className="mb-3">
            We do not sell or rent your personal data to third parties. We may
            share information only in the following limited circumstances:
          </p>
          <ul className="space-y-2 list-disc pl-6">
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
        </>
      ),
    },
    {
      icon: "🔐",
      title: "Data Security",
      content: (
        <>
          <p className="mb-3">
            The security of your data is paramount. We implement commercially
            acceptable measures designed to protect your Personal Data from
            unauthorized access, disclosure, alteration, or destruction. We use
            <strong> SSL/TLS encryption</strong> for data transmission and{" "}
            <strong>hashing</strong> for passwords.
          </p>
          <p>
            However, remember that no method of transmission over the Internet
            or method of electronic storage is 100% secure.
          </p>
        </>
      ),
    },
    {
      icon: "⚖️",
      title: "Your Data Protection Rights",
      content: (
        <>
          <p className="mb-3">
            Depending on your location, you have certain rights regarding your
            data:
          </p>
          <ul className="space-y-2 list-disc pl-6 mb-3">
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
          <p>
            To exercise these rights, please contact us using the details
            provided in the Contact section.
          </p>
        </>
      ),
    },
    {
      icon: "📝",
      title: "Changes to This Privacy Policy",
      content: (
        <p>
          We may update our Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page
          and updating the "Effective Date" at the top. You are advised to
          review this Privacy Policy periodically for any changes.
        </p>
      ),
    },
    {
      icon: "📧",
      title: "Contact Us",
      content: (
        <>
          <p className="mb-3">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <ul className="space-y-2 list-disc pl-6">
            <li>
              By Email:{" "}
              <a
                href="mailto:privacy@glamrent.com"
                className="text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-500 font-medium"
              >
                privacy@glamrent.com
              </a>
            </li>
            <li>
              By visiting our{" "}
              <Link
                href="/contact"
                className="text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-500 font-medium"
              >
                Contact Page
              </Link>
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-fuchsia-50 via-rose-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMzAgMzBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-600 to-rose-500 mb-6">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            At GlamRent, we respect your privacy and are committed to protecting
            the personal information you share with us.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>📅</span>
            <span>Effective Date: November 22, 2025</span>
          </div>
        </div>
      </div>

      {/* Privacy Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 hover:shadow-lg hover:border-fuchsia-200 dark:hover:border-fuchsia-900 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-100 to-rose-100 dark:from-fuchsia-900/30 dark:to-rose-900/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    {index + 1}. {section.title}
                  </h2>
                  <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
              {/* Decorative gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
