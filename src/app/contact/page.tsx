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

    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatus("");
    }, 3000);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      detail: "support@glamrent.com",
      description: "We'll respond within 24 hours",
      link: "mailto:support@glamrent.com",
    },
    {
      icon: "📞",
      title: "Phone",
      detail: "+1 (555) 123-4567",
      description: "Mon-Fri, 9am-6pm EST",
      link: "tel:+15551234567",
    },
    {
      icon: "💬",
      title: "Live Chat",
      detail: "Available soon",
      description: "Average response: 2 minutes",
      link: "#",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-fuchsia-50 via-rose-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMzAgMzBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-600 to-rose-500 mb-6">
            <span className="text-3xl">✉️</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Our concierge team is here to help you find the perfect dress and
            answer any questions about your rental experience.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Contact Methods
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Choose the best way to reach our team. We're here to make your
                experience exceptional.
              </p>
            </div>

            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="group block rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-lg hover:border-fuchsia-200 dark:hover:border-fuchsia-900 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-100 to-rose-100 dark:from-fuchsia-900/30 dark:to-rose-900/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {method.title}
                    </h3>
                    <p className="text-sm text-fuchsia-600 dark:text-fuchsia-400 font-medium mt-1">
                      {method.detail}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {method.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}

            {/* Office Hours */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🕐</span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Office Hours
                  </h3>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <p>Monday - Friday: 9am - 6pm EST</p>
                    <p>Saturday: 10am - 4pm EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Send us a Message
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2"
                    >
                      Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2"
                    >
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2"
                  >
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none resize-vertical transition-all"
                  />
                </div>

                {/* Status Message */}
                {status && (
                  <div
                    className={`p-4 rounded-xl border-2 ${
                      status.startsWith("Error")
                        ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                        : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                    }`}
                  >
                    <p className="text-sm font-semibold flex items-center gap-2">
                      {status.startsWith("Error") ? "✗" : "✓"} {status}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-500 py-4 px-6 text-sm font-semibold text-white hover:from-fuchsia-500 hover:to-rose-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
