import React from "react";
import DividerWithLogo from "../line/Line";

const photographers = [
  {
    id: 1,
    name: "Yoga Mahardika",
    age: 26,
    photo: "assets/gallery/personal/foto  (1).JPG",
    specialty: "Wedding Photography",
    location: "Petulu, Bali",
  },
  {
    id: 2,
    name: "Diki Mahendra",
    age: 23,
    photo: "assets/gallery/personal/foto  (9).JPG",
    specialty: "Lifestyle & Fashion",
    location: "Tegallalang, Bali",
  },
];

const PhotographerCards = () => {
  return (
    <>
      <div className="p-10 bg-black">
        {/* Judul bagian dengan animasi fade-in */}
        <h1 className="text-4xl font-semibold text-primary text-center mb-10 animate__animated animate__fadeIn">
          Kenalan dengan Fotografer Kami
        </h1>

        {/* Daftar fotografer dengan animasi scale-up */}
        <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
          {photographers.map((photographer) => (
            <div
              key={photographer.id}
              className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl shadow-xl w-96 p-8 text-center transition transform hover:scale-105 hover:shadow-2xl animate__animated animate__fadeIn animate__delay-1s"
            >
              <img
                src={photographer.photo}
                alt={photographer.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-yellow-500"
              />
              <h2 className="text-2xl font-bold text-white">
                {photographer.name}
              </h2>
              <p className="text-gray-300 text-lg mt-2">
                Umur: {photographer.age}
              </p>
              <p className="text-gray-300 text-lg">
                Spesialisasi: {photographer.specialty}
              </p>
              <p className="text-gray-300 text-lg">
                Lokasi: {photographer.location}
              </p>
            </div>
          ))}
        </div>
      </div>
      <DividerWithLogo logoSrc="assets/logo.png" altText="Logo" />
    </>
  );
};

export default PhotographerCards;
