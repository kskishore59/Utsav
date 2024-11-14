import { useState } from "react";
import { Section } from "../components/ui/Section";
import { motion } from "framer-motion";
import { AccordionItem } from "../components/ui/Accordion";

const FAQData = [
  {
    id: 1,
    question: "What equipment do you offer for events?",
    answer:
      "We offer a wide range of event equipment including sound systems, lighting equipment, stage setups, decorative elements, and more. Our inventory is regularly updated to ensure we provide the latest technology and trends in event production.",
  },
  {
    id: 2,
    question: "How does the rental process work?",
    answer:
      "The rental process is simple: Browse our catalog, select your items, choose your rental dates, and proceed to checkout. We'll confirm your order and arrange delivery or pickup. Our team is available to assist you throughout the process.",
  },
  {
    id: 3,
    question: "Do you provide setup and installation services?",
    answer:
      "Yes, we offer professional setup and installation services for all our equipment. Our experienced technicians ensure everything is properly installed and functioning before your event.",
  },
  {
    id: 4,
    question: "What is your cancellation policy?",
    answer:
      "Orders can be cancelled up to 48 hours before the rental date for a full refund. Cancellations within 48 hours may be subject to a cancellation fee. Please contact our customer service for specific details.",
  },
  {
    id: 5,
    question: "Do you offer delivery services?",
    answer:
      "Yes, we provide delivery and pickup services within our service area. Delivery fees vary based on location and equipment size. We can provide a quote during the booking process.",
  },
  {
    id: 6,
    question: "What happens if equipment malfunctions during my event?",
    answer:
      "We provide 24/7 emergency support for all rentals. If any equipment malfunctions, our technical team will respond promptly to resolve the issue or provide replacement equipment.",
  },
  {
    id: 7,
    question: "Do you require a deposit?",
    answer:
      "Yes, we require a security deposit for most rentals. The deposit amount varies based on the equipment value. The deposit is fully refundable upon return of equipment in good condition.",
  },
  {
    id: 8,
    question: "Can I extend my rental period?",
    answer:
      "Yes, rental extensions are possible subject to availability. Please contact us at least 24 hours before your scheduled return time to arrange an extension.",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Find answers to common questions about our rental services
          </p>

          <div className="space-y-1 bg-white rounded-lg shadow-sm">
            {FAQData.map((faq) => (
              <AccordionItem
                key={faq.id}
                title={faq.question}
                content={faq.answer}
                isOpen={openItems.includes(faq.id)}
                onToggle={() => toggleItem(faq.id)}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Still have questions?{" "}
              <a
                href="mailto:support@example.com"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
