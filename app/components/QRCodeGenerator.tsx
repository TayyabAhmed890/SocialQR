// "use client";
// import { useState, useRef } from "react";
// import QRCode from "react-qr-code";
// import { saveAs } from "file-saver";

// export default function QRCodeGenerator() {
//   const [url, setUrl] = useState<string>("");
//   const [qrData, setQrData] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [qrColor, setQrColor] = useState<string>("#000000");
//   const [platform, setPlatform] = useState<string>("");
//   const qrRef = useRef<HTMLDivElement>(null);

//   // Define social media platforms and their respective colors
//   const platformColors: Record<string, string> = {
//     "instagram.com": "#E1306C",
//     "facebook.com": "#1877F2",
//     "twitter.com": "#1DA1F2",
//     "linkedin.com": "#0077B5",
//     "youtube.com": "#FF0000",
//     "wa.me": "#25D366"
//   };

//   const socialMediaPlatforms = Object.keys(platformColors);

//   // Function to validate if the URL belongs to a social media platform
//   const isValidSocialMediaUrl = (string: string) => {
//     try {
//       const parsedUrl = new URL(string);
//       return socialMediaPlatforms.some((platform) => parsedUrl.hostname.includes(platform));
//     } catch (_) {
//       return false;
//     }
//   };

//   // Function to extract platform name and color based on URL
//   const getPlatformNameAndColor = (url: string): { name: string; color: string } => {
//     for (const [platform, color] of Object.entries(platformColors)) {
//       if (url.includes(platform)) {
//         return { name: platform.split(".")[0].charAt(0).toUpperCase() + platform.split(".")[0].slice(1), color };
//       }
//     }
//     return { name: "Unknown", color: "#000000" };
//   };

//   // Function to generate QR code
//   const generateQRCode = () => {
//     if (!url.trim()) {
//       setError("Please enter a valid URL.");
//       return;
//     }
//     if (!isValidSocialMediaUrl(url)) {
//       setError("Only social media links are allowed.");
//       return;
//     }
//     const { name, color } = getPlatformNameAndColor(url);
//     setQrData(url);
//     setPlatform(name);
//     setQrColor(color);
//     setUrl("");
//     setError("");
//   };

//   // Function to download QR code as high-quality image
//   const downloadQRCode = () => {
//     if (qrRef.current) {
//       const svg = qrRef.current.querySelector("svg");
//       if (!svg) return;

//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       const img = new Image();
//       const svgData = new XMLSerializer().serializeToString(svg);
//       const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//       const url = URL.createObjectURL(svgBlob);

//       img.onload = () => {
//         canvas.width = img.width * 6;
//         canvas.height = img.height * 6;
//         if (ctx) {
//           ctx.fillStyle = "white";
//           ctx.fillRect(0, 0, canvas.width, canvas.height);
//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//           canvas.toBlob((blob) => {
//             if (blob) saveAs(blob, "qr-code.png");
//           }, "image/png");
//         }
//         URL.revokeObjectURL(url);
//       };
//       img.src = url;
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
//       <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-semibold text-center text-white mb-6">
//           SocialQR - QR Code Generator
//         </h1>
//         <input
//           type="text"
//           placeholder="Paste your social media link here..."
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="border border-gray-600 p-3 rounded w-full focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-700 text-white"
//         />
//         {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
//         <button
//           onClick={generateQRCode}
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded mt-5 transition font-semibold"
//         >
//           Generate QR Code
//         </button>

//         {qrData && (
//           <div className="mt-8 flex flex-col items-center" ref={qrRef}>
//             <div className="bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-600 flex justify-center items-center w-fit">
//               <QRCode value={qrData} size={250} fgColor={qrColor} />
//             </div>
//             <p className="mt-2 text-gray-400">Platform: {platform}</p>
//             <button
//               onClick={downloadQRCode}
//               className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded mt-6 transition font-semibold"
//             >
//               Download QR Code
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
