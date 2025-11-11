export interface OrderItem {
  name: string;
  qty: number;
}

export interface Order {
  date: string;
  total: number; // changed to number for Prisma
  status: "Delivered" | "Pending" | "Canceled";
  items: OrderItem[];
}

export const orders: Order[] = [
  {
    date: "2025-11-02",
    total: 450,
    status: "Delivered",
    items: [
      { name: "Classic Leather Sofa", qty: 1 },
      { name: "Glass Center Table", qty: 1 },
    ],
  },
  {
    date: "2025-11-04",
    total: 190,
    status: "Pending",
    items: [{ name: "Scandinavian Armchair", qty: 1 }],
  },
  {
    date: "2025-10-28",
    total: 280,
    status: "Canceled",
    items: [{ name: "Upholstered Nightstand", qty: 2 }],
  },
  {
    date: "2025-11-01",
    total: 260,
    status: "Delivered",
    items: [
      { name: "Rustic Bookshelf", qty: 1 },
      { name: "Velvet Lounge Chair", qty: 1 },
    ],
  },
  {
    date: "2025-11-03",
    total: 210,
    status: "Pending",
    items: [{ name: "Minimalist Study Desk", qty: 1 }],
  },
  {
    date: "2025-10-30",
    total: 620,
    status: "Delivered",
    items: [{ name: "Oak Dining Set", qty: 1 }],
  },
  {
    date: "2025-11-05",
    total: 420,
    status: "Pending",
    items: [{ name: "Modern Office Desk", qty: 1 }],
  },
  {
    date: "2025-10-29",
    total: 275,
    status: "Canceled",
    items: [{ name: "Glass Center Table", qty: 1 }],
  },
  {
    date: "2025-11-06",
    total: 180,
    status: "Delivered",
    items: [{ name: "Soft Lounge Ottoman", qty: 1 }],
  },
  {
    date: "2025-11-07",
    total: 620,
    status: "Pending",
    items: [
      { name: "Classic Leather Sofa", qty: 1 },
      { name: "Velvet Accent Chair", qty: 1 },
    ],
  },
  {
    date: "2025-10-27",
    total: 450,
    status: "Delivered",
    items: [
      { name: "Round Dining Table", qty: 1 },
      { name: "Modern Wooden Chair", qty: 4 },
    ],
  },
  {
    date: "2025-11-08",
    total: 260,
    status: "Pending",
    items: [{ name: "Rustic Bookshelf", qty: 1 }],
  },
  {
    date: "2025-11-02",
    total: 320,
    status: "Delivered",
    items: [{ name: "Velvet Lounge Chair", qty: 1 }],
  },
  {
    date: "2025-11-03",
    total: 330,
    status: "Canceled",
    items: [{ name: "Velvet Accent Chair", qty: 1 }],
  },
  {
    date: "2025-11-04",
    total: 380,
    status: "Delivered",
    items: [{ name: "Scandinavian Armchair", qty: 2 }],
  },
  {
    date: "2025-11-05",
    total: 780,
    status: "Pending",
    items: [{ name: "Oak Dining Set", qty: 1 }],
  },
  {
    date: "2025-10-31",
    total: 990,
    status: "Delivered",
    items: [{ name: "Upholstered Bed Frame", qty: 1 }],
  },
  {
    date: "2025-11-06",
    total: 275,
    status: "Canceled",
    items: [{ name: "Glass Center Table", qty: 1 }],
  },
  {
    date: "2025-11-07",
    total: 420,
    status: "Pending",
    items: [{ name: "Modern Office Desk", qty: 1 }],
  },
  {
    date: "2025-11-08",
    total: 260,
    status: "Delivered",
    items: [{ name: "Rustic Bookshelf", qty: 1 }],
  },
];

