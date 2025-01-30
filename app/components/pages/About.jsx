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
    <section ref={ref} className=" mt-44  lg:min-h-screen">
      <motion.h1
        variants={childVariants}
        className="text-xl text-center font-bold lg:hidden text-primary"
      >
        ABOUT US
      </motion.h1>
      <div className="w-full  flex-wrap lg:flex-nowrap  flex justify-center items-center">
        <div className="w-1/2 justify-center relative lg:h-[500px] flex">
          <div className="relative w-[100px] h-[150px] lg:w-[300px] lg:h-[400px]">
            <motion.img
              initial={{ rotate: 0 }}
              animate={isInView ? { rotate: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 left-0 w-32 z-0  lg:lg:w-full"
              style={{ transformOrigin: "bottom left" }}
              src="/assets/about (1).png"
              alt=""
            />
            <motion.img
              initial={{ rotate: 0 }}
              animate={isInView ? { rotate: 12 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute bottom-0 left-0 w-32 z-10 lg:w-full"
              style={{ transformOrigin: "bottom left" }}
              src="/assets/about (2).png"
              alt=""
            />
            <motion.img
              initial={{ rotate: 0 }}
              animate={isInView ? { rotate: 24 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute bottom-0 left-0 w-32 z-20 lg:w-full"
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
          className="lg:w-1/2 h-[500px] text-center mx-5 lg:text-start flex flex-col lg:mx-24 justify-start gap-5 pt-12"
        >
          <motion.h1
            variants={childVariants}
            className="text-3xl font-bold hidden lg:block text-primary"
          >
            ABOUT US
          </motion.h1>
          <motion.p
            variants={childVariants}
            className="text-secondary font-Playfair text-[12px] lg:text-base"
          >
            YOGA GALLERY ADALAH STUDIO FOTOGRAFI PROFESIONAL YANG MENGKHUSUSKAN
            DIRI DALAM MENANGKAP MOMEN-MOMEN BERHARGA DENGAN GAYA YANG KREATIF
            DAN UNIK.
          </motion.p>
          <motion.p
            variants={childVariants}
            className="text-secondary font-Playfair text-[12px] font-normal lg:text-base"
          >
            KAMI BERFOKUS PADA KUALITAS GAMBAR YANG MENGABADIKAN KEINDAHAN,
            CERITA, DAN EMOSI DALAM SETIAP JEPRETAN.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
