export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-8rem)]">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Frequently Asked Questions
      </h1>
      <div className="mt-6 space-y-6">
        <div>
          <h2 className="font-semibold">How do I book a dress?</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            To book a dress, simply browse the catalog, select the dress you
            like, choose your rental dates, and complete the form with your
            personal information. Then, confirm the booking and you will receive
            an email with the details.
          </p>
        </div>
        <div>
          <h2 className="font-semibold">How long can I keep the item?</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            The standard rental period is 3 days, but you can check each
            item&apos;s page to see if longer rental options are available. If
            you need more time, please contact us.
          </p>
        </div>
        <div>
          <h2 className="font-semibold">
            What happens if the item is damaged or not returned on time?
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            If the item is damaged, a repair fee or the full cost of the item
            will be charged. If it is not returned on time, an additional charge
            will be applied for each day of delay.
          </p>
        </div>
      </div>
    </div>
  );
}
