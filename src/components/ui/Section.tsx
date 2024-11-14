import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Section({ children, className = "", delay = 0 }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
