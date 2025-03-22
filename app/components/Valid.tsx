import { FaInstagram, FaFacebook, FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function SocialPlatforms() {
  return (
    <div className={`${poppins.className} flex flex-col items-center justify-center py-12 px-6 `}>
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 leading-[1.2]"><span className="text-blue-600 px-2">Supported</span> Social <br/> Media <span className="bg-blue-600 px-2 text-white">Links</span></h2>
      <p className="text-center text-gray-600 max-w-lg">
        Generate stylish QR codes for these platforms and share your social media presence with ease.
      </p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        <div className="flex flex-col items-center p-6 border rounded-xl hover:scale-110 hover:bg-gray-100 transition-all duration-300 ease-in-out w-32 md:w-40">
          <FaInstagram className="text-black text-5xl transition-transform duration-300 hover:rotate-12" />
          <span className="mt-3 font-semibold">Instagram</span>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-xl hover:scale-110 hover:bg-gray-100 transition-all duration-300 ease-in-out w-32 md:w-40">
          <FaFacebook className="text-black text-5xl transition-transform duration-300 hover:rotate-12" />
          <span className="mt-3 font-semibold">Facebook</span>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-xl hover:scale-110 hover:bg-gray-100 transition-all duration-300 ease-in-out w-32 md:w-40">
          <FaXTwitter className="text-black text-5xl transition-transform duration-300 hover:rotate-12" />
          <span className="mt-3 font-semibold">Twitter</span>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-xl hover:scale-110 hover:bg-gray-100 transition-all duration-300 ease-in-out w-32 md:w-40">
          <FaLinkedin className="text-black text-5xl transition-transform duration-300 hover:rotate-12" />
          <span className="mt-3 font-semibold">LinkedIn</span>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-xl hover:scale-110 hover:bg-gray-100 transition-all duration-300 ease-in-out w-32 md:w-40">
          <FaYoutube className="text-black active:text-white text-5xl transition-transform duration-300 hover:rotate-12 " />
          <span className="mt-3 font-semibold">YouTube</span>
        </div>
      </div>
    </div>
  );
}
