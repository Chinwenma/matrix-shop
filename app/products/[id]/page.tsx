"use client";
// import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Star} from "lucide-react";
import Button from "@/app/components/btn/Button";
const productData = {
  id: 1,
  title: "Grey Acid Wash Wide Leg Jogger",
  price: 215,
  oldPrice: 290,
  rating: 4.5,
  reviews: 212,
  color: "Black",
  images: [
    "/assets/chair1.jpg",
    "/assets/chair2.jpg",
    "/assets/chair3.jpg",
    "/assets/chair4.jpg",
  ],
  sizes: ["6", "8", "10", "12", "14", "16"],
  description: `
    Step into a realm of unparalleled off-duty style with these grey acid wash joggers that effortlessly marry fashion with comfort. 
    Crafted for those committed to style even on their easy days, these joggers feature a chic cinching waist and a wide leg cut.
  `,
  details: [
    "Denim joggers",
    "Acid wash finish",
    "Wide leg cut",
    "Model wears UK 8 / EU 38 / US 6",
  ],
};

export default function ProductDetails() {
  // const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);

  return (
    <main>

      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        {/* Left: Image gallery */}
        <div>
          <div className="w-full h-[450px] bg-gray-100 rounded-md overflow-hidden mb-4">
            <Image
              src={selectedImage}
              alt={productData.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {productData.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`border rounded-md overflow-hidden ${
                  selectedImage === img ? "border-teal-600" : "border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i}`}
                  width={100}
                  height={100}
                  className="object-cover w-full h-24"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {productData.title}
          </h1>

          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < Math.floor(productData.rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {productData.rating} ({productData.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <p className="text-2xl font-bold text-teal-600">
              ${productData.price.toFixed(2)}
            </p>
            <p className="text-gray-400 line-through text-lg">
              ${productData.oldPrice.toFixed(2)}
            </p>
          </div>

         

          <div className="flex items-center space-x-3 mb-6">
            <Button>Add to Cart</Button>
       
          </div>

          <p className="text-gray-600 mb-6">{productData.description}</p>

          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {productData.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>

    </main>
  );
}
