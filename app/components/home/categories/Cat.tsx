"use client";

import { FC } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

interface Category {
  id: number;
  name: string;
  image: string;
  href?: string; // optional link to category page
}

const categories: Category[] = [
  { id: 1, name: "Living Room", image: "/assets/chair.jpg", href: "/categories/living-room" },
  { id: 2, name: "Bedroom", image: "/assets/chair10.jpg", href: "/categories/bedroom" },
  { id: 3, name: "Kitchen", image: "/assets/chair9.jpg", href: "/categories/kitchen" },
  { id: 4, name: "Dining", image: "/assets/chair8.jpg", href: "/categories/dining" },
  { id: 5, name: "Office", image: "/assets/chair7.jpg", href: "/categories/office" },
  { id: 6, name: "Outdoor", image: "/assets/chair6.jpg", href: "/categories/outdoor" },
];

const CategoriesCarousel: FC = () => {
  const handleCategoryClick = (category: Category) => {
    // Example action: navigate or filter. Replace with router.push(category.href) if using next/navigation
    console.log("selected category:", category.name, category.href);
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>

          <div className="hidden md:flex space-x-3">
            <button className="category-prev border rounded-full p-2 hover:bg-gray-100 transition" aria-label="previous categories">←</button>
            <button className="category-next border rounded-full p-2 hover:bg-gray-100 transition" aria-label="next categories">→</button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ nextEl: ".category-next", prevEl: ".category-prev" }}
          autoplay={{ delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 6 } }}
          className="pb-6"
        >
          {categories.map((category: Category) => (
            <SwiperSlide key={category.id}>
              {/* mapping explicit: category */}
              <button
                type="button"
                onClick={() => handleCategoryClick(category)}
                aria-label={`Open ${category.name} category`}
                className="w-full flex flex-col items-center bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition"
                role="group"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border border-gray-200">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    priority={false}
                  />
                </div>

                <span className="text-sm font-medium text-gray-800">{category.name}</span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoriesCarousel;
