"use client";
import { FaStar } from "react-icons/fa";
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";

// Data testimoni
const testimonials = [
  {
    name: "Yoga Gallery",
    rating: 5,
    description:
      "Pengalaman yang luar biasa! Foto-fotonya sangat berkualitas dan team-nya profesional.",
  },
  {
    name: "Budi Santoso",
    rating: 4,
    description:
      "Paket fotografi yang sangat memuaskan, hasilnya sangat memuaskan, meskipun sedikit terlambat.",
  },
  {
    name: "Lisa Maulana",
    rating: 5,
    description:
      "Sangat direkomendasikan! Fotografernya sangat sabar dan hasil fotonya luar biasa.",
  },
];

// Komponen untuk setiap kartu testimoni
function TestimoniCard({ name, rating, description }) {
  return (
    <div className="rounded-lg p-6 shadow-lg flex flex-col w-96 gap-8 text-center">
      <div className="flex justify-center mb-2">
        {Array.from({ length: rating }, (_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
      </div>

      <p className="text-secondary text-sm lg:text-base mt-2">{description}</p>
      <h3 className="font-semibold text-primary uppercase tracking-wider lg:text-lg">
        {name}
      </h3>
    </div>
  );
}

// Komponen utama Testimoni
export default function Testimoni() {
  // Membuat referensi untuk Swiper
  const swiperRef = useRef(null);

  return (
    <section className="bg-[url('/assets/bg-testimoni.png')] bg-no-repeat h-44 lg:h-auto py-8 flex flex-col items-center justify-center bg-cover w-full px-6">
      <div className=" ">
        <img src="/assets/“.png" alt="" />
      </div>

      {/* Swiper Wrapper */}
      <div className="w-96 ">
        {" "}
        {/* Tambahkan mx-auto untuk centering */}
        <Swiper
          ref={swiperRef}
          spaceBetween={30} // Jarak antar kartu testimoni
          slidesPerView={1} // Menampilkan 1 testimoni per slide
          loop={true} // Looping otomatis
          navigation={false} // Nonaktifkan navigasi default
          pagination={{ clickable: true }} // Pagination untuk indikator slide
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimoniCard
                name={testimonial.name}
                rating={testimonial.rating}
                description={testimonial.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tombol Prev dan Next */}
    </section>
  );
}
