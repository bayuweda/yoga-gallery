"use client";

// Data untuk Service
const ServiceData = [
  { title: "Best picture", images: "/assets/service (1).png" },
  { title: "Best picture", images: "/assets/service (2).png" },
  { title: "Best picture", images: "/assets/service (3).png" },
  { title: "Best picture", images: "/assets/service (4).png" },
  { title: "Best picture", images: "/assets/service (5).png" },
];

import React from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

// Komponen untuk menampilkan gambar dan judul
function ServiceCard({ src, title }) {
  return (
    <div className="relative lg:w-80   rounded-lg">
      {/* Gambar dengan ukuran penuh */}
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover rounded-lg"
      />
      {/* Overlay teks */}
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white lg:text-2xl font-bold z-10">
        {title}
      </h1>
    </div>
  );
}

export default function Service() {
  return (
    <>
      <section className="lg:mt-24">
        <div className="w-full flex flex-col justify-center items-center ">
          <div className="lg:w-[40%] flex flex-col gap-4 text-center">
            <h1 className="text-primary text-sm px-12 lg:px-6 font-bold lg:text-2xl">
              CIPTAKAN KENANGAN TAK TERLUPAKAN
            </h1>
            <p className="text-secondary lg:hidden text-[10px] lg:text-base font-Playfair lg:font-semibold  font-light px-12">
              Di Yoga Gallery, kami menawarkan berbagai layanan fotografi yang
              disesuaikan dengan kebutuhan Anda. Dari sesi foto pribadi hingga
              sesi foto acara spesial, kami siap membantu Anda menangkap momen
              berharga
            </p>
          </div>
        </div>
        <Swiper
          loop
          grabCursor
          slidesPerView={3}
          spaceBetween={0}
          effect="coverflow"
          autoplay={{
            delay: 2500, // Waktu delay antar slide (dalam milidetik)
            disableOnInteraction: false, // Memungkinkan autoplay tetap berjalan setelah interaksi
          }}
          coverflowEffect={{
            rotate: 0,
            scale: 0.8,
            stretch: 2,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full max-w-6xl mx-auto my-6"
        >
          {ServiceData.map((data, index) => (
            <SwiperSlide key={index}>
              <ServiceCard src={data.images} title={data.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
