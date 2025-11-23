export default function TermsAndConditionsPage() {
  const sections = [
    {
      icon: "🎯",
      title: "Purpose of Service",
      content: (
        <p>
          GlamRent offers rental services for dresses, shoes, and accessories
          for special occasions, under the terms set forth in this document.
        </p>
      ),
    },
    {
      icon: "✅",
      title: "Rental Requirements",
      content: (
        <ul className="space-y-2 list-disc pl-6">
          <li>The user must be over 18 years of age.</li>
          <li>
            The user must have a registered account on our website to make
            reservations.
          </li>
          <li>Payment must be completed before delivery of the product.</li>
        </ul>
      ),
    },
    {
      icon: "📅",
      title: "Reservations and Cancellations",
      content: (
        <ul className="space-y-2 list-disc pl-6">
          <li>Reservations must be made at least 3 days in advance.</li>
          <li>
            Reservation cancellations are allowed up to 24 hours before the
            rental date, with full or partial refund according to the current
            policy.
          </li>
          <li>
            Cancellations outside this timeframe may be subject to charges.
          </li>
        </ul>
      ),
    },
    {
      icon: "🚚",
      title: "Delivery and Return",
      content: (
        <ul className="space-y-2 list-disc pl-6">
          <li>
            Delivery will be made to the address indicated by the user within
            the service coverage area.
          </li>
          <li>
            The return must be made within the agreed timeframe and in the
            original conditions.
          </li>
          <li>
            In case of delay in return, an additional charge of $10 per day of
            delay will apply.
          </li>
        </ul>
      ),
    },
    {
      icon: "👔",
      title: "Responsible Use of Garments",
      content: (
        <ul className="space-y-2 list-disc pl-6">
          <li>
            The user agrees to use the garments responsibly and in accordance
            with their nature.
          </li>
          <li>
            Altering, sewing, cutting, or damaging the garments is not
            permitted.
          </li>
          <li>
            Any damage or loss will be evaluated and may result in an
            additional charge to the user.
          </li>
        </ul>
      ),
    },
    {
      icon: "✨",
      title: "Garment Cleaning",
      content: (
        <ul className="space-y-2 list-disc pl-6">
          <li>
            Garments must be returned in the conditions in which they were
            delivered.
          </li>
          <li>
            Professional cleaning is included in the service, but improper use
            that generates permanent stains may result in an additional
            charge.
          </li>
        </ul>
      ),
    },
    {
      icon: "💰",
      title: "Refund Policy",
      content: (
        <ul className="space-y-2 list-disc pl-6">
          <li>
            No returns or refunds are accepted for reasons other than
            manufacturing defects or failure to deliver by GlamRent.
          </li>
          <li>
            Any claim must be made within 24 hours after delivery of the
            garment.
          </li>
        </ul>
      ),
    },
    {
      icon: "⚖️",
      title: "Liability",
      content: (
        <ul className="space-y-2 list-disc pl-6">
          <li>
            GlamRent is not responsible for accidents, injuries, or
            inconveniences that may occur during the use of rented garments.
          </li>
          <li>
            The user assumes all responsibility for the use of the garments
            during the rental period.
          </li>
        </ul>
      ),
    },
    {
      icon: "🔒",
      title: "Data Protection",
      content: (
        <ul className="space-y-2 list-disc pl-6">
          <li>
            The user&apos;s personal data will be used exclusively for rental
            management and service improvement.
          </li>
          <li>
            We will not share personal information with third parties without
            consent, except for legal obligations.
          </li>
        </ul>
      ),
    },
    {
      icon: "📝",
      title: "Modifications to the Terms",
      content: (
        <p>
          GlamRent reserves the right to modify these terms at any time,
          notifying registered users via email or through a notice on the
          website.
        </p>
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
            <span className="text-3xl">📋</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Welcome to GlamRent. Please read these terms carefully before using
            our luxury garment rental service. By using our platform, you agree
            to comply with these terms.
          </p>
        </div>
      </div>

      {/* Terms Content */}
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

        {/* Last Updated Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-6 py-4">
            <span className="text-2xl">📅</span>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Last Updated
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
