"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ChevronDown } from "lucide-react";
import PageBanner from "../components/banner/PageBanner";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes 3–7 business days depending on your location.",
  },
  {
    question: "Can I return an item?",
    answer:
      "Yes, items can be returned within 14 days of purchase provided they are unused and in original condition.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we only ship within Nigeria, but international shipping is coming soon!",
  },
  {
    question: "Do you offer custom furniture?",
    answer:
      "Yes! You can request personalized furniture designs or materials. Our craftsmen will bring your vision to life.",
  },
];

export default function ContactPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="bg-white text-gray-800">
      {/* Header */}
      <PageBanner
        title="Contact Us"
        backgroundImage="/assets/chair2.jpg"
        subtitle="We’d love to hear from you. Get in touch or send us a message!"
      />

      {/* Contact Info + Form */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 py-16 px-6">
        {/* Left - Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#1e5d88]">
            Get In Touch
          </h2>
          <p className="text-gray-600">
            Our team is here to help. Whether you have questions about our
            products, pricing, or anything else, we’re ready to assist.
          </p>

          <div className="space-y-4">
            <ContactInfo
              icon={<MapPin className="text-[#1e5d88]" />}
              title="Address"
              text="123 Modern Street, Enugu, Nigeria"
            />
            <ContactInfo
              icon={<Phone className="text-[#1e5d88]" />}
              title="Phone"
              text="+234 800 123 4567"
            />
            <ContactInfo
              icon={<Mail className="text-[#1e5d88]" />}
              title="Email"
              text="info@verbumnetworks.com"
            />
            <ContactInfo
              icon={<Clock className="text-[#1e5d88]" />}
              title="Working Hours"
              text="Mon - Fri: 9:00 AM - 5:00 PM"
            />
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => e.preventDefault()}
          className="bg-gray-50 p-8 rounded-2xl shadow-md space-y-5"
        >
          <h3 className="text-xl font-semibold text-[#1e5d88] mb-4">
            Send us a Message
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-[#1e5d88] outline-none"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-[#1e5d88] outline-none"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 px-4 py-3 w-full rounded-md focus:ring-2 focus:ring-[#1e5d88] outline-none"
            required
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="border border-gray-300 px-4 py-3 w-full rounded-md focus:ring-2 focus:ring-[#1e5d88] outline-none resize-none"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#1e5d88] hover:bg-[#2a7ab1] text-white px-6 py-3 rounded-md font-semibold transition-transform hover:scale-105 shadow-md"
          >
            Send Message
          </button>
        </motion.form>
      </section>

      {/* Map */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden shadow-md"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.706376019331!2d7.5086!3d6.459964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044a245c9c7f63d%3A0x9a95c11a918ea74b!2sEnugu%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1699713928651!5m2!1sen!2sng"
            width="100%"
            height="400"
            loading="lazy"
          ></iframe>
        </motion.div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-[#1e5d88] mb-10">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left"
                >
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[#1e5d88]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 text-gray-600 text-sm leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- Reusable Info Box --- */
function ContactInfo({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
      <div className="w-10 h-10 bg-[#1e5d88]/10 flex items-center justify-center rounded-full">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-gray-600 text-sm">{text}</p>
      </div>
    </div>
  );
}
