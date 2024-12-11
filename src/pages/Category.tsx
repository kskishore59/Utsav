import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "../components/ui/Card";
import { PRODUCTS } from "../products";
import { Product } from "../types";
const createWhatsAppLink = (product: Product) => {
  const message = encodeURIComponent(
    `Hi, I'm interested in renting:\n\nProduct: ${product.name}\nDescription: ${product.description}\nPrice: ₹${product.price}`
  );
  return `https://wa.me/916300996714?text=${message}`;
};
export default function Category() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false); // Add this state

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if the user has scrolled 60% of the page
      if (scrollPosition > (documentHeight - windowHeight) * 0.5) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, []);

  const products = category
    ? PRODUCTS.filter((product) => product.category.includes(category))
    : [];

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0 font-poppins">
          {categoryTitle} Packages
        </h1>

        <div className="relative flex-2 md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product: Product) => (
          <Card
            key={product.id}
            href={`/products/${product.id}`}
            image={product.image[0]}
            title={product.name}
            description={product.description}
            category={product.category}
            displayPill={false}
            price={product.price}
            onClick={() => window.open(createWhatsAppLink(product), "_blank")}
          />
        ))}
      </div>

      {isButtonVisible && ( // Update this line
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
}
