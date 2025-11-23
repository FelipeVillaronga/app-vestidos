"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RentalMessages() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "1") {
      setShowSuccess(true);
      setShowUnavailable(false);
      setShowError(false);
      const timer = setTimeout(() => setShowSuccess(false), 8000);
      return () => clearTimeout(timer);
    } else if (searchParams.get("unavailable") === "1") {
      setShowUnavailable(true);
      setShowSuccess(false);
      setShowError(false);
      const timer = setTimeout(() => setShowUnavailable(false), 8000);
      return () => clearTimeout(timer);
    } else if (searchParams.get("error") === "1") {
      setShowError(true);
      setShowSuccess(false);
      setShowUnavailable(false);
      const timer = setTimeout(() => setShowError(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!showSuccess && !showUnavailable && !showError) return null;

  return (
    <div className="mb-6">
      {showSuccess && (
        <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-6 py-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold text-green-800 dark:text-green-200">
                Rental request submitted successfully!
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                We'll contact you shortly to confirm your reservation.
              </p>
            </div>
          </div>
        </div>
      )}

      {showUnavailable && (
        <div className="rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 px-6 py-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-semibold text-orange-800 dark:text-orange-200">
                Selected dates are not available
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                The item is already booked for the dates you selected. Please check the calendar below to see available dates and try again.
              </p>
            </div>
          </div>
        </div>
      )}

      {showError && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-6 py-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">❌</span>
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">
                Error processing your request
              </p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                Something went wrong. Please try again or contact us for assistance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
