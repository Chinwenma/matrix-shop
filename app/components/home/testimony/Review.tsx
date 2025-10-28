"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kristin Watson",
    role: "Fashion Designer",
    image: "/assets/chair1.jpg",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet mi nec massa tincidunt blandit et eu sem. Maecenas laoreet ultrices diam dignissim posuere. Aenean ultrices dui at ipsum sagittis, pharetra lacinia dui faucibus.",
  },
  {
    id: 2,
    name: "Esther Howard",
    role: "Fashion Designer",
    image: "/assets/chair2.jpg",
    quote:
      "Nullam sapien elit, dignissim eu viverra et, scelerisque et felis. Aliquam egestas dui elit, quis tincidunt lacus aliquam et. Duis nulla velit, dignissim ut odio ac, eleifend luctus leo.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            What Client Says About Us
          </h2>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
          autoplay={{
            delay: 15000, // 15 seconds
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="pb-10"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 h-full flex flex-col justify-between">
                <p className="text-gray-600 leading-relaxed mb-6">
                  “{t.quote}”
                </p>

                <div className="flex items-center">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-800">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>

                <div className="text-gray-200 text-6xl self-end font-serif -mt-8">
                  ”
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
