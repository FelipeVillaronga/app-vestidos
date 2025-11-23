"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewsletterForm() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (searchParams.get("newsletter") === "success") {
      setShowSuccess(true);
      setShowError(false);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    } else if (searchParams.get("newsletter") === "error") {
      const message = searchParams.get("message");
      if (message === "already_subscribed") {
        setErrorMessage("This email is already subscribed to our newsletter.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setShowError(true);
      setShowSuccess(false);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
      <div className="lg:col-span-2">
        <h2 className="text-2xl sm:text-3xl font-bold">Join our newsletter</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Get style tips, drops, and exclusive offers.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {showSuccess && (
          <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-800 dark:text-green-200">
            ✓ Subscription successful! Check your inbox.
          </div>
        )}
        {showError && (
          <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-800 dark:text-red-200">
            ✗ {errorMessage}
          </div>
        )}
        <form action="/api/newsletter" method="POST" className="flex w-full gap-3">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
          <button
            type="submit"
            className="inline-flex items-center rounded-xl bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white hover:bg-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
