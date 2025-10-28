"use client";

import Image from "next/image";
import { FC } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  overlayOpacity?: string; // Optional for dark overlay control
}

const PageBanner: FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = "bg-black/50",
}) => {
  return (
    <section className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`}></div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 text-white max-w-2xl"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-3">{title}</h1>
        {subtitle && (
          <p className="text-base md:text-lg opacity-90">{subtitle}</p>
        )}
      </motion.div>
    </section>
  );
};

export default PageBanner;
