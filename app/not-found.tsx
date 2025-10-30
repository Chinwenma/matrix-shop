// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import Navbar from "./components/nav/NavBar";
// import Footer from "./components/footer/Footer";


// export default function NotFound() {
//   return (
//     <>
//       <Navbar />

//       <section className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4 bg-gray-50">
//         <motion.h1
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-7xl font-bold text-teal-600 mb-3"
//         >
//           404
//         </motion.h1>

//         <motion.h2
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="text-2xl font-semibold text-gray-800 mb-4"
//         >
//           Page Not Found
//         </motion.h2>

//         <p className="text-gray-600 max-w-md mb-6">
//           Oops! The page you’re looking for doesn’t exist or has been moved.
//         </p>

//         <Link
//           href="/"
//           className="inline-flex items-center bg-teal-600 text-white px-6 py-2.5 rounded-md hover:bg-teal-700 transition"
//         >
//           Go Home
//         </Link>
//       </section>

//       <Footer />
//     </>
//   );
// }



"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";


export default function NotFound() {
  return (
    <main>

      <section className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4 bg-gray-50 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
         
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-7xl font-bold text-teal-600 mb-3"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-semibold text-gray-800 mb-4"
        >
          Page Not Found
        </motion.h2>

        <p className="text-gray-600 max-w-md mb-6">
          Oops! The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center bg-teal-600 text-white px-6 py-2.5 rounded-md hover:bg-teal-700 transition"
        >
          Go Home
        </Link>
      </section>

    </main>
  );
}
