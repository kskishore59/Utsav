import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck2,
  CameraIcon,
  CheckCircle,
  Clock,
  Headphones,
  Lightbulb,
  ListChecksIcon,
  MessageCircle,
  Music,
  PartyPopper,
  Shield,
  Trophy,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FeedbackButton from "../components/FeedbackButton";
import LazyImage from "../components/LazyImage";
import ConsultationForm from "../components/ConsultationForm";

// Create a reusable scroll animation component
function ScrollAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    threshold: 0.4, // Triggers when 20% of element is in view
    margin: "0px 0px -50px 0px", // Negative margin to trigger earlier
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }} // Reduced initial movement
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1], // Custom easing
                staggerChildren: 0.1, // If you have multiple children
              },
            }
          : {
              opacity: 0,
              y: 20,
            }
      }
      className="will-change-transform" // Performance optimization
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-20 mt-6">
      {/* Hero Section */}
      <section className="relative h-screen  min-h-[600px] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
          <img
            src="event-two.jpeg"
            alt="Hero Background"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-screen min-h-[600] flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-6 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
              >
                Event Equipment Rentals
              </motion.p>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                <span className="block">Elevate your</span>
                <span className="block text-blue-400 bg-clip-text">
                  Events with us
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mb-8 text-lg text-gray-300 sm:text-xl"
              >
                Transform your event with our professional-grade equipment. From
                sound systems to lighting, we've got everything you need to
                create unforgettable experiences.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/events"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 transition-all hover:bg-gray-100"
                >
                  Browse Events
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={() => setIsFormOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-full bg-white/10 
                           px-8 py-4 text-base font-semibold text-white backdrop-blur-sm 
                           transition-all hover:bg-white/20"
                >
                  Book a free call
                  <MessageCircle className="h-5 w-5" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <ScrollAnimation>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Package Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategoryCard
              icon={<PartyPopper className="h-8 w-8" />}
              title="Event Decor"
              description="Stunning decorations for any occasion"
              image="https://myutsav.s3.ap-south-1.amazonaws.com/Reception-image-4.jpg"
              link="/category/decor"
            />
            <CategoryCard
              icon={<CameraIcon className="h-8 w-8" />}
              title="Photography"
              description="Capture your moments with our professional photography services"
              image="/Photography-main-image-2.jpg"
              link="/category/photography"
            />
            <CategoryCard
              icon={<Music className="h-8 w-8" />}
              title="Sound Systems"
              description="Professional audio equipment for any venue size"
              image="AI-Generated-Image.jpeg"
              link="/category/sound"
            />
            <CategoryCard
              icon={<Lightbulb className="h-8 w-8" />}
              title="Lighting"
              description="Create the perfect atmosphere with our lighting solutions"
              image="sharpies-two.jpg"
              link="/category/light"
            />

            <CategoryCard
              icon={<ListChecksIcon className="h-8 w-8" />}
              title="View All Categories"
              description=""
              image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"
              link="/category"
            />
            <CategoryCard
              icon={<CalendarCheck2 className="h-8 w-8" />}
              title="View All Events"
              description=""
              image="/event-two.jpeg"
              link="/events"
            />
          </div>
        </div>
      </ScrollAnimation>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose Utsav?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              We have thoroughly researched and verified vendors and their
              products, removing the hassle of finding reliable partners. As a
              premier event equipment rental platform, we offer
              professional-grade equipment and seamless service to elevate your
              celebrations to the next level.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<Trophy className="h-6 w-6" />}
              title="Premium Equipment Collection"
              description="Access to high-end sound systems, professional lighting, and premium event gear. All equipment is meticulously maintained and tested before each rental."
            />
            <Feature
              icon={<PartyPopper className="h-6 w-6" />}
              title="Complete Event Solutions"
              description="From traditional ceremonies to modern celebrations, we provide comprehensive technical support, professional setup, and on-site assistance to ensure your event runs flawlessly."
            />
            <Feature
              icon={<Music className="h-6 w-6" />}
              title="Customizable Packages"
              description="Flexible rental options tailored to your needs - whether it's a small gathering or a grand celebration. Choose from hourly, daily, or event-based packages."
            />
            <Feature
              icon={<Headphones className="h-6 w-6" />}
              title="Expert Consultation"
              description="Our experienced team provides personalized recommendations to help you choose the perfect equipment setup for your event type, venue size, and budget."
            />
            <Feature
              icon={<Clock className="h-6 w-6" />}
              title="Reliable Service"
              description="Punctual delivery, professional installation, and prompt support throughout your event. We ensure everything works perfectly so you can focus on your celebration."
            />
            <Feature
              icon={<Shield className="h-6 w-6" />}
              title="Quality Assured"
              description="Every piece of equipment undergoes rigorous quality checks. We provide backup equipment for critical components ensuring uninterrupted events."
            />
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Your One-Stop Event Equipment Solution
              </h3>
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                Utsav caters to all types of events across India, from intimate
                family gatherings to large-scale corporate events. Our platform
                simplifies the rental process with:
              </p>
              <ul className="flex-col items-center max-w-2xl mx-auto space-y-4 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>
                    Easy online booking system with real-time availability
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>Transparent pricing with no hidden charges</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>Customer support for immediate assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* View by Events Section */}

      {/* <ContactForm /> */}
      <FeedbackButton />

      <ConsultationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (isMobile: boolean) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: isMobile ? 0.3 : 0.5,
      ease: "easeOut",
    },
  }),
  hover: (isMobile: boolean) => ({
    scale: isMobile ? 1 : 1.02,
    transition: {
      duration: 0.2,
    },
  }),
};

function CategoryCard({
  icon,
  title,
  description,
  image,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  link: string;
}) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isInView = useInView(ref, {
    once: true,
    threshold: 0.2,
    margin: "0px 0px -50px 0px",
  });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      custom={isMobile}
      className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all will-change-transform"
    >
      <Link to={link} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <LazyImage
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-1000group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 w-full p-6 text-white">
          <div className="mb-2 flex items-center">
            <div className="mr-3 rounded-full bg-white/20 p-2 backdrop-blur-sm">
              {icon}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-sm text-white/80">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
    </motion.div>
  );
}
