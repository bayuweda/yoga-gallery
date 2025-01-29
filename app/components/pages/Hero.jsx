"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

const text = "KARENA SETIAP MOMEN LAYAK UNTUK DIINGAT SELAMANYA";

export default function Hero() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, ease: "easeOut", duration: 1.5 },
    },
  };

  return (
    <section className="w-full flex justify-end h-[100%]">
      <div className="w-1/2 px-24 flex gap-4 flex-col justify-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-4xl  text-primary"
        >
          {"ABADIKAN MOMEN BERHARGA ANDA DENGAN SENTUHAN PROFESIONAL"
            .split("")
            .map((letter, index) => (
              <motion.span key={index} variants={textVariants}>
                {letter}
              </motion.span>
            ))}
        </motion.h1>

        <h2 ref={ref} className="text-base text-secondary">
          {text.split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                duration: 0.2,
                delay: 2.5 + index * 0.05, // Menambahkan delay 2 detik
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 2.5,
          }}
          className=""
        >
          <button className="border-primary hover:bg-primary px-2 hover:text-secondary border  py-2 rounded-md text-sm text-primary">
            {[
              "B",
              "O",
              "O",
              "K",
              "I",
              "N",
              "G",
              " ",
              "S",
              "E",
              "K",
              "A",
              "R",
              "A",
              "N",
              "G",
            ].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, rotate: Math.sin(index * 0.3) * 15 }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  delay: 2.5 + index * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
                style={{ display: "inline-block", marginRight: "2px" }}
              >
                {letter}
              </motion.span>
            ))}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
