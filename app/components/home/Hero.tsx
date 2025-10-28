"use client";

import { FC } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Package, Truck, Headset, Shield } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero: FC = () => {
  const slides = [
    { id: 1, src: "/assets/chair1.png", discount: "54%" },
    { id: 2, src: "/assets/chair2.png", discount: "40%" },
    { id: 3, src: "/assets/chair3.png", discount: "30%" },
  ];

  return (
    <section className="relative bg-[#E1E3E5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="max-w-lg text-center lg:text-left">
          <p className="text-sm tracking-widest text-gray-500 uppercase mb-2">
            Welcome to Chairy
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-5">
            Best Furniture Collection For Your Interior.
          </h1>
          <button className="inline-flex items-center bg-teal-600 text-white px-5 py-2.5 rounded-md hover:bg-teal-700 transition">
            Shop Now <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>

        {/* Right Slider (Reduced Height) */}
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
                    <p className="text-red-600 font-bold text-base">{slide.discount}</p>
                    <span className="text-[10px] text-gray-600">Discount</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-teal-600 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-teal-600 hover:text-white transition">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="max-w-5xl mx-auto -mt-8 bg-white shadow-md rounded-2xl py-4 px-6 flex flex-wrap justify-between items-center text-center gap-5">
        <div className="flex flex-col items-center text-sm">
          <Package className="text-teal-600 mb-1" />
          <p className="font-medium text-gray-800">Discount</p>
          <span className="text-gray-500 text-xs">Every week new sales</span>
        </div>
        <div className="flex flex-col items-center text-sm">
          <Truck className="text-teal-600 mb-1" />
          <p className="font-medium text-gray-800">Free Delivery</p>
          <span className="text-gray-500 text-xs">100% Free for all orders</span>
        </div>
        <div className="flex flex-col items-center text-sm">
          <Headset className="text-teal-600 mb-1" />
          <p className="font-medium text-gray-800">Great Support 24/7</p>
          <span className="text-gray-500 text-xs">We care your experiences</span>
        </div>
        <div className="flex flex-col items-center text-sm">
          <Shield className="text-teal-600 mb-1" />
          <p className="font-medium text-gray-800">Secure Payment</p>
          <span className="text-gray-500 text-xs">100% Secure Payment Method</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;






















































// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// const HeroSection = () => {
//   const images = [
//     "/image5.png",
//     "/image2.png",
//     "/image3.png",
//     "/image4.png",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // Change image every 3 seconds
//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <section className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-24 py-12 bg-gray-50">
//       <div className="max-w-xl text-center lg:text-left">
//         <h1 className="text-4xl font-bold mb-4 text-gray-800">
//           Empowering the Next Generation of Tech Experts
//         </h1>
//         <p className="text-lg text-gray-600 mb-6">
//           Join our community of learners and take the next step in your tech journey.
//         </p>
//         <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
//           Get Started
//         </button>
//       </div>

//       <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
//         <div className="relative w-[400px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
//           <Image
//             src={images[currentIndex]}
//             alt="Hero"
//             fill
//             priority
//             className="object-cover transition-opacity duration-700 ease-in-out"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
