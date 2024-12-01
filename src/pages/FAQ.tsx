import { useState } from "react";
import { Section } from "../components/ui/Section";
import { motion } from "framer-motion";
import { AccordionItem } from "../components/ui/Accordion";

const FAQData = [
  {
    id: 1,
    question: "Who are we, and what do we do?",
    answer:
      "We are an event rental platform connecting you with the best vendors for all your event needs. From lighting and sound to complete packages, we simplify the process of renting high-quality materials for any type of event, all in one place.",
  },
  {
    id: 2,
    question: "What types of events do you cater to?",
    answer:
      "We cater to all types of events, including weddings, corporate functions, birthday parties, cultural events, and more. Whether it’s a small gathering or a grand celebration, we have packages to suit every occasion.",
  },
  {
    id: 3,
    question: "Why choose us?",
    answer:
      "We simplify your event planning process by offering: Verified and reliable vendors, affordable pricing, a hassle-free booking experience, and a range of customizable packages tailored to your needs.",
  },
  {
    id: 4,
    question: "What kind of packages do you offer?",
    answer:
      "Our packages are designed for different types of events and include essentials like lighting, sound systems, stage setups, and decorations. Each package is customizable based on your requirements.",
  },
  {
    id: 5,
    question: "Can I rent individual items instead of a package?",
    answer:
      "Currently, we are focusing on package-based rentals to ensure a seamless and cost-effective experience. However, stay tuned as we expand our services!",
  },
  {
    id: 6,
    question: "How can I find out the pricing for the packages?",
    answer:
      "To get the best prices, simply click the 'Request Quote' button on the package you're interested in. You’ll be redirected to WhatsApp, where our team will assist you with pricing and customization options.",
  },
  {
    id: 7,
    question: "How does the booking process work?",
    answer:
      "Booking your event package is simple: Browse through the available packages on our website, select a package that fits your event needs, click on 'Request Quote' to connect with us on WhatsApp, share your event details, and we’ll provide you with pricing and availability. Confirm your booking with us, and we’ll handle the rest!",
  },
  {
    id: 8,
    question: "Can I customize the packages?",
    answer:
      "Yes, we offer customizable options within our packages to meet your specific requirements. Just let us know your preferences when you reach out via WhatsApp.",
  },
  {
    id: 9,
    question: "How early should I book my package?",
    answer:
      "We recommend booking your package at least 2-3 weeks in advance to ensure availability and timely arrangements.",
  },
  {
    id: 10,
    question: "Who handles the delivery and setup of the materials?",
    answer:
      "Our vendor partners take care of the delivery and setup for your event, ensuring everything is ready on time.",
  },
  {
    id: 11,
    question: "Is there an additional charge for delivery and setup?",
    answer:
      "Delivery and setup charges depend on the package and location. These details will be shared with you during the quote discussion on WhatsApp.",
  },
  {
    id: 12,
    question: "How do I make a payment?",
    answer:
      "Payments can be made online or via bank transfer after confirming the quote and booking details.",
  },
  {
    id: 13,
    question: "What is your cancellation policy?",
    answer:
      "Cancellation policies vary by vendor. Once you book a package, we’ll share the vendor’s cancellation terms with you.",
  },
  {
    id: 14,
    question: "How can I contact you for further assistance?",
    answer:
      "You can reach us via the 'Request Quote' button on our website, which connects you directly to our WhatsApp support team.",
  },
  {
    id: 15,
    question: "What if I need help choosing a package?",
    answer:
      "Our team is here to assist! Click 'Request Quote' and share your event details on WhatsApp. We’ll guide you to the best package for your needs.",
  },
  {
    id: 16,
    question: "Will you be adding more features in the future?",
    answer:
      "Yes! We plan to introduce individual rentals, additional categories, and an integrated app to make your event planning experience even smoother.",
  },
  {
    id: 17,
    question: "How can I stay updated on your services?",
    answer:
      "Follow us on social media or bookmark our website for the latest updates and offerings.",
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
