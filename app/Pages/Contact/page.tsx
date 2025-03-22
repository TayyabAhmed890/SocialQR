"use client";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Poppins } from "next/font/google";

// Import Poppins Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Basic Input Sanitization Function
const sanitizeInput = (input: string) => {
  return input.replace(/<[^>]*>?/gm, "").trim(); // Removes HTML tags
};

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: sanitizeInput(e.target.value) });
  };

  // Form Validation
  const validateForm = () => {
    const { name, email, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) return "All fields are required.";
    if (!emailRegex.test(email)) return "Invalid email address.";
    if (message.length < 10) return "Message should be at least 10 characters long.";
    if (message.length > 500) return "Message is too long. Keep it under 500 characters.";
    if (/https?:\/\//i.test(message)) return "Links are not allowed."; // Prevent spam links

    return null;
  };

  // Auto-hide messages after 3 sec
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Send Email
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      console.log("Email sent successfully:", response);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending email:", err);
      setError("Failed to send message. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <section className={`py-24 px-6 lg:px-16 text-center ${poppins.className}`}>
      <h2 className="text-4xl font-bold text-black mb-4"><span className="bg-blue-600 text-white px-2">Get</span> in <span className="text-blue-600">Touch</span></h2>
      <p className="text-lg text-gray-600 mb-8">Feel free to reach out via the form below.</p>

      <form onSubmit={sendEmail} className="max-w-lg mx-auto bg-white p-6 border rounded-lg shadow-md">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
        />

        {/* ✅ Success & Error Messages */}
        {error && (
          <p className="text-red-500 flex items-center justify-center mb-4 transition-opacity duration-300 opacity-100">
            <XCircle className="mr-2 size-5" /> {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 flex items-center justify-center mb-4 transition-opacity duration-300 opacity-100">
            <CheckCircle className="mr-2 size-5" /> Message Sent Successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded flex justify-center border items-center transition hover:bg-white hover:text-black disabled:bg-gray-500"
        >
          {loading ? <Loader2 className="animate-spin size-5" /> : <Send className="size-5 mr-2" />}
          {loading ? " Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}
