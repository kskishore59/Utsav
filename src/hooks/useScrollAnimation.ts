import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation(options = { once: true, margin: "-100px" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, options);

  return { ref, isInView };
}
