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
            <div className="bg-teal-600  rounded-full p-4">
              <Image
                src="/assets/MyLogo.png"
                alt="Comforty Logo"
                width={22}
                height={22}
                className="w-8 h-8"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Matrix Shop</h2>
          </div>
          <p className="text-gray-500 text-sm leading-snug">
            Vivamus tristique odio sit amet velit semper, eu posuere turpis
            interdum. Cras egestas purus.
          </p>
        </div>

        {/* Category */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-3 tracking-wider">
            CATEGORIES
          </h4>
          <ul className="space-y-1 text-gray-500 text-sm ">
            <li>
              <Link
                href="/categories"
                className="hover:text-teal-600 hover:underline"
              >
                Bed Room
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-teal-600 hover:underline"
              >
                Living Room
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-teal-600 hover:underline"
              >
                Kitchen
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-teal-600 hover:underline"
              >
                Children{"'"}s Room{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-teal-600 hover:underline"
              >
                Out Door
              </Link>
            </li>
            <li>
              <Link href="/categories">Office</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-3 tracking-wider">
            SUPPORT
          </h4>
          <ul className="space-y-1 text-gray-500 text-sm">
            <li>
              <Link href="/contact" className="hover:text-teal-600 hover:underline">
                Help & Support
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-teal-600 hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-teal-600 hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-teal-600 hover:underline"
              >
                Help
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-3 tracking-wider">
            NEWSLETTER
          </h4>
          <form className="flex gap-2 mb-2" >
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
            © {new Date().getFullYear()} - Matrix-Shop – Developed by{" "}
            <Link href="" className="text-teal-600 hover:underline font-medium">
              De_Tech_Matrix
            </Link>
          </p>
          <div className="flex gap-4 mt-3 text-gray-500 items-center">
            <Link href="#">
              <Twitter className="w-4 h-4 hover:text-teal-600 transition" />
            </Link>
            <Link href="#">
              <Facebook className="w-4 h-4 hover:text-teal-600 transition" />
            </Link>
            <Link href="#">
              <Instagram className="w-4 h-4 hover:text-teal-600 transition" />
            </Link>
            <Link href="#">
              <Youtube className="w-4 h-4 hover:text-teal-600 transition" />
            </Link>
          </div>
          {/* <div className="flex items-center gap-2 opacity-70">
            <Image src="/assets/paypal.png" alt="PayPal" width={36} height={20} className="w-8 h-8"/>
            <Image src="/payments/mastercard.png" alt="Mastercard" width={36} height={20} />
            <Image src="/payments/visa.png" alt="Visa" width={36} height={20} />
          </div> */}
        </div>
      </div>
    </footer>
  );
}
