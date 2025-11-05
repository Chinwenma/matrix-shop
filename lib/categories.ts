// Define a type for a single category
export interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

// Define the categories array using the Category type
export const categories: Category[] = [
  {
    id: 1,
    name: "Living Room",
    image: "/assets/chair1.png",
    description: "Cozy sofas, coffee tables & TV stands",
  },
  {
    id: 2,
    name: "Bedroom",
    image: "/assets/chair1.png",
    description: "Comfortable beds, wardrobes & nightstands",
  },
  {
    id: 3,
    name: "Dining Room",
    image: "/assets/chair1.png",
    description: "Stylish dining tables & chairs",
  },
  {
    id: 4,
    name: "Office",
    image: "/assets/chair1.png",
    description: "Desks, chairs & storage for your workspace",
  },
  {
    id: 5,
    name: "Outdoor",
    image: "/assets/chair1.png",
    description: "Perfect sets for gardens & patios",
  },
  {
    id: 6,
    name: "Kids Room",
    image: "/assets/chair1.png",
    description: "Fun furniture for little ones",
  },
];
