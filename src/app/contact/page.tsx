"use client";

import React, { useState } from 'react';
import { FormEvent, ChangeEvent } from 'react';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState < ContactFormData > ({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState < string > ('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('Submitting...');

        if (!formData.name || !formData.email || !formData.message) {
            setStatus('Error: Please fill in all required fields.');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('Message sent successfully! We will get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                const errorData = await response.json();
                setStatus(`Error sending message: ${errorData.message || 'Server error'}`);
            }
        } catch (error) {
            setStatus('Error: Could not connect to the server.');
            console.error('Contact Form Submission Error:', error);
        }
    };

    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-2xl sm:text-3xl font-bold">Contact GlamRent Support</h1>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
                We're here to help with your rentals, account, or any inquiries you might have. Please fill out the form below or reach out to our team directly.
            </p>

            {/* --- Direct Contact Info --- */}
            <div className="mt-6 p-4 border rounded-lg bg-gray-900 dark:bg-gray-800">
                <h2 className="text-xl font-semibold">Direct Information</h2>
                <p className="mt-2 text-slate-400">
                    For immediate support, you can reach us at:
                </p>
                <ul className="mt-2 text-slate-400 space-y-1">
                    <li><strong>Email:</strong> <a href="mailto:support@glamrent.com" className="text-indigo-400 hover:text-indigo-300">support@glamrent.com</a></li>
                    <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                </ul>
            </div>

            {/* --- Contact Form --- */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                        Name (Required)
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                        Email (Required)
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Subject Input */}
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300">
                        Subject (Optional)
                    </label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Message Input */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                        Your Message (Required)
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Status Message */}
                {status && (
                    <p className={`text-sm font-medium ${status.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                        {status}
                    </p>
                )}

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full justify-center rounded-md border border-transparent bg-fuchsia-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
                        disabled={status === 'Submitting...'}
                    >
                        {status === 'Submitting...' ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
            </form>

        </div>
    );
}