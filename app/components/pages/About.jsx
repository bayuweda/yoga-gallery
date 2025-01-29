"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.5 } },
  };

  const childVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 2 } },
  };

  return (
    <section
      ref={ref}
      className="w-full mt-24 min-h-screen flex justify-center items-center"
    >
      <div className="w-1/2 justify-center relative h-[500px] flex">
        <div className="relative w-[300px] h-[400px]">
          <motion.img
            initial={{ rotate: 0 }}
            animate={isInView ? { rotate: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-0 left-0 z-0 w-full"
            style={{ transformOrigin: "bottom left" }}
            src="/assets/about (1).png"
            alt=""
          />
          <motion.img
            initial={{ rotate: 0 }}
            animate={isInView ? { rotate: 12 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute bottom-0 left-0 z-10 w-full"
            style={{ transformOrigin: "bottom left" }}
            src="/assets/about (2).png"
            alt=""
          />
          <motion.img
            initial={{ rotate: 0 }}
            animate={isInView ? { rotate: 24 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute bottom-0 left-0 z-20 w-full"
            style={{ transformOrigin: "bottom left" }}
            src="/assets/about (3).png"
            alt=""
          />
        </div>
      </div>
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-1/2 h-[500px]  flex flex-col mx-24 justify-start gap-5 pt-12"
      >
        <motion.h1
          variants={childVariants}
          className="text-3xl font-bold text-primary"
        >
          ABOUT US
        </motion.h1>
        <motion.p variants={childVariants} className="text-secondary text-base">
          YOGA GALLERY ADALAH STUDIO FOTOGRAFI PROFESIONAL YANG MENGKHUSUSKAN
          DIRI DALAM MENANGKAP MOMEN-MOMEN BERHARGA DENGAN GAYA YANG KREATIF DAN
          UNIK.
        </motion.p>
        <motion.p
          variants={childVariants}
          className="text-secondary font-normal text-base"
        >
          KAMI BERFOKUS PADA KUALITAS GAMBAR YANG MENGABADIKAN KEINDAHAN,
          CERITA, DAN EMOSI DALAM SETIAP JEPRETAN.
        </motion.p>
      </motion.div>
    </section>
  );
}
