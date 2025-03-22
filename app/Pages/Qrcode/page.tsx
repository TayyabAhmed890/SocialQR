"use client";
import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { saveAs } from "file-saver";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function QRCodeGenerator() {
  const [url, setUrl] = useState<string>("");
  const [qrData, setQrData] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [qrColor, setQrColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [platform, setPlatform] = useState<string>("");
  const qrRef = useRef<HTMLDivElement>(null);

  const platformColors: Record<string, string> = {
    "instagram.com": "#E1306C",
    "facebook.com": "#1877F2",
    "twitter.com": "#1DA1F2",
    "linkedin.com": "#0077B5",
    "youtube.com": "#FF0000",
    "wa.me": "#25D366",
  };

  const socialMediaPlatforms = Object.keys(platformColors);

  const isValidSocialMediaUrl = (string: string) => {
    try {
      const parsedUrl = new URL(string);
      return socialMediaPlatforms.some((platform) =>
        parsedUrl.hostname.includes(platform)
      );
    } catch {
      return false;
    }
  };

  const getPlatformNameAndColor = (url: string): { name: string; color: string } => {
    for (const [platform, color] of Object.entries(platformColors)) {
      if (url.includes(platform)) {
        return {
          name: platform.split(".")[0].charAt(0).toUpperCase() + platform.split(".")[0].slice(1),
          color,
        };
      }
    }
    return { name: "Unknown", color: "#000000" };
  };

  const generateQRCode = () => {
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
    if (!isValidSocialMediaUrl(url)) {
      setError("Only social media links are allowed.");
      return;
    }
    const { name, color } = getPlatformNameAndColor(url);
    setQrData(url);
    setPlatform(name);
    setQrColor(color); // Default QR color to platform color
    setError("");
  };

  const downloadQRCode = () => {
    if (qrRef.current) {
      const svg = qrRef.current.querySelector("svg");
      if (!svg) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = img.width * 6;
        canvas.height = img.height * 6;
        if (ctx) {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) saveAs(blob, "qr-code.png");
          }, "image/png");
        }
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  return (
    <div className={`${poppins.className} flex flex-col items-center justify-center min-h-screen bg-white p-6 pt-24`}>
      <div className="bg-transparent border border-black p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6 leading-[1.3]"><span className="text-blue-600">QR</span> Code <br/><span className="bg-blue-600 px-2 text-white">Generator</span></h1>
        <input
          type="text"
          placeholder="Paste your social media link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-black p-3 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <button
          onClick={generateQRCode}
          className="w-full bg-transparent border border-black text-black hover:bg-black hover:text-white py-3 rounded mt-5 transition font-semibold active:bg-black active:text-white"
        >
          Generate QR Code
        </button>

        {qrData && (
          <div className="mt-8 flex flex-col items-center" ref={qrRef}>
            <div className=" p-6 rounded-lg shadow-lg border border-gray-600 flex justify-center items-center w-fit">
              <QRCode value={qrData} size={250} fgColor={qrColor} bgColor={bgColor} />
            </div>
            <p className="mt-2 text-black">Platform: {platform}</p>

            {/* Customization Options */}
            <div className="mt-6 space-y-4 flex-col flex items-center">
              <label className="text-sm font-semibold">QR Code Color:</label>
              <input type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} className="cursor-pointer" />
              
              <label className="text-sm font-semibold">Background Color:</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="cursor-pointer" />

            </div>
            
            <button
              onClick={downloadQRCode}
              className="bg-white text-black border hover:bg-black hover:text-white py-3 px-6 rounded mt-6 transition font-semibold active:bg-black active:text-white"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
