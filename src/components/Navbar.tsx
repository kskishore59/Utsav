import { HelpCircle, Menu, Package, Search, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useStore } from "../store";
import { PRODUCTS } from "../products";
import { debounce } from "lodash";

export default function Navbar() {
  // const cart = useStore((state) => state.cart);
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    setSearchQuery(query);
    console.log(searchQuery);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = PRODUCTS.filter((product) => {
      const searchTerm = query.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
        // product.description.toLowerCase().includes(searchTerm)
      );
    }).slice(0, 5);

    setSearchResults(filtered);
  };

  const handleNavClick = () => {
    setIsOpen(false);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const createWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hi, I have doubts regarding the product booking on your website and needs clarification`
    );
    return `https://wa.me/916300996714?text=${message}`;
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/utsav-logo-1.jpeg"
                alt="logo"
                style={{ height: "3rem", width: "9rem" }}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {product.category} - {product.subCategory}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/categories"
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <Package className="h-5 w-5" />
              <span>All Categories</span>
            </Link>
            <Link
              to="/all-products"
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <Package className="h-5 w-5" />
              <span>All Products</span>
            </Link>
            <Link
              to="/faq"
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <HelpCircle className="h-5 w-5" />
              <span>FAQ's</span>
            </Link>
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2  hover:text-indigo-600 text-gray rounded-md transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat with us
            </a>

            {/* <Link to="/orders" className="text-gray-600 hover:text-indigo-600">
              Orders
            </Link> */}
            {/* <Link to="/cart" className="relative flex items-center">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link> */}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 transition-colors hover:text-indigo-600"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute transform transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  className={`absolute transform transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className={`md:hidden fixed inset-0 top-16 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>
              {searchResults.length > 0 && (
                <div className="mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setSearchQuery("");
                        setSearchResults([]);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium text-sm">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ${product.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/categories"
              className="block px-3 py-2 text-gray-600 transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
              onClick={handleNavClick}
            >
              All Categories
            </Link>
            <Link
              to="/all-products"
              className="block px-3 py-2 text-gray-600 transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
              onClick={handleNavClick}
            >
              All Products
            </Link>
            <Link
              to="/faq"
              className="block px-3 py-2 text-gray-600 transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
              onClick={handleNavClick}
            >
              FAQ's
            </Link>
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-500  hover:bg-green-600 text-white rounded-md transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat with us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
