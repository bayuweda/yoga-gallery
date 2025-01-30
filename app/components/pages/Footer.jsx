import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#151515] mt-24 text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/assets/logo.png" alt="Logo" className="h-12 mb-2" />
          <p className="text-sm text-gray-400">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>

        {/* Follow Us */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-4 mt-2 justify-center md:justify-start">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-white text-xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Navigasi Halaman */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Halaman</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/about" className="text-gray-400 hover:text-white">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="/services" className="text-gray-400 hover:text-white">
                Layanan
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-white">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        {/* Informasi Kami */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Informasi Kami</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FaPhone className="text-blue-400" />
              <span className="text-gray-400">+62 838-9449-9241</span>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FaEnvelope className="text-red-400" />
              <span className="text-gray-400">bayuweda24@gmail.com</span>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <FaMapMarkerAlt className="text-green-400" />
              <span className="text-gray-400">
                Br Pupuan, Tegallalang, Gianyar, Bali
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
