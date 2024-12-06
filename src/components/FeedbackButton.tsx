import { MessageSquareHeart } from "lucide-react";
import { motion } from "framer-motion";

export default function FeedbackButton() {
  const googleFormUrl = "https://forms.gle/JkN3izLJXjdC6edDA"; // Replace with your Google Form URL

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        whileHover={{ rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open(googleFormUrl, "_blank")}
        className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <MessageSquareHeart className="h-5 w-5" />
          <span className="font-medium pr-2 hidden md:block">Feedback</span>
        </div>
      </motion.button>
    </motion.div>
  );
}
