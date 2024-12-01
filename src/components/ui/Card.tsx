import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface CardProps {
  href: string;
  image: string;
  title: string;
  description: string;
  price: number;
  onClick?: () => void;
  className?: string;
}

export function Card({
  href,
  image,
  title,
  description,
  price,
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
            className={`h-full w-full object-cover object-center transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
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
          {price && (
            <p className="mt-1.5 text-md font-semibold justify-end text-indigo-600">
              <span className="text-md font-500 text-indigo">
                Starting from
              </span>{" "}
              <br />₹{price}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
