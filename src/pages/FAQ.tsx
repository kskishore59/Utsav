import { useState } from "react";
import { Section } from "../components/ui/Section";
import { motion } from "framer-motion";
import { AccordionItem } from "../components/ui/Accordion";

const FAQData = [
  {
    id: 1,
    question: "Who are we, and what do we do?",
    answer:
      "We’re your go-to event rental platform, connecting you with top-notch vendors for all your celebration needs! From dazzling lighting to immersive sound systems, we make renting high-quality gear a breeze, all in one stylish spot.",
  },
  {
    id: 2,
    question: "What types of events do you cater to?",
    answer:
      "We’ve got you covered for every occasion! Whether it’s a dreamy wedding, a corporate gala, a fun birthday bash, or vibrant cultural festivities, our diverse packages fit every celebration, big or small.",
  },
  {
    id: 3,
    question: "Why choose us?",
    answer:
      "We simplify your event planning with verified vendors, budget-friendly pricing, a seamless booking experience, and customizable packages tailored just for you. Let’s make your event unforgettable!",
  },
  {
    id: 4,
    question: "What kind of packages do you offer?",
    answer:
      "Our packages are crafted for various events, featuring essentials like stunning lighting, powerful sound systems, stage setups, and beautiful decorations. Plus, each package is fully customizable to match your vision!",
  },
  {
    id: 5,
    question: "Can I rent individual items instead of a package?",
    answer:
      "Right now, we’re all about those fabulous packages to ensure a smooth and cost-effective experience. But stay tuned—more options are on the horizon!",
  },
  {
    id: 6,
    question: "How can I find out the pricing for the packages?",
    answer:
      "Getting the best prices is easy! Just hit the 'Book Now' button on your desired package, and you’ll be whisked away to WhatsApp, where our team will assist you with pricing and customization options.",
  },
  {
    id: 7,
    question: "How does the booking process work?",
    answer:
      "Booking your dream event package is a breeze: Browse our fabulous packages, select the one that speaks to you, click 'Book Now' to chat with us on WhatsApp, share your event details, and we’ll handle the rest!",
  },
  {
    id: 8,
    question: "Can I customize the packages?",
    answer:
      "Absolutely! We love making your vision come to life. Just let us know your preferences when you reach out via WhatsApp, and we’ll tailor the package to fit your needs.",
  },
  {
    id: 9,
    question: "How early should I book my package?",
    answer:
      "To ensure you get everything you want, we recommend booking at least 2-3 weeks in advance. Let’s secure your spot and make magic happen!",
  },
  {
    id: 10,
    question: "Who handles the delivery and setup of the materials?",
    answer:
      "Our amazing vendor partners take care of all the delivery and setup, ensuring everything is perfectly ready for your event. You just enjoy the celebration!",
  },
  {
    id: 11,
    question: "Is there an additional charge for delivery and setup?",
    answer:
      "Delivery and setup charges vary based on your package and location. We’ll share all the details during your quote discussion on WhatsApp.",
  },
  {
    id: 12,
    question: "How do I make a payment?",
    answer:
      "Payments can be made online or via bank transfer once you confirm your quote and booking details. Easy peasy!",
  },
  {
    id: 13,
    question: "What is your cancellation policy?",
    answer:
      "Cancellation policies differ by vendor. Once you book, we’ll provide you with the vendor’s cancellation terms to keep you informed.",
  },
  {
    id: 14,
    question: "How can I contact you for further assistance?",
    answer:
      "Need help? Just click the 'Chat with us' button on our website, and you’ll connect directly with our friendly WhatsApp support team!",
  },
  {
    id: 15,
    question: "What if I need help choosing a package?",
    answer:
      "We’re here for you! Click 'Book a call' and share your event details on WhatsApp. Our team will guide you to the perfect package for your celebration.",
  },
  {
    id: 16,
    question: "Will you be adding more features in the future?",
    answer:
      "Absolutely! We’re excited to roll out individual rentals, new categories, and an integrated app to enhance your event planning experience even further.",
  },
  {
    id: 17,
    question: "How can I stay updated on your services?",
    answer:
      "Follow us on social media or bookmark our website for the latest updates, offers, and all things fabulous!",
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
          <h1 className="text-3xl font-bold text-center mb-2 font-poppins">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-center mb-8 font-poppins">
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
