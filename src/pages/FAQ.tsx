import { useState } from "react";
import { Section } from "../components/ui/Section";
import { motion } from "framer-motion";
import { AccordionItem } from "../components/ui/Accordion";

const FAQData = [
  {
    id: 1,
    question: "Who are we and what do we do?",
    answer:
      "We’re your ultimate event rental platform, connecting you with top-tier vendors for all your celebration needs! From dazzling lighting to immersive sound systems, we make renting high-quality gear a breeze—all in one stylish spot.",
  },
  {
    id: 2,
    question: "What types of events do you cater to?",
    answer:
      "We cater to every occasion! Whether it's a dreamy wedding, corporate gala, fun birthday bash, or vibrant cultural festivities, our diverse packages fit every celebration, big or small.",
  },
  {
    id: 3,
    question: "Why choose Utsav?",
    answer:
      "We simplify your event planning with verified vendors, budget-friendly pricing, and customizable packages tailored just for you. Let’s make your event unforgettable!",
  },
  {
    id: 4,
    question: "What kind of packages do you offer?",
    answer:
      "Our packages are crafted for various events, featuring essentials like stunning lighting, powerful sound systems, stage setups, and beautiful decorations. Each package is fully customizable to match your vision!",
  },
  {
    id: 5,
    question: "Can I rent individual items instead of a package?",
    answer:
      "Currently, we focus on fabulous packages to ensure a smooth and cost-effective experience. Stay tuned for more options in the future!",
  },
  {
    id: 6,
    question: "How can I find out the pricing for the packages?",
    answer:
      "Finding the best prices is easy! Click the 'Book Now' button on your desired package, and you’ll be directed to WhatsApp, where our team will assist you with pricing and customization.",
  },
  {
    id: 7,
    question: "How does the booking process work?",
    answer:
      "Booking your dream event package is a breeze: Browse our packages, select the one that speaks to you, click 'Book Now' to chat with us on WhatsApp, share your event details, and we’ll handle the rest!",
  },
  {
    id: 8,
    question: "How early should I book my package?",
    answer:
      "To ensure you get everything you want, we recommend booking at least 2-3 weeks in advance. Let’s secure your spot and make magic happen!",
  },
  {
    id: 9,
    question: "Who handles the delivery and setup?",
    answer:
      "Our amazing vendor partners take care of all delivery and setup, ensuring everything is perfectly ready for your event. You just enjoy the celebration!",
  },
  {
    id: 10,
    question: "What about payment options?",
    answer:
      "Payments can be made online or via bank transfer once you confirm your quote and booking details. Easy peasy!",
  },
  {
    id: 11,
    question: "What is your cancellation policy?",
    answer:
      "Cancellation policies vary by vendor. Once you book, we’ll provide you with the vendor’s cancellation terms to keep you informed.",
  },
  {
    id: 12,
    question: "How can I contact you for further assistance?",
    answer:
      "Need help? Click the 'Chat with us' button on our website, and connect directly with our friendly WhatsApp support team!",
  },
  {
    id: 13,
    question: "What if I need help choosing a package?",
    answer:
      "We’re here for you! Click 'Book a call' and share your event details on WhatsApp. Our team will guide you to the perfect package for your celebration.",
  },
  {
    id: 14,
    question: "Will you be adding more features in the future?",
    answer:
      "Absolutely! We’re excited to roll out individual rentals, new categories, and an integrated app to enhance your event planning experience even further.",
  },
  {
    id: 15,
    question: "How can I stay updated on your services?",
    answer:
      "Follow us on social media or bookmark our website for the latest updates, offers, and all things fabulous!",
  },
  {
    id: 16,
    question: "Why are your prices higher than other event planners?",
    answer:
      "Our prices reflect the premium quality of service we provide. Investing in high-quality services leads to unforgettable celebrations.",
  },
  {
    id: 17,
    question: "How do you select your vendors?",
    answer:
      "We collaborate with a curated list of carefully selected vendors who meet our high standards, ensuring you receive the best service for your event.",
  },
  {
    id: 18,
    question: "What if I have concerns or questions?",
    answer:
      "Our dedicated team is here to assist you! If you have any inquiries or concerns, please reach out, and we’ll do our best to address them.",
  },
  {
    id: 19,
    question: "How can I provide feedback?",
    answer:
      "We value your feedback greatly! Please share your thoughts with us so we can improve and enhance our services.",
  },
  {
    id: 20,
    question: "How do I get started with Utsav?",
    answer:
      "Simply visit our website, explore our event packages, and reach out to our team to begin planning your next unforgettable celebration!",
  },
];

// const welcomeText =
//   "Welcome to Utsav, where we redefine event planning! Our mission is to make organizing unforgettable celebrations a breeze without compromising on quality or flair. Choose from our customizable event packages that cover everything from sound & visuals to decor, photography, transportation, artists, and supporting staff. While our prices reflect the premium quality of our services, once you experience Utsav, you’ll keep coming back for more! We carefully select a limited number of trusted vendors to ensure the best service and seamless coordination. Enjoy your special moments with family and friends while we handle the rest. Your satisfaction is our top priority, and we welcome your feedback to help us grow and improve. Let's make your next event magical together!";

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
