"use client";
import { useState } from "react";
import Image from "next/image";
import DividerWithLogo from "../line/Line";

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

function GalleryCard({ src, onClick }) {
  return (
    <div
      className={` p-2 relative w-full aspect-[4/3] group overflow-hidden cursor-pointer`}
      onClick={onClick}
    >
      <Image
        src={`/${src}`}
        alt="Gallery"
        fill
        className="object-cover rounded-md shadow transform scale-105 group-hover:scale-100 transition duration-500 ease-in-out"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
    </div>
  );
}

export default function Portofolio() {
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [modalImage, setModalImage] = useState(null);
  const [showAll, setShowAll] = useState(false); // <- toggle state

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowAll(false); // Reset to "show sedikit" when category changes
  };

  const handleImageClick = (src) => {
    setModalImage(src);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const photos = shuffleArray(Gallery[selectedCategory] || []);
  const displayedPhotos = showAll ? photos : photos.slice(0, 12); // toggle logic

  return (
    <>
      <section className="w-full lg:mt-24">
        <div className="w-full flex flex-col gap-7">
          <div className="mx-auto lg:w-[40%] px-4 text-center">
            <h1 className="text-primary font-bold lg:text-3xl">
              HASIL KARYA KAMI
            </h1>
            <p className="text-secondary lg:text-base text-sm mt-4 font-Playfair">
              Portofolio ini adalah bukti dari dedikasi kami dalam menghasilkan
              fotografi berkualitas tinggi. Jelajahi karya kami dan temukan
              bagaimana kami mengabadikan momen berharga.
            </p>
          </div>

          <div className="w-full flex justify-center gap-5 lg:gap-10 font-Jost mt-4 flex-wrap">
            {["semua", "portrait", "personal", "family"].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-base transition duration-200 ${
                  selectedCategory === category
                    ? "text-white bg-primary px-4 py-1 rounded"
                    : "text-primary"
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="w-[90%] mt-7 mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {displayedPhotos.length > 0 ? (
            displayedPhotos.map((foto, index) => (
              <GalleryCard
                key={index}
                src={foto}
                colSpan={
                  selectedCategory === "semua" && (index === 0 || index === 1)
                    ? "2"
                    : "1"
                }
                onClick={() => handleImageClick(foto)}
              />
            ))
          ) : (
            <p className="text-center col-span-4 text-secondary mt-10">
              Tidak ada foto dalam kategori ini.
            </p>
          )}
        </div>

        {/* Toggle Button */}
        {photos.length > 10 && (
          <div className="w-full flex justify-center mt-5">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-80 transition"
            >
              {showAll ? "Tampilkan Sedikit" : "Tampilkan Semua"}
            </button>
          </div>
        )}

        {/* Modal */}
        {modalImage && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            <div
              className="relative w-[90%] md:w-[60%] aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/${modalImage}`}
                alt="Preview"
                fill
                className="object-contain rounded-md"
              />
              <button
                className="absolute top-2 right-2 text-white text-2xl"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </section>
      <DividerWithLogo logoSrc="assets/logo.png" altText="Logo" />
    </>
  );
}
