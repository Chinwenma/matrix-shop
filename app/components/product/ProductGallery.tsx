"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selectedImage, setSelectedImage] = useState(images?.[0] || "/placeholder.jpg");

  return (
    <div>
      <div className="w-full h-[450px] bg-gray-100 rounded-md overflow-hidden mb-4">
        <Image
          src={selectedImage}
          alt={name}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      {images && images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
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
      )}
    </div>
  );
}
