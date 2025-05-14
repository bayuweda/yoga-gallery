"use client";
import Masonry from "react-masonry-css";
import { useState } from "react";

import Image from "next/image";
import Navbar from "../components/pages/Navbar";
import Footer from "../components/pages/Footer";
import Link from "next/link";

const Gallery = {
  portrait: [
    "assets/gallery/potrait/foto (1).JPG",
    "assets/gallery/potrait/foto (2).JPG",
    "assets/gallery/potrait/foto (3).JPG",
    "assets/gallery/potrait/foto (4).JPG",
    "assets/gallery/potrait/foto (5).JPG",
    "assets/gallery/potrait/foto (6).JPG",
    "assets/gallery/potrait/foto (7).JPG",
    "assets/gallery/potrait/foto (8).JPG",
    "assets/gallery/potrait/foto (9).JPG",
    "assets/gallery/potrait/foto (10).JPG",
    "assets/gallery/potrait/foto (11).JPG",
    "assets/gallery/potrait/foto (12).JPG",
    "assets/gallery/potrait/foto (13).JPG",
    "assets/gallery/potrait/foto (14).JPG",
    "assets/gallery/potrait/foto (15).JPG",
    "assets/gallery/potrait/foto (16).JPG",
    "assets/gallery/potrait/foto (17).JPG",
    "assets/gallery/potrait/foto (18).JPG",
    "assets/gallery/potrait/foto (19).JPG",
    "assets/gallery/potrait/foto (20).JPG",
  ],
  personal: [
    "assets/gallery/personal/foto  (1).JPG",
    "assets/gallery/personal/foto  (2).JPG",
    "assets/gallery/personal/foto  (3).JPG",
    "assets/gallery/personal/foto  (4).JPG",
    "assets/gallery/personal/foto  (5).JPG",
    "assets/gallery/personal/foto  (6).JPG",
    "assets/gallery/personal/foto  (7).JPG",
    "assets/gallery/personal/foto  (8).JPG",
    "assets/gallery/personal/foto  (9).JPG",
    "assets/gallery/personal/foto  (10).JPG",
    "assets/gallery/personal/foto  (11).JPG",
    "assets/gallery/personal/foto  (12).JPG",
    "assets/gallery/personal/foto  (13).JPG",
  ],
  family: [
    "assets/gallery/family/foto (1).JPG",
    "assets/gallery/family/foto (2).JPG",
    "assets/gallery/family/foto (3).JPG",
    "assets/gallery/family/foto (4).JPG",
    "assets/gallery/family/foto (5).JPG",
    "assets/gallery/family/foto (6).JPG",
    "assets/gallery/family/foto (7).JPG",
    "assets/gallery/family/foto (8).JPG",
    "assets/gallery/family/foto (9).JPG",
    "assets/gallery/family/foto (10).JPG",
    "assets/gallery/family/foto (11).JPG",
    "assets/gallery/family/foto (12).JPG",
    "assets/gallery/family/foto (13).JPG",
    "assets/gallery/family/foto (14).JPG",
    "assets/gallery/family/foto (15).JPG",
    "assets/gallery/family/foto (16).JPG",
    "assets/gallery/family/foto (17).JPG",
    "assets/gallery/family/foto (18).JPG",
    "assets/gallery/family/foto (19).JPG",
    "assets/gallery/family/foto (20).JPG",
    "assets/gallery/family/foto (21).JPG",
    "assets/gallery/family/foto (22).JPG",
    "assets/gallery/family/foto (23).JPG",
    "assets/gallery/family/foto (24).JPG",
  ],
};

Gallery.semua = [...Gallery.portrait, ...Gallery.personal, ...Gallery.family];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

function MasonryGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4 w-auto"
        columnClassName="masonry-column"
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg group mb-4 cursor-pointer"
            onClick={() => setSelectedImage(src)}
          >
            <Image
              src={`/${src}`}
              alt="gallery"
              width={400}
              height={300}
              className="w-full h-auto object-cover rounded-md transform scale-105 group-hover:scale-100 transition duration-500 ease-in-out"
            />
          </div>
        ))}
      </Masonry>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full px-4">
            <Image
              src={`/${selectedImage}`}
              alt="enlarged"
              width={1000}
              height={800}
              className="w-full h-auto object-contain rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function SectionGallery({ title, images }) {
  const shuffledImages = shuffleArray(images);
  return (
    <section className="w-[90%] mx-auto my-12">
      <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 border-b border-primary pb-2">
        {title}
      </h2>
      <MasonryGallery images={shuffledImages} />
    </section>
  );
}

export default function OurGalleryPinterest() {
  return (
    <>
      {/* Ikon Home di pojok kanan atas */}
      <div className="fixed bottom-4 right-1 animate-pulse z-50">
        <div className="group relative flex flex-col items-center">
          {/* Tooltip di atas */}
          <div className="mb-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
            Homepage
          </div>

          {/* Icon */}
          <Link href="/">
            <div className="bg-white p-2 rounded-lg  shadow-slate-600 shadow-md hover:shadow-md transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-6 text-primary hover:text-black transition cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      <main className="w-full  pb-10">
        <section className="drop-shadow-lg">
          <Image
            width={2000}
            height={2000}
            src="/assets/banner/banner.png"
            className="w-full lg:h-[500px]"
            alt="Banner"
          />
        </section>

        <SectionGallery title="Semua" images={Gallery.semua} />
        <SectionGallery title="Portrait" images={Gallery.portrait} />
        <SectionGallery title="Personal" images={Gallery.personal} />
        <SectionGallery title="Family" images={Gallery.family} />
      </main>
      <Footer />
    </>
  );
}
