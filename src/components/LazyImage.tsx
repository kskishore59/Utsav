import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
}

export default function LazyImage({
  src,
  alt,
  className = "",
  placeholderSrc = "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==", // Light gray placeholder
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);

  useEffect(() => {
    // Start loading the image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <motion.div
      className={` overflow-hidden ${className}`}
      animate={{ opacity: isLoaded ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${
          !isLoaded ? "blur-sm" : "blur-0"
        } transition-all duration-300`}
        loading="lazy"
      />
    </motion.div>
  );
}
