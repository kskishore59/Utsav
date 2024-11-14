import React from "react";
import { Link } from "react-router-dom";
import { Package, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-bold text-white">Utsav</span>
            </div>
            <p className="text-sm">
              Premium event equipment rental for unforgettable experiences.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/sound" className="hover:text-white">
                  Sound Systems
                </Link>
              </li>
              <li>
                <Link to="/category/lighting" className="hover:text-white">
                  Lighting
                </Link>
              </li>
              <li>
                <Link to="/category/decor" className="hover:text-white">
                  Event Decor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cart" className="hover:text-white">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@Utsav.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Event Street, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Utsav. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
