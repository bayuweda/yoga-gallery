"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

const text = "KARENA SETIAP MOMEN LAYAK UNTUK DI INGAT SELAMANYA";

export default function Hero() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <section className="w-full flex justify-end h-[80%]">
        <div className="w-1/2 px-24 flex gap-4 flex-col justify-center">
          <h1 className="text-primary text-4xl">
            ABADIKAN MOMEN BERHARGA ANDA DENGAN SENTUHAN PROFESIONAL
          </h1>
          <h2 ref={ref} className="text-md text-secondary">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
          </h2>

          <button className="border-primary hover:bg-primary hover:text-secondary border w-44 py-2 rounded-md text-sm text-primary">
            BOOKING SEKARANG
          </button>
        </div>
      </section>
    </>
  );
}
