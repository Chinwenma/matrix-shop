"use client";

import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-[#2b2541] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          🎉 Big Discount Sale — Up to{" "}
          <span className="text-orange-400">50% Off!</span>
        </h2>

        {/* Description */}
        <p className="text-white/90 text-sm md:text-base mb-8 leading-relaxed">
          For a limited time only, enjoy massive discounts on all our premium
          furniture collections. Don’t miss your chance to save big — sale ends soon!
        </p>

        {/* Call to Action Button */}
        <div className="flex justify-center">
          <button
            onClick={() => (window.location.href = "/shop")} // change link as needed
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md text-sm font-semibold flex items-center gap-2 transition-transform hover:scale-105 shadow-lg hover:shadow-orange-500/30"
          >
            Shop Now! <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
