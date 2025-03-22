"use client";
import { useRouter } from "next/navigation";
import { Paintbrush, Lock, Download, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function ModernInfo() {
  const router = useRouter(); // Next.js router

  return (
    <section className={`mt-16 pb-9 px-6 lg:px-16 text-center ${poppins.className}`}>
      {/* Title with Icon */}
      <div className="flex justify-center items-center space-x-3">
        <Sparkles className="size-8 hidden md:block text-black" /> {/*✨ Icon Added */}
        <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-tight">
          <span className="text-blue-600">Simplify</span> Social Sharing
        </h2>
      </div>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 mt-4 mb-12 max-w-2xl mx-auto">
        Generate QR codes for your social media links effortlessly. 
        Fast, secure, and easy to use!
      </p>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 - Easy Download */}
        <div className="border border-black bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:bg-gray-100">
          <Download className="size-12 text-black mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-black">Easy Download</h3>
          <p className="text-gray-600 mt-3">
            Generate and download your QR codes instantly in high quality. 
            No sign-up required!
          </p>
        </div>

        {/* Card 2 - Customizable Design */}
        <div className="border border-black bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:bg-gray-100">
          <Paintbrush className="size-12 text-black mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-black">Customizable Design</h3>
          <p className="text-gray-600 mt-3">
            Personalize your QR codes with colors, styles, and branding.
          </p>
        </div>

        {/* Card 3 - Secure & Reliable */}
        <div className="border border-black bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:bg-gray-100">
          <Lock className="size-12 text-black mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-black">Secure & Reliable</h3>
          <p className="text-gray-600 mt-3">
            Your QR codes are private and safe. No data tracking involved.
          </p>
        </div>
      </div>

      {/* Explore Button */}
      <div className="mt-10">
        <button
          onClick={() => router.push("Pages/Qrcode")} // Navigate to QR code page
          className="border border-black bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-all active:bg-black active:text-white"
        >
          Generate Now →
        </button>
      </div>
    </section>
  );
}
