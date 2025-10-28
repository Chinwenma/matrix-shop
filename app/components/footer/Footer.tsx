import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t pt-10 pb-4">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-teal-600 p-2 rounded-md">
              <Image
                src="/icons/sofa.svg"
                alt="Comforty Logo"
                width={22}
                height={22}
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Comforty</h2>
          </div>
          <p className="text-gray-500 text-sm leading-snug">
            Vivamus tristique odio sit amet velit semper, eu posuere turpis
            interdum. Cras egestas purus.
          </p>

          <div className="flex gap-4 mt-3 text-gray-500">
            <Link href="#"><Twitter className="w-4 h-4 hover:text-teal-600 transition" /></Link>
            <Link href="#"><Facebook className="w-4 h-4 hover:text-teal-600 transition" /></Link>
            <Link href="#"><Instagram className="w-4 h-4 hover:text-teal-600 transition" /></Link>
            <Link href="#"><Youtube className="w-4 h-4 hover:text-teal-600 transition" /></Link>
          </div>
        </div>

        {/* Category */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-3 tracking-wider">
            CATEGORY
          </h4>
          <ul className="space-y-1 text-gray-500 text-sm">
            <li><Link href="#">Sofa</Link></li>
            <li><Link href="#">Armchair</Link></li>
            <li><Link href="#">Wing Chair</Link></li>
            <li><Link href="#" className="text-teal-600 hover:underline">Desk Chair</Link></li>
            <li><Link href="#">Wooden Chair</Link></li>
            <li><Link href="#">Park Bench</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-3 tracking-wider">
            SUPPORT
          </h4>
          <ul className="space-y-1 text-gray-500 text-sm">
            <li><Link href="#">Help & Support</Link></li>
            <li><Link href="#">Terms & Conditions</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Help</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-3 tracking-wider">
            NEWSLETTER
          </h4>
          <form className="flex gap-2 mb-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white text-sm px-3 py-2 rounded-md hover:bg-teal-700 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-gray-500 text-xs leading-snug">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tincidunt erat enim.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 border-t pt-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © 2021 - Blogy – Designed & Developed by{" "}
            <Link href="#" className="text-teal-600 hover:underline font-medium">
              Zakirsoft
            </Link>
          </p>

          <div className="flex items-center gap-2 opacity-70">
            <Image src="/payments/paypal.png" alt="PayPal" width={36} height={20} />
            <Image src="/payments/mastercard.png" alt="Mastercard" width={36} height={20} />
            <Image src="/payments/visa.png" alt="Visa" width={36} height={20} />
          </div>
        </div>
      </div>
    </footer>
  );
}
