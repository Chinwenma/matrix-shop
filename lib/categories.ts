// Define a type for a single category
export interface Category {
  name: string;
  slug: string;      
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    name: "Living Room",
    slug: "living-room",
    image: "/assets/chair1.png",
    description: "Cozy sofas, coffee tables & TV stands",
  },
  {
    name: "Bedroom",
    slug: "bedroom",
    image: "/assets/chair2.png",
    description: "Comfortable beds, wardrobes & nightstands",
  },
  {
    name: "Dining Room",
    slug: "dining-room",
    image: "/assets/chair3.png",
    description: "Stylish dining tables & chairs",
  },
  {
    name: "Office",
    slug: "office",
    image: "/assets/chair4.png",
    description: "Desks, chairs & storage for your workspace",
  },
  {
    name: "Outdoor",
    slug: "outdoor",
    image: "/assets/chair5.png",
    description: "Perfect sets for gardens & patios",
  },
  {
    name: "Kids Room",
    slug: "kids-room",
    image: "/assets/chair6.png",
    description: "Fun furniture for little ones",
  },
];
