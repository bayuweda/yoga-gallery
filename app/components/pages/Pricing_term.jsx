"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaCamera, FaClock, FaFileAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Komponen Tombol Booking Card
const PricingCard = ({ data, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const router = useRouter();
  const [isBooking, setIsBooking] = useState(false);

  const goToPackageDetail = () => {
    setIsBooking(true);
    router.push(`/Pricing/${data.id}`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative mx-2 lg:mx-0 rounded-2xl p-6 border border-yellow-500
                 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 hover:scale-105
                 hover:ring-2 hover:ring-yellow-500 transition-all duration-300 shadow-xl"
    >
      {/* Badge Rekomendasi */}
      {data.name?.toLowerCase().includes("premium") && (
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full shadow-md">
          Rekomendasi Kami
        </span>
      )}

      {/* Judul & Harga */}
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-yellow-400">{data.name}</h2>
        <h1 className="text-3xl font-bold text-white mt-2">
          Rp {data.price.toLocaleString("id-ID")}
        </h1>
      </div>

      {/* Detail Fitur */}
      <div className="mt-6 space-y-2 text-sm text-gray-300">
        <p className="flex items-center gap-2">
          <FaClock className="text-yellow-400" />
          Durasi: {data.duration} Jam
        </p>
        <p className="flex items-center gap-2">
          <FaCamera className="text-yellow-400" />
          Semua Foto
        </p>
        <p className="flex items-center gap-2">
          <FaFileAlt className="text-yellow-400" />
          Edit {data.edited_photos} Foto
        </p>
      </div>

      {/* Fitur Tambahan */}
      <ul className="mt-4 text-sm text-gray-400 list-disc list-inside">
        {Array.isArray(data.includes) &&
          data.includes.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      {/* Cocok Untuk */}
      <div className="mt-4">
        <p className="font-bold text-yellow-400 text-sm">Cocok untuk:</p>
        <p className="text-gray-300 text-sm">{data.suitable_for}</p>
      </div>

      {/* Tombol Booking */}
      <div className="w-full mt-6 flex justify-center">
        <button
          onClick={goToPackageDetail}
          disabled={isBooking}
          className={`py-2 px-6 rounded-full mt-2 text-sm font-semibold transition duration-300 shadow-lg ${
            isBooking
              ? "bg-yellow-300 text-black cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-500"
          }`}
        >
          {isBooking ? "Booking Sekarang..." : "Booking Sekarang"}
        </button>
      </div>
    </motion.div>
  );
};

// Skeleton Loader
const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl p-6 border border-gray-700 bg-zinc-900 shadow-xl">
    <div className="h-4 w-3/4 bg-gray-700 rounded mb-4"></div>
    <div className="h-6 w-1/2 bg-gray-700 rounded mb-6"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
    </div>
    <div className="mt-4 h-4 w-1/2 bg-gray-700 rounded"></div>
    <div className="mt-6 h-8 bg-gray-700 rounded w-full"></div>
  </div>
);

// Komponen Utama
export default function Pricing() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${API_URL}/packages`);
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPackages();
  }, []);

  return (
    <section id="booking" className="mb-48 mt-32 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Deskripsi Kiri */}
        <div className="flex flex-col font-cinzel gap-4">
          <h1 className="text-primary text-xl font-bold lg:text-3xl">
            Temukan Paket yang Sesuai untuk Momen Anda
          </h1>
          <p className="text-secondary text-sm font-light font-jost">
            Setiap momen spesial berhak diabadikan dengan cara yang terbaik. Di
            Yoga Gallery, kami menyediakan berbagai pilihan paket fotografi yang
            dirancang untuk memenuhi kebutuhan Anda. Pilihlah paket yang sesuai,
            dan biarkan kami membantu Anda mengabadikan kenangan indah dalam
            hidup Anda.
          </p>
        </div>

        {/* Kartu Harga atau Skeleton */}
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : packages.map((pkg, index) => (
              <PricingCard key={index} data={pkg} index={index} />
            ))}
      </div>
    </section>
  );
}
