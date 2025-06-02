"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import DividerWithLogo from "../line/Line";

const photographers = [
  {
    id: 1,
    name: "Yoga Mahardika",
    age: 26,
    photo: "assets/fotographer/yoga.png",
    specialty: "Wedding Photography",
    location: "Petulu, Bali",
  },
  {
    id: 2,
    name: "Diki Mahendra",
    age: 23,
    photo: "assets/fotographer/diki.jpg",
    specialty: "Lifestyle & Fashion",
    location: "Tegallalang, Bali",
  },
];

const cardVariants = {
  hidden: (isLeft) => ({
    opacity: 0,
    x: isLeft ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,

    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const PhotographerCards = () => {
  // Ref untuk container card
  const ref = useRef(null);

  // useInView detect apakah container terlihat di viewport
  // { once: true } supaya animasi hanya trigger sekali
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <div className="p-10 bg-black" ref={ref}>
        <h1 className="text-4xl font-semibold text-primary text-center mb-4">
          Kenalan dengan Fotografer Kami
        </h1>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10">
          Temukan fotografer profesional dengan berbagai spesialisasi dan
          pengalaman, siap membantu menangkap momen terbaik Anda di lokasi
          pilihan.
        </p>

        <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
          {photographers.map((photographer, index) => {
            const isLeft = index === 0;

            return (
              <motion.div
                key={photographer.id}
                custom={isLeft}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                transition={{ delay: index * 0.25 }}
                className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl w-96 p-8 text-center cursor-pointer"
              >
                <img
                  src={photographer.photo}
                  alt={photographer.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-yellow-500"
                />
                <h2 className="text-2xl font-bold text-white">
                  {photographer.name}
                </h2>
                <p className="text-gray-300 text-lg mt-2">
                  Umur: {photographer.age}
                </p>
                <p className="text-gray-300 text-lg">
                  Spesialisasi: {photographer.specialty}
                </p>
                <p className="text-gray-300 text-lg">
                  Lokasi: {photographer.location}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
      <DividerWithLogo logoSrc="assets/logo.png" altText="Logo" />
    </>
  );
};

export default PhotographerCards;
