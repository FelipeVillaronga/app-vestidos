"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RentalStatusMessage() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (searchParams.get("rental") === "success") {
      setShowSuccess(true);
      setShowError(false);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    } else if (searchParams.get("rental") === "error") {
      const message = searchParams.get("message");
      if (message === "not_found") {
        setErrorMessage("Rental not found or already canceled.");
      } else {
        setErrorMessage("An error occurred while canceling the rental.");
      }
      setShowError(true);
      setShowSuccess(false);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!showSuccess && !showError) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      {showSuccess && (
        <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-800 dark:text-green-200 flex items-center gap-2">
          <span className="text-lg">✓</span>
          <span>Rental canceled successfully!</span>
        </div>
      )}
      {showError && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-800 dark:text-red-200 flex items-center gap-2">
          <span className="text-lg">✗</span>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
