import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      icon: "✨",
      question: "How do I book a dress?",
      answer:
        "To book a dress, simply browse the catalog, select the dress you like, choose your rental dates, and complete the form with your personal information. Then, confirm the booking and you will receive an email with the details.",
    },
    {
      icon: "⏰",
      question: "How long can I keep the item?",
      answer:
        "The standard rental period is 3 days, but you can check each item's page to see if longer rental options are available. If you need more time, please contact us.",
    },
    {
      icon: "🛡️",
      question: "What happens if the item is damaged or not returned on time?",
      answer:
        "If the item is damaged, a repair fee or the full cost of the item will be charged. If it is not returned on time, an additional charge will be applied for each day of delay.",
    },
    {
      icon: "📦",
      question: "How does delivery and return work?",
      answer:
        "We offer free delivery to your door 1-2 days before your event. After your rental period, simply pack the item in the provided return bag and schedule a pickup. Cleaning is included!",
    },
    {
      icon: "👗",
      question: "What if the dress doesn't fit?",
      answer:
        "We recommend checking our detailed size guide before booking. If you're unsure, contact our styling team for personalized assistance. We want you to look and feel amazing!",
    },
    {
      icon: "💳",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and digital payment methods. Payment is processed securely at the time of booking, and you'll receive an instant confirmation.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-fuchsia-50 via-rose-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMzAgMzBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-600 to-rose-500 mb-6">
            <span className="text-3xl">💎</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Everything you need to know about renting luxury designer dresses.
            Can't find what you're looking for? Contact our concierge team.
          </p>
        </div>
      </div>

      {/* FAQ Cards */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 hover:shadow-lg hover:border-fuchsia-200 dark:hover:border-fuchsia-900 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-100 to-rose-100 dark:from-fuchsia-900/30 dark:to-rose-900/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {faq.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    {faq.question}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
              {/* Decorative gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 sm:p-8">
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Still have questions?
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Our styling team is here to help you find the perfect dress.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-500 px-6 py-3 text-sm font-semibold text-white hover:from-fuchsia-500 hover:to-rose-400 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Contact Us</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
