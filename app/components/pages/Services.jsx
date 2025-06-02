"use client";
import DividerWithLogo from "../line/Line";
import React from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

// Data untuk Service
const ServiceData = [
  {
    title: "Nikmati momen hangat bersama keluarga",
    images: "/assets/service/keluarga.jpg",
    category: "Keluarga",
  },
  {
    title: "Ekspresikan dirimu dengan foto personal",
    images: "/assets/service/personal.JPG",
    category: "Personal",
  },
  {
    title: "Abadikan petualangan serumu saat travel",
    images: "/assets/service/travel.jpg",
    category: "Travel",
  },
  {
    title: "Kenangan indah tahun ini dalam buku tahunan",
    images: "/assets/service/yearbook.JPG",
    category: "Yearbook",
  },
  {
    title: "Tampilkan sisi terbaikmu lewat portrait elegan",
    images: "/assets/service/potrait.jpg",
    category: "Portrait",
  },
];

// Komponen untuk menampilkan gambar dan judul
function ServiceCard({ src, title, category }) {
  return (
    <div className="relative lg:w-80 rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl">
      {/* Gambar utama */}
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover rounded-xl"
      />

      {/* Lapisan blur */}
      <div className="absolute inset-0  z-0 rounded-xl group-hover:bg-black/60 transition-all duration-300" />

      {/* Badge kategori */}
      <div className="absolute top-3 left-3 bg-white/90 text-black text-xs px-3 py-1 rounded-full font-medium z-10 flex items-center gap-1">
        {/* Heroicons tag icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M3 8l7.586-7.586a2 2 0 012.828 0l9.172 9.172a2 2 0 010 2.828L13 21H5a2 2 0 01-2-2v-8z"
          />
        </svg>
        {category}
      </div>

      {/* Ikon kamera */}
      <div className="absolute top-3 right-3 z-10">
        <div className="flex ml-24 lg:ml-0 shrink-0 gap-2 items-center">
          <img alt="Your Company" src="/assets/logo.png" className=" w-5" />
          <h1 className="text-secondary text-[8px] lg:text-sm font-regular">
            Yoga <span className="text-primary">Gallery</span>
          </h1>
        </div>
      </div>

      {/* Teks judul */}
      <div className="absolute inset-0 flex items-end justify-center pb-6 z-10">
        <div className="bg-white/90 text-black px-4 py-2 rounded-md text-center  text-sm lg:text-lg shadow-lg">
          {title}
        </div>
      </div>
    </div>
  );
}

export default function Service() {
  return (
    <>
      <section id="service" className="lg:mt-24  py-12">
        <div className="w-full flex flex-col justify-center items-center text-center">
          <div className="lg:w-[45%] flex flex-col gap-4 px-6">
            <h1 className="text-primary text-sm lg:text-3xl font-bold tracking-wide">
              CIPTAKAN KENANGAN TAK TERLUPAKAN
            </h1>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10 animate__animated animate__fadeIn animate__delay-1s">
              Beragam layanan fotografi yang disesuaikan dengan kebutuhanmu.
              Temukan sesi foto yang menggambarkan kisah dan gaya unikmu di Yoga
              Gallery.
            </p>
          </div>
        </div>

        <Swiper
          loop
          grabCursor
          centeredSlides
          slidesPerView={3}
          spaceBetween={16}
          effect="coverflow"
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            reverseDirection: true, // autoplay dari kiri ke kanan
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 3.5 },
          }}
          coverflowEffect={{
            rotate: 0,
            scale: 0.95, // sebelumnya 0.85, perbesar biar card lebih penuh
            stretch: 0, // stretch nol agar tidak terlalu renggang
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full max-w-6xl mx-auto mt-10"
        >
          {ServiceData.map((data, index) => (
            <SwiperSlide key={index}>
              <ServiceCard
                src={data.images}
                title={data.title}
                category={data.category}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Tombol CTA */}
      </section>

      <DividerWithLogo logoSrc="assets/logo.png" altText="Logo" />
    </>
  );
}
