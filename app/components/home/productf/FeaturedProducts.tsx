"use client";

import { FC } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const products = [
  { id: 1, title: "Library Stool Chair", price: 20, image: "/assets/chair1.jpg", badge: "New" },
  { id: 2, title: "Library Stool Chair", price: 20, oldPrice: 30, image: "/assets/chair2.jpg", badge: "Sales" },
  { id: 3, title: "Library Stool Chair", price: 20, image: "/assets/chair3.jpg" },
  { id: 4, title: "Library Stool Chair", price: 20, image: "/assets/chair4.jpg" },
  { id: 5, title: "Library Stool Chair", price: 20, image: "/assets/chair5.jpg" },
];

const FeaturedProducts: FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>

          {/* Arrows – visible only on md+ */}
          <div className="hidden md:flex space-x-3">
            <button className="featured-prev border rounded-full p-2 hover:bg-gray-100 transition">←</button>
            <button className="featured-next border rounded-full p-2 hover:bg-gray-100 transition">→</button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".featured-next",
            prevEl: ".featured-prev",
          }}
          autoplay={{
            delay: 10000, // 10 seconds
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-8"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white shadow-sm rounded-lg overflow-hidden relative group h-full flex flex-col justify-between">
                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 text-xs text-white px-2 py-1 rounded ${
                      product.badge === "New" ? "bg-green-600" : "bg-orange-500"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Wishlist */}
                <button className="absolute top-3 right-3 bg-white rounded-full p-1 shadow hover:text-teal-600 transition">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Image */}
                <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-4 flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-700">{product.title}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${product.price}
                      {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through ml-1">
                          ${product.oldPrice}
                        </span>
                      )}
                    </p>
                  </div>

                  <button className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedProducts;
