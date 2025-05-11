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
    <section
      id="hero"
      className="w-full font-cinzel flex justify-end h-[70%] lg:h-[100%]"
    >
      <div className="lg:w-1/2 lg:px-24 px-8 flex gap-4 flex-col justify-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="lg:text-4xl text-xl   text-primary"
        >
          {"ABADIKAN MOMEN BERHARGA ANDA DENGAN SENTUHAN PROFESIONAL"
            .split("")
            .map((letter, index) => (
              <motion.span key={index} variants={textVariants}>
                {letter}
              </motion.span>
            ))}
        </motion.h1>

        <h2
          ref={ref}
          className="lg:text-base text-[10px]  pr-24 lg:pr-0 text-secondary"
        >
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
          <a href="#booking">
            <button className="border-primary font-playfair text-[9px] hover:bg-primary px-2 hover:text-secondary border  py-2 rounded-md text-sm text-primary">
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
          </a>
        </motion.div>
      </div>
    </section>
  );
}
