"use client"; // Jika pakai Next.js App Router

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const packages = [
  {
    name: "Standar",
    price: 500000,
    duration: "1 jam",
    totalPhotos: 50,
    editedPhotos: 20,
    includes: ["File asli dalam format digital juga disertakan."],
    suitableFor:
      "Cocok untuk: Sesi foto pribadi, potret profesional, atau dokumentasi singkat.",
  },
  {
    name: "Premium",
    price: 1000000,
    duration: "2 jam",
    totalPhotos: 100,
    editedPhotos: 40,
    includes: [
      "File asli dalam format digital juga disertakan.",
      "Cetak 10 lembar",
    ],
    suitableFor:
      "Cocok untuk sesi keluarga, prewedding, atau proyek profesional.",
  },
  {
    name: "Eksklusif",
    price: 2000000,
    duration: "4 jam",
    totalPhotos: 200,
    editedPhotos: 80,
    includes: [
      "File asli dalam format digital juga disertakan.",
      "Album cetak 20 halaman",
    ],
    suitableFor:
      "Paket ini cocok untuk event besar seperti pernikahan atau konser.",
  },
];

function PricingCard({ data, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }} // Mulai dari kanan dan transparan
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }} // Animasi hanya saat terlihat
      transition={{ duration: 0.6, delay: index * 0.2 }} // Delay efek satu per satu
      className="border mx-2 drop-shadow-sm shadow-primary lg:mx-0 border-primary rounded-lg p-6 shadow-md"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary">{data.name}</h2>
        <h1 className="text-2xl pb-4 font-semibold text-secondary mt-2">
          Rp {data.price.toLocaleString("id-ID")}
        </h1>
      </div>

      <div className="mt-4">
        <p className="text-secondary">Durasi: {data.duration}</p>
        <p className="text-secondary">
          Jumlah Foto: {data.totalPhotos} (edit {data.editedPhotos})
        </p>
      </div>

      <ul className="mt-4 text-sm text-secondary">
        {data.includes.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p className="mt-4 font-bold text-sm text-primary">Cocok untuk:</p>
      <h1 className="text-secondary text-sm">{data.suitableFor}</h1>
      <div className="w-full mt-9 flex justify-center">
        <button className="py-1 px-4 rounded-md mt-2 text-primary border border-primary">
          Booking Sekarang
        </button>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 mb-48 gap-6 mt-24 mx-6">
      <div className="flex-col font-cinzel gap-4 flex">
        <h1 className="text-primary text-xl font-bold lg:text-3xl">
          Temukan Paket yang Sesuai untuk Momen Anda
        </h1>
        <p className="text-secondary text-sm font-light font-jost">
          Setiap momen spesial berhak diabadikan dengan cara yang terbaik. Di
          Yoga Gallery, kami menyediakan berbagai pilihan paket fotografi yang
          dirancang untuk memenuhi kebutuhan Anda. Pilihlah paket yang sesuai,
          dan biarkan kami membantu Anda mengabadikan kenangan indah dalam hidup
          Anda.
        </p>
      </div>

      {packages.map((pkg, index) => (
        <PricingCard key={index} data={pkg} index={index} />
      ))}
    </div>
  );
}
