"use client";

import { FC } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Package,
  Truck,
  Headset,
  Shield,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "../btn/Button";

const Hero: FC = () => {
  const slides = [
    { id: 1, src: "/assets/chair1.png", discount: "54%" },
    { id: 2, src: "/assets/chair2.png", discount: "40%" },
    { id: 3, src: "/assets/chair3.png", discount: "30%" },
  ];

  const bottomInfo = [
    {
      id: 1,
      icon: <Package className="text-teal-600 mb-1" />,
      title: "Discount",
      subtitle: "Every week new sales",
    },
    {
      id: 2,
      icon: <Truck className="text-teal-600 mb-1" />,
      title: "Free Delivery",
      subtitle: "100% Free for all orders",
    },
    {
      id: 3,
      icon: <Headset className="text-teal-600 mb-1" />,
      title: "Great Support 24/7",
      subtitle: "We care your experiences",
    },
    {
      id: 4,
      icon: <Shield className="text-teal-600 mb-1" />,
      title: "Secure Payment",
      subtitle: "100% Secure Payment Method",
    },
  ];

  return (
    <section className="relative bg-[#E1E3E5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="max-w-lg text-center lg:text-left">
          <p className="text-sm tracking-widest text-gray-500 uppercase mb-2">
            Welcome to Matrix Shop
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-5">
            Best Furniture Collection For Your Interior.
          </h1>
          <Button variant="primary">
            Shop Now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Right Slider */}
        <div className="relative w-full lg:w-1/2">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            className="rounded-xl"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative flex justify-center items-center h-[220px] sm:h-[260px] md:h-[300px] lg:h-[350px]">
                  <Image
                    src={slide.src}
                    alt="Chair Product"
                    fill
                    className="object-contain rounded-xl"
                    priority
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-white rounded-full shadow-md w-16 h-16 flex flex-col justify-center items-center text-center">
                    <p className="text-red-600 font-bold text-base">
                      {slide.discount}
                    </p>
                    <span className="text-[10px] text-gray-600">Discount</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-200 transition">
            <ArrowLeft className="w-4 h-4 text-teal-700" />
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-200 transition">
            <ArrowRight className="w-4 h-4 text-teal-700" />
          </button>
        </div>
      </div>

      {/* ✅ Bottom Info Mapped */}
      <div className="max-w-5xl mx-auto -mt-8 mb-8 bg-white shadow-md rounded-2xl py-4 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {bottomInfo.map((item) => (
          <div key={item.id} className="flex flex-col items-center text-sm">
            {item.icon}
            <p className="font-medium text-gray-800">{item.title}</p>
            <span className="text-gray-500 text-xs">{item.subtitle}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
