import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({
  title,
  content,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 rounded-lg shadow-sm pr-4 pl-4">
      <button
        onClick={onToggle}
        className="w-full py-4 flex justify-between items-center text-left hover:text-indigo-600 transition-colors"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
