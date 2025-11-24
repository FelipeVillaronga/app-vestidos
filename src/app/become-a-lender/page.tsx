"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LenderPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    itemTypes: "",
    approximateQuantity: "",
    message: "",
  });

  const benefits = [
    {
      icon: "💰",
      title: "Earn Extra Income",
      description:
        "Turn your closet into cash. Earn up to 80% of the rental price for each booking.",
    },
    {
      icon: "🛡️",
      title: "Full Protection",
      description:
        "All items are insured against damage. We handle disputes and provide seller protection.",
    },
    {
      icon: "✨",
      title: "Free Cleaning",
      description:
        "We take care of professional cleaning after each rental. Your items come back pristine.",
    },
    {
      icon: "📦",
      title: "Easy Logistics",
      description:
        "We handle pickup, delivery, and returns. You just list your items and get paid.",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description:
        "Track your earnings, popular items, and rental history with our intuitive dashboard.",
    },
    {
      icon: "🤝",
      title: "Dedicated Support",
      description:
        "Our team is here to help you succeed. Get priority support and listing optimization tips.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lender-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          itemTypes: formData.itemTypes,
          approximateQuantity: Number(formData.approximateQuantity),
          message: formData.message || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to success page or show success message
        alert(
          "Application submitted successfully! We'll contact you soon to get started."
        );
        router.push("/?lender=success");
      } else {
        alert("Error: " + (data.error || "Something went wrong"));
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-fuchsia-50 via-rose-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMzAgMzBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-600 to-rose-500 mb-6 shadow-xl">
            <span className="text-4xl">👗</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">
              Become a Lender
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Share your designer wardrobe and earn money. Join our community of
            lenders and turn your closet into a profitable business.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Why Lend with GlamRent?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We make it easy and profitable to share your luxury items with
            fashion lovers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-xl hover:border-fuchsia-200 dark:hover:border-fuchsia-900 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-100 to-rose-100 dark:from-fuchsia-900/30 dark:to-rose-900/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Apply to Become a Lender
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Fill out the form below and we'll contact you within 24-48
                hours to get you started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2"
                >
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2"
                  >
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2"
                  >
                    Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Item Types */}
              <div>
                <label
                  htmlFor="itemTypes"
                  className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2"
                >
                  Types of Items <span className="text-rose-500">*</span>
                </label>
                <select
                  id="itemTypes"
                  name="itemTypes"
                  required
                  value={formData.itemTypes}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                >
                  <option value="">Select item type</option>
                  <option value="Evening Dresses">Evening Dresses</option>
                  <option value="Cocktail Dresses">Cocktail Dresses</option>
                  <option value="Designer Bags">Designer Bags</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Jackets & Coats">Jackets & Coats</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Mixed Collection">Mixed Collection</option>
                </select>
              </div>

              {/* Approximate Quantity */}
              <div>
                <label
                  htmlFor="approximateQuantity"
                  className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2"
                >
                  Approximate Number of Items{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  id="approximateQuantity"
                  name="approximateQuantity"
                  required
                  min="1"
                  value={formData.approximateQuantity}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                  className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2"
                >
                  Additional Information (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your collection, brands, condition, etc."
                  className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none resize-vertical transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-500 py-4 px-6 text-sm font-semibold text-white hover:from-fuchsia-500 hover:to-rose-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? "Submitting..." : "Submit Application →"}
              </button>

              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                By submitting this form, you agree to our Terms of Service and
                Privacy Policy. We'll review your application and contact you
                within 24-48 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
