import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircleCodeIcon,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const createWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hey there! I'm excited to learn more about your amazing products! Could you share some details with me?`
    );
    return `https://wa.me/916300996714?text=${message}`;
  };
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img
                src="/utsav-footer-logo-1.png"
                alt="logo"
                style={{ height: "2.5rem", width: "8rem", marginLeft: "0px" }}
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Transform your events into extraordinary experiences with Utsav.
              We provide premium event equipment rentals that bring your vision
              to life, making every moment unforgettable.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/myutsav.in?igsh=NGgwNGYzejkxdWsz"
                target="blank"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/category/sound"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Sound Systems
                </Link>
              </li>
              <li>
                <Link
                  to="/category/lighting"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Lighting Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/category/decor"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Event Decor
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Event Packages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Our Services
            </h3>
            <ul className="space-y-4">
              <li className="text-gray-400">Wedding Ceremonies</li>
              <li className="text-gray-400">Corporate Events</li>
              <li className="text-gray-400">Cultural Celebrations</li>
              <li className="text-gray-400">Private Parties</li>
              <li className="text-gray-400">Festival Equipment</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-400 hover:text-indigo-400 transition-colors">
                  <a href="mailto:support@utsav.com">support@utsav.com</a>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircleCodeIcon className="h-5 w-5 text-indigo-400" />
                <a
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-gray-400">Connect with us</span>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-400">
                  Hyderabad, Telangana
                  <br />
                  Open: 9:00 AM - 8:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center space-y-4">
            <p className="text-gray-400">
              Making your events extraordinary, one rental at a time.
            </p>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Utsav. All rights reserved.
              <span className="mx-2">|</span>
              <Link
                to="/privacy-policy"
                className="hover:text-indigo-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="mx-2">|</span>
              <Link
                to="/terms-and-conditions"
                className="hover:text-indigo-400 transition-colors"
              >
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
