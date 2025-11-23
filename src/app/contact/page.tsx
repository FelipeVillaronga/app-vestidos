"use client";

import React, { useState } from "react";
import { FormEvent, ChangeEvent } from "react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Error: Please fill in all required fields.");
      return;
    }

    setStatus("Message sent successfully! We will get back to you soon.");
    alert(
      "✅ Message sent successfully!\n\nThank you for contacting us. We will get back to you soon."
    );

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-8rem)]">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Contact GlamRent Support
      </h1>

      <p className="mt-4 text-slate-600 dark:text-slate-400">
        We are here to help with your rentals, account, or any inquiries you
        might have. Please fill out the form below or reach out to our team
        directly.
      </p>

      {/* --- Direct Contact Info --- */}
      <div className="mt-6 p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900">
        <h2 className="text-xl font-semibold">Direct Information</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          For immediate support, you can reach us at:
        </p>
        <ul className="mt-3 text-slate-600 dark:text-slate-400 space-y-2">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@glamrent.com"
              className="text-fuchsia-600 hover:text-fuchsia-500 dark:text-fuchsia-400"
            >
              support@glamrent.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong> +1 (555) 123-4567
          </li>
        </ul>
      </div>

      {/* --- Contact Form --- */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none"
          />
        </div>

        {/* Subject Input */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Brief description of your inquiry"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none"
          />
        </div>

        {/* Message Input */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help you..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none resize-vertical"
          />
        </div>

        {/* Status Message */}
        {status && (
          <div
            className={`p-4 rounded-xl ${
              status.startsWith("Error")
                ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
            }`}
          >
            <p className="text-sm font-medium">{status}</p>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full rounded-xl bg-fuchsia-600 py-3 px-6 text-sm font-semibold text-white hover:bg-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 transition-colors"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
