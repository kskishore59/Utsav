import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface CardProps {
  href: string;
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
  displayPill: boolean;
  onClick?: () => void;
  className?: string;
}

const categoryColors: { [key: string]: string } = {
  decor: "bg-red-100", // Replace with actual category names and colors
  photography: "bg-blue-100",
  sound: "bg-green-100",
  artists: "bg-gray-200",
  transportation: "bg-orange-100",
  lighting: "bg-teal-100",
  "support-staff": "bg-purple-100",

  // Add more categories and their corresponding colors
};

export function Card({
  href,
  image,
  title,
  description,
  category,
  price,
  displayPill,
  onClick,
  className = "",
}: CardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={href}
        className={`block group overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all ${className}`}
      >
        <div className="aspect-[4/3] overflow-hidden relative">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={image}
            alt={title}
            loading="lazy"
            className={`h-full w-full object-cover object-center transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            aria-placeholder="blur"
          />
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-xs text-gray-500 line-clamp-2">
              {description}
            </p>
          )}
          <div className="flex justify-between mt-3">
            {price && (
              <p className="text-md font-semibold text-indigo-600">
                <span className="text-md font-500 text-indigo">
                  Starting from
                </span>{" "}
                <br />₹{price}
              </p>
            )}
            {displayPill && category && (
              <span
                className={`inline-flex mt-3 items-center justify-center text-black text-xs font-500 font-poppins px-2 py-0.5 rounded-lg h-5 w-auto ${
                  categoryColors[category.toLowerCase()]
                }`}
              >
                {category.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
