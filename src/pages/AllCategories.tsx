import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LoadingScreen } from "../components/LoadingScreen";
import { useEffect, useState } from "react";
import FeedbackButton from "../components/FeedbackButton";

const CATEGORIES = [
  {
    id: "sound",
    name: "Sound And Visual Effects",
    image: "/sharpies-two.jpg",
    description: "Professional audio systems and Visual effects equipment",
  },
  {
    id: "lighting",
    name: "Lighting",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80",
    description: "Event, business and Home lighting solutions",
  },
  {
    id: "decor",
    name: "Decor",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80",
    description: "Event decoration and setup",
  },
  {
    id: "photography",
    name: "Photography",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80",
    description: "Professional photographers and videographers",
  },
  {
    id: "transportation",
    name: "Transportation",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80",
    description: "Luxury cars, buses, and transportation services",
  },
  {
    id: "artists",
    name: "Artists",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80",
    description: "Musicians, dancers, and performers",
  },
  {
    id: "hospitality",
    name: "Hospitality Staff",
    image:
      "https://images.unsplash.com/photo-1582192764070-34c1194c0f7c?auto=format&fit=crop&q=80",
    description: "Welcome staff, servers, and bouncers",
  },
];

export default function AllCategories() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(false);
    }, 1000); // Change image every 1 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if the user has scrolled 60% of the page
      if (scrollPosition > (documentHeight - windowHeight) * 0.6) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-inter text-gray-900 mb-8 text-center"
          >
            Our Equipment Categories
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer group"
                onClick={() => navigate(`/category/${category.id}`)}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
                  <div className="relative h-64">
                    <motion.img
                      src={category.image}
                      loading="lazy"
                      alt={category.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      aria-placeholder="blur"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
                  </div>

                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <h2 className="text-2xl font-inter-600 text-white mb-2 drop-shadow-lg">
                      {category.name}
                    </h2>
                    <p className="text-white text-sm opacity-90 font-inter drop-shadow-md">
                      {category.description}
                    </p>
                  </motion.div>

                  {/* <motion.div
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + 0.1 * index }}
              >
                {/* <span className="text-sm font-medium text-gray-800">
                  {PRODUCTS.filter((each) => each.category === category).length}{" "}
                  items
                </span> */}
                  {/* </motion.div> */}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Optional: Add a "Back to Top" button */}
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
        </motion.div>
      )}
      ;
      <FeedbackButton />
    </>
  );
}
