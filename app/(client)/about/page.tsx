"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Target, HeartHandshake, Lightbulb } from "lucide-react";
import PageBanner from "../../components/banner/PageBanner";
import { image } from "framer-motion/client";

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero / Banner */}
      <PageBanner
        title="About Us"
        subtitle="Crafting Comfort and Style for Every Home"
        backgroundImage="/assets/chair1.png"
      />

      {/* Who We Are */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 py-16 px-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-teal-700 mb-4">Who We Are</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Matrix Shop is a modern furniture brand dedicated to bringing
            elegance, comfort, and durability into every space. From luxurious
            living room sets to minimalist office furniture, we craft each piece
            to blend timeless design with everyday functionality.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With a focus on quality materials and exceptional craftsmanship, we
            aim to make premium furniture accessible and inspiring — helping our
            customers create homes and workplaces they truly love.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/assets/chair4.jpg"
              alt="Matrix Shop Furniture"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <Target className="text-teal-700 w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-teal-700">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To design and deliver furniture that transforms spaces — combining
              comfort, beauty, and function. We believe every home deserves a
              touch of artistry and warmth that lasts for years.
            </p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <Lightbulb className="text-teal-700 w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-teal-700">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To be a leading furniture brand that redefines modern living
              through innovation, quality, and sustainability — making comfort
              and design accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-teal-700 mb-10"
        >
          Our Core Values
        </motion.h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: <HeartHandshake className="w-8 h-8 text-teal-700" />,
              title: "Integrity",
              desc: "We stand for honesty and reliability — from the materials we source to how we treat our customers.",
            },
            {
              icon: <Target className="w-8 h-8 text-teal-700" />,
              title: "Craftsmanship",
              desc: "Every detail matters. We take pride in creating pieces that showcase precision and skill.",
            },
            {
              icon: <Users className="w-8 h-8 text-teal-700" />,
              title: "Customer Focus",
              desc: "Your comfort is our goal. We listen, we care, and we deliver beyond expectations.",
            },
          ].map((val, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{val.icon}</div>
              <h4 className="font-semibold text-lg mb-2 text-teal-700">
                {val.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    

    </main>
  );
}
