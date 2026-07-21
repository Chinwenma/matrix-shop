# Matrix Shop

An e-commerce storefront and admin dashboard built with Next.js (App Router), Prisma, NextAuth, and ImageKit.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Auth:** NextAuth
- **Database/ORM:** Prisma
- **Images:** ImageKit
- **Styling:** Tailwind CSS 4
- **UI:** Radix UI, Lucide icons, Framer Motion, Swiper, React Toastify
- **Package manager:** Bun

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
matrix-shop/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── signin/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx
│   ├── (client)/                 # Public storefront route group
│   │   ├── about/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── myorders/
│   │   │   ├── [id]/page.tsx     # Order detail
│   │   │   └── page.tsx          # Order history
│   │   ├── order/page.tsx
│   │   ├── products/
│   │   │   ├── [slug]/page.tsx   # Product detail
│   │   │   └── page.tsx          # Product listing
│   │   ├── layout.tsx
│   │   └── page.tsx              # Home page
│   ├── api/                      # Route handlers
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── cart/route.ts
│   │   ├── categories/route.ts
│   │   └── checkout/route.ts
│   ├── components/                # Shared React components
│   │   ├── banner/                # PageBanner
│   │   ├── btn/                   # Button, ConfirmDelete
│   │   ├── categoriesGrid/        # CategoryGrid
│   │   ├── dashboard/sidebar/     # Admin sidebar
│   │   ├── footer/                # Footer
│   │   ├── home/                  # Hero, Cat, FeaturedProducts, Review
│   │   ├── nav/                   # NavBar
│   │   ├── newsletter/            # NewsLetter
│   │   ├── orders/                # Order components
│   │   ├── product/               # ProductGallery, Cart
│   │   ├── Cart.tsx / CartPage.tsx
│   │   ├── Order.tsx / OrderDetail.tsx
│   │   ├── ProfileDropDown.tsx
│   │   ├── clientProvider.tsx
│   │   └── contextProvider.tsx
│   ├── constants/Constant.tsx
│   ├── dashboard/                 # Admin dashboard
│   │   ├── actions/                # Server actions (create/update/delete)
│   │   ├── admin/
│   │   │   ├── categories/         # CRUD: list, new, [id]/edit, [id]/view
│   │   │   ├── orders/page.tsx
│   │   │   ├── products/           # CRUD: list, new, [id]/edit, [id]/view
│   │   │   └── user/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx                  # Root layout
│   ├── not-found.tsx
│   └── globals.css
├── lib/                            # Server-side utilities & Prisma
│   ├── authOptions.ts               # NextAuth config
│   ├── categories.ts
│   ├── imageKit.ts
│   ├── orders.ts
│   ├── prisma.ts                    # Prisma client singleton
│   ├── products.ts
│   ├── seed.ts
│   ├── slugify.ts
│   ├── utils.ts
│   └── client/                      # Generated Prisma client (do not edit)
├── prisma/
│   └── schema.prisma                # Database schema
├── public/assets/                   # Static images
├── types/
│   └── next-auth.d.ts               # NextAuth type augmentation
├── middleware.ts                    # Route middleware (auth guarding)
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Route Groups

- `(auth)` — sign in / sign up pages, isolated layout.
- `(client)` — public storefront: home, products, categories, cart, orders, about, contact.
- `dashboard` — authenticated admin area for managing products, categories, orders, and users.

## Scripts

| Script | Description |
| --- | --- |
| `bun dev` | Start the dev server |
| `bun run build` | Production build |
| `bun start` | Start production server |
| `bun run lint` | Run ESLint |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
  
---

## 🙏 Acknowledgments

- Built as a portfolio project to demonstrate full-stack web development skills
- Next.js and Vercel for hosting and deployment
- MongoDB for reliable database management
- The open-source community for amazing tools and libraries

---

**Made with ❤️ by me, Chinwenma (De_Tech_Matrix)**
