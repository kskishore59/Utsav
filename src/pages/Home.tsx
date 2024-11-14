import React from "react";
import { Link } from "react-router-dom";
import {
  Music,
  Lightbulb,
  PartyPopper,
  Trophy,
  // Ring is not exported from lucide-react
  Cake,
  Utensils,
  Mic,
  Camera,
  Gift,
  BellRingIcon,
  ArrowRight,
  PhoneCallIcon,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Create a reusable scroll animation component
function ScrollAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="space-y-20 mt-5">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
          <img
            src="landingpageimage.jpg"
            alt="Hero Background"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-screen min-h-[600px] flex-col justify-center">
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
                Premium Event Equipment Rentals
              </motion.p>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                <span className="block">Elevate your</span>
                <span className="block text-blue-400 bg-clip-text text-transparent">
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
                  to="/categories"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 transition-all hover:bg-gray-100"
                >
                  Browse Equipment
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="https://wa.me/916300996714"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Contact Us
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <PhoneCallIcon />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <ScrollAnimation>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Equipment Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategoryCard
              icon={<Music className="h-8 w-8" />}
              title="Sound Systems"
              description="Professional audio equipment for any venue size"
              image="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80"
              link="/category/sound"
            />
            <CategoryCard
              icon={<Lightbulb className="h-8 w-8" />}
              title="Lighting"
              description="Create the perfect atmosphere with our lighting solutions"
              image="https://images.unsplash.com/photo-1504509546545-e000b4a62425?auto=format&fit=crop&q=80"
              link="/category/lighting"
            />
            <CategoryCard
              icon={<PartyPopper className="h-8 w-8" />}
              title="Event Decor"
              description="Stunning decorations for any occasion"
              image="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80"
              link="/category/decor"
            />
          </div>
        </div>
      </ScrollAnimation>

      {/* Features */}
      <div className="bg-gray-50 py-16">
        <ScrollAnimation>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Why Choose Utsav
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Feature
                icon={<Trophy className="h-6 w-6" />}
                title="Premium Equipment"
                description="Top-quality, well-maintained equipment from leading brands"
              />
              <Feature
                icon={<PartyPopper className="h-6 w-6" />}
                title="Event Support"
                description="Technical support and setup assistance available"
              />
              <Feature
                icon={<Music className="h-6 w-6" />}
                title="Flexible Rental"
                description="Daily, weekly, and event-based rental options"
              />
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* View by Events Section */}
      <ScrollAnimation>
        <div className="py-12">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              View by Events
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4">
              <CategoryCard
                icon={<BellRingIcon className="h-8 w-8" />}
                title="Weddings"
                description="Complete wedding setup and decorations"
                image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"
                link="/events/wedding"
              />
              <CategoryCard
                icon={<Cake className="h-8 w-8" />}
                title="Birthday Parties"
                description="Make your birthday memorable"
                image="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80"
                link="/events/birthday"
              />
              <CategoryCard
                icon={<Utensils className="h-8 w-8" />}
                title="Corporate Events"
                description="Professional event solutions"
                image="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80"
                link="/events/corporate"
              />
              <CategoryCard
                icon={<Mic className="h-8 w-8" />}
                title="Concerts"
                description="Stage and sound setup for performances"
                image="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80"
                link="/events/concert"
              />
            </div>
          </div>

          {/* View by Categories Section */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-12">
              View by Categories
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4">
              <CategoryCard
                icon={<PartyPopper className="h-8 w-8" />}
                title="Event Decor"
                description="Stunning decorations for any occasion"
                image="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80"
                link="/category/decor"
              />
              <CategoryCard
                icon={<Music className="h-8 w-8" />}
                title="Sound Systems"
                description="Professional audio equipment"
                image="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80"
                link="/category/sound"
              />
              <CategoryCard
                icon={<Camera className="h-8 w-8" />}
                title="Lighting"
                description="Create the perfect ambiance"
                image="https://images.unsplash.com/photo-1504509546545-e000b4a62425?auto=format&fit=crop&q=80"
                link="/category/lighting"
              />
              <CategoryCard
                icon={<Gift className="h-8 w-8" />}
                title="Party Supplies"
                description="Everything you need for your event"
                image="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80"
                link="/category/supplies"
              />
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}

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
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <Link to={link} className="block">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
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
