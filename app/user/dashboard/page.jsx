"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ProfileCard from "../components/ProfileCard";
import BookingList from "../components/BookingList";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("jwt");

    // Cek jika token tidak ada, arahkan pengguna ke halaman login
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false); // Jika token ada, lanjutkan render halaman dashboard
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
        >
          Selamat Datang di Dashboard Anda
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProfileCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BookingList />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
