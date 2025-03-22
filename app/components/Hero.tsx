import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, } from "react-icons/fa";
import { FaXTwitter} from "react-icons/fa6";


export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 pt-28 pb-11 text-black font-[Poppins] bg-gray-200"
    >
      {/* 🔹 Background Image with Opacity Effect */}
      <div className="absolute inset-0">
        <Image
          src="/ssmedia.jpg" // Ensure this image is in the public folder
          alt="Social Media Background"
          layout="fill"
          objectFit="cover"
          className="opacity-30 blur-[5px]"
        />
      </div>

      {/* Left Side: Text */}
      <div className="relative text-center lg:text-left max-w-xl">
        <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight">
          <span className="text-white px-2 bg-blue-600">Generate</span> Social Media{" "}
          <span className="text-blue-600">QR Codes</span> Instantly
        </h1>
        <p className="text-gray-800 mt-4 text-base sm:text-lg md:text-xl">
          Simplify sharing your social media profiles with stylish, branded QR codes.
        </p>
        <div className="flex justify-center lg:justify-start gap-4 mt-6 text-2xl sm:text-3xl">
          <FaFacebook className="text-blue-600" />
          <FaXTwitter className="text-black" />
          <FaInstagram className="text-pink-500" />
          <FaLinkedin className="text-blue-700" />
          <FaYoutube className="text-red-600" />
        </div>
      </div>

      {/* Right Side: QR Code Image (Hidden on small screens) */}
      <div className="relative hidden lg:block mt-10 md:mt-0">
        <Image
          src="/barcode.png"
          alt="QR Code Illustration"
          width={500}
          height={500}
          className="w-full max-w-sm lg:max-w-md mx-auto rotate-230"
        />
      </div>
    </section>
  );
}
