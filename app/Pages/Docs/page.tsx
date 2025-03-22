"use client";
import { Poppins } from "next/font/google";
import { useState } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

const sections = [
  {
    title: "📌 QR Code Generator",
    key: "qr-code",
    content: [
      {
        title: "How to Use",
        details: (
          <ul className={`${poppins.className} list-disc pl-5 space-y-2 text-sm md:text-base lg:text-lg`}>
            <li>Enter your social media link.</li>
            <li>Click <strong>&quot;Generate QR Code&quot;</strong>.</li>
            <li>Download and share your QR code.</li>
          </ul>
        ),
      },
      {
        title: "Instructions",
        details: (
          <ul className={`${poppins.className} list-disc pl-5 space-y-2 text-sm md:text-base lg:text-lg`}>
            <li>Only social media links are allowed.</li>
            <li>QR codes are color-coded per platform.</li>
            <li>Do not upload private links.</li>
          </ul>
        ),
      },
      {
        title: "FAQ",
        details: (
          <div className={`${poppins.className} space-y-2 text-sm md:text-base lg:text-lg`}>
            <p>
              <strong>Q:</strong> Which platforms are supported?
            </p>
            <p>
              <strong>A:</strong> Instagram, Twitter, LinkedIn, Facebook, etc.
            </p>
          </div>
        ),
      },
    ],
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("qr-code");
  const [activeSubSection, setActiveSubSection] = useState("How to Use");

  return (
    <div className={`${poppins.className} min-h-screen bg-white text-black px-4 md:px-8 lg:px-16 py-24`}>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
        📖 Documentation
      </h1>

      {/* Main Sections */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => {
              setActiveSection(section.key);
              setActiveSubSection(section.content[0].title); // Default first subsection
            }}
            className={`px-5 md:px-6 py-2 md:py-3 text-sm md:text-lg rounded-lg font-medium transition-all shadow-md hover:shadow-lg ${
              activeSection === section.key
                ? "bg-gray-900 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Sub Sections (QR Code) */}
      {sections
        .filter((section) => section.key === activeSection)
        .map((section) => (
          <div key={section.key} className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6">
              {section.content.map((sub) => (
                <button
                  key={sub.title}
                  onClick={() => setActiveSubSection(sub.title)}
                  className={`px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm lg:text-base rounded-lg font-medium transition-all ${
                    activeSubSection === sub.title
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 hover:bg-gray-400 text-black"
                  }`}
                >
                  {sub.title}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-5 md:p-8 ">
              {section.content
                .filter((sub) => sub.title === activeSubSection)
                .map((sub) => (
                  <div
                    key={sub.title}
                    className="mb-4 p-4 bg-white border-black border-2 rounded-md text-sm md:text-base lg:text-lg"
                  >
                    <h2 className="text-lg md:text-xl font-semibold mb-4">{sub.title}</h2>
                    <div className="text-gray-700">{sub.details}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
