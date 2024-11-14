import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  count?: number;
  children: React.ReactNode;
}

export function Dropdown({
  label,
  isOpen,
  onToggle,
  count,
  children,
}: DropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
      >
        <span className="font-medium">
          {label} {count && count > 0 ? `(${count})` : ""}
        </span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 group-hover:text-indigo-600 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
