import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { motion } from "framer-motion";
import { PRODUCTS } from "../products";
import { Product } from "../types";
import FeedbackButton from "../components/FeedbackButton";

const createWhatsAppLink = (event) => {
  const message = encodeURIComponent(
    `Hi, I'm interested in attending:\n\nEvent: ${event.name}\nDescription: ${event.description}\nDate: ${event.date}`
  );
  return `https://wa.me/916300996714?text=${message}`;
};

export default function Events() {
  const { id } = useParams(); // Changed from category to event_type
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

  const filteredEventProducts = useMemo(() => {
    const filtered = PRODUCTS.filter((product) => {
      return product.idealFor
        .map((item) => item.toLowerCase())
        .includes(id.toLowerCase());
    });

    return filtered;
  }, [PRODUCTS, id]);

  const eventTitle = id ? id.charAt(0).toUpperCase() + id.slice(1) : "";

  //   const filteredEventsSearch = events.filter((event) =>
  //     event.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0 font-poppins">
          {eventTitle} Events
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEventProducts.map(
          (
            product: Product // Changed from Product to Event
          ) => (
            <Card
              key={product.id}
              href={`/products/${product.id}`} // Changed from /products to /products
              image={product.image[0]} // Changed from product.image to product.image
              title={product.name}
              price={product.price}
              description={product.description}
              onClick={() => window.open(createWhatsAppLink(product), "_blank")}
            />
          )
        )}
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
      <FeedbackButton />
    </div>
  );
}
