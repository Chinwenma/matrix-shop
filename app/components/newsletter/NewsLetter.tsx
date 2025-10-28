"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Newsletter() {
  return (
    <section className="bg-[#1e5d88] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          Subscribe to our newsletter
        </h2>

        {/* Description */}
        <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et cursus. 
          Donec non quam urna. Quisque vitae porta ipsum.
        </p>

        {/* Email Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full px-4 py-3 rounded-md text-white text-sm  focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md text-sm font-medium flex items-center gap-2 transition"
          >
            SUBSCRIBE <ArrowRight className="w-4 h-4" />
          </button>
        </form>

       
      </div>
    </section>
  );
}
