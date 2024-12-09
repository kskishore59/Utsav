import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationForm({
  isOpen,
  onClose,
}: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    eventType: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwn-3cZFbxiM8D7dEtQuvb2dGIXlVXy53U6yV5gv_eaiNM7LWbwuVKCaT3j_Yz3WBcIgw/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      //   if (response.ok) {
      // Create WhatsApp link with form data
      const message = encodeURIComponent(
        `Hey there! I'm ${formData.name}, and I'm super excited about planning an unforgettable event! \n\n Event Type: ${formData.eventType}\n Query: ${formData.query}\n\nLet's chat and make some magic happen! 🌟`
      );
      const whatsappUrl = `https://wa.me/916300996714?text=${message}`;

      // Reset form and close modal
      setFormData({ name: "", phoneNumber: "", eventType: "", query: "" });
      onClose();

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 m-4"
          >
            <div className="flex justify-between  items-center mb-6">
              <h2 className="text-2xl font-semibold font-poppins text-gray-900">
                Event Consultation
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country Code
                </label>
                <select
                  value="+91" // Default country code for India
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled // Make this field non-editable
                >
                  <option value="+91">+91 (India)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  pattern="\d{10}" // Validation for exactly 10 digits
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  onInvalid={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("phoneError")!
                      .classList.remove("hidden");
                  }}
                  onInput={() => {
                    document
                      .getElementById("phoneError")!
                      .classList.add("hidden");
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Your phone number"
                />
                <p className="text-red-500 text-xs mt-1 hidden" id="phoneError">
                  Phone number must be 10 digits.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select
                  required
                  value={formData.eventType}
                  onChange={(e) =>
                    setFormData({ ...formData, eventType: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select event type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate">Corporate Event</option>
                  <option value="Birthday">Birthday Party</option>
                  <option value="Social">Social Gathering</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Query
                </label>
                <textarea
                  required
                  value={formData.query}
                  onChange={(e) =>
                    setFormData({ ...formData, query: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={4}
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold
                         hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/50 
                         transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
