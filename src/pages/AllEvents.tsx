import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LoadingScreen } from "../components/LoadingScreen";
import { useEffect, useState } from "react";

const EVENTS = [
  // Define your events here similar to CATEGORIES
  // New events added
  {
    id: "weddings",
    name: "Wedding",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "Celebrate the magical union of two souls destined to be together forever!",
  },
  {
    id: "engagement",
    name: "Engagement",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "A heartfelt celebration of love and commitment, marking the beginning of a beautiful journey!",
  },
  {
    id: "haldi",
    name: "Haldi / Mangalasnanam",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "Embrace the tradition with vibrant colors and joyous laughter at this pre-wedding ceremony!",
  },
  {
    id: "mehendi",
    name: "Mehendi",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "Adorn your hands with intricate henna designs in a fun-filled and festive atmosphere!",
  },
  {
    id: "reception",
    name: "Reception",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "Join us for a grand celebration filled with joy, love, and unforgettable moments post-wedding!",
  },
  {
    id: "birthday",
    name: "Birthday",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "Celebrate another fabulous year of life with joy, laughter, and cake galore!",
  },
  {
    id: "anniversary",
    name: "Anniversary",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "Raise a toast to love and togetherness, cherishing every beautiful moment spent together!",
  },
  {
    id: "sangeeth",
    name: "Sangeeth",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "Dance the night away in a musical celebration, filled with laughter and unforgettable performances!",
  },
  {
    id: "house_warming",
    name: "House Warming",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "Welcome warmth and joy into your new abode with a delightful housewarming party!",
  },
  {
    id: "private_parties",
    name: "Private Parties",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "Celebrate special moments with loved ones in cozy, intimate gatherings that create lasting memories!",
  },
  {
    id: "others",
    name: "Others",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "For all those extraordinary moments that deserve a special mention, we’re here to celebrate!",
  },
  {
    id: "pooja",
    name: "Pooja",
    image: "https://i.postimg.cc/N0nnZBd9/Stage-Design.jpg",
    description:
      "Invite peace and prosperity with heartfelt prayers and religious rituals in a sacred ambiance!",
  },
  // Add more events as needed
];

export default function AllEvents() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
            className="text-4xl text-gray-900 mb-8 text-center font-poppins"
          >
            Explore Our Exciting Events
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer group"
                onClick={() => navigate(`/events/${event.id}`)}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
                  <div className="relative h-64">
                    <motion.img
                      src={event.image}
                      loading="lazy"
                      alt={event.name}
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
                      {event.name}
                    </h2>
                    <p className="text-white text-sm opacity-90 font-inter drop-shadow-md">
                      {event.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Optional: Add a "Back to Top" button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300"
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
        </motion.div>
      )}
      ;
    </>
  );
}
