"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";
import Button from "@/app/components/btn/Button";
import { products } from "@/lib/products";

export default function ProductDetails() {
  const { id } = useParams();
const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600">
        <p>Product not found.</p>
      </div>
    );
  }



const [selectedImage, setSelectedImage] = useState(product.images[0]);



  return (
    <main className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Left: Image gallery */}
      <div>
        <div className="w-full h-[450px] bg-gray-100 rounded-md overflow-hidden mb-4">
          <Image
            src={selectedImage}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-4 gap-3">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`border rounded-md overflow-hidden ${
                selectedImage === img ? "border-red-600" : "border-gray-300"
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
          {product.name}
        </h1>
        <p className="text-gray-500 mb-2">{product.brand}</p>
{/* 
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`${
                i < Math.floor(product.rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {productDetails.rating} ({productDetails.reviews} reviews)
          </span>
        </div> */}

        <div className="flex items-center space-x-3 mb-4">
          <p className="text-2xl font-bold text-red-600">
            ${product.price.toFixed(2)}
          </p>
          {product.oldPrice && (
            <p className="text-gray-400 line-through text-lg">
              ${product.oldPrice.toFixed(2)}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <Button>Add to Cart</Button>
        </div>

        <p className="text-gray-600 mb-6">{product.description }</p>

        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {product.details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
