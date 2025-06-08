"use client";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

function TestimoniCard({ name, rating, comment }) {
  return (
    <div className="rounded-lg p-6 shadow-lg flex flex-col w-96 gap-8 text-center ">
      <div className="flex justify-center mb-2">
        {Array.from({ length: rating }, (_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
      </div>
      <p className="text-secondary text-sm lg:text-base mt-2">{comment}</p>
      <h3 className="font-semibold text-primary uppercase tracking-wider lg:text-lg">
        {name}
      </h3>
    </div>
  );
}

export default function Testimoni() {
  const swiperRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${API_URL}/reviews`);
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Gagal memuat testimoni:", error);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section className="bg-[url('/assets/bg-testimoni.png')] bg-no-repeat lg:h-auto py-8 flex flex-col items-center justify-center bg-cover w-full px-6">
      <div>
        <img src="/assets/“.png" alt="quote" />
      </div>

      <div className="w-96">
        <Swiper
          ref={swiperRef}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          navigation={false}
          pagination={{ clickable: true }}
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <TestimoniCard
                name={item.name}
                rating={item.rating}
                comment={item.comment}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
