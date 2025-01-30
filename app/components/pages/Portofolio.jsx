const Gallery = {
  semua: [
    "assets/gallery/all/foto (8).png",
    "assets/gallery/all/foto (9).png",
    "assets/gallery/all/foto (1).png",
    "assets/gallery/all/foto (2).png",
    "assets/gallery/all/foto (3).png",
    "assets/gallery/all/foto (4).png",
    "assets/gallery/all/foto (5).png",
    "assets/gallery/all/foto (6).png",
    "assets/gallery/all/foto (7).png",
  ],
  portrait: [],
};

function GalleryCard({ src, colSpan }) {
  return (
    <div className={`col-span-${colSpan} p-2`}>
      <img src={src} alt="Gallery" className="w-full h-auto" />
    </div>
  );
}

export default function Portofolio() {
  return (
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
        <div className="w-full flex justify-center gap-10 lg:gap-24 font-Jost">
          <button className="text-primary text-base">SEMUA</button>
          <button className="text-primary text-base">POTRAIT</button>
          <button className="text-primary text-base">STUDIO</button>
        </div>
      </div>

      <div className="w-[90%]  mt-7 mx-auto grid grid-cols-4 lg:grid-cols-4 gap-2">
        {Gallery.semua.map((foto, index) => (
          <GalleryCard
            key={index}
            src={foto}
            colSpan={
              index === 0 || index === 1
                ? "2"
                : index === 8 || index === 7 || index === 6
                ? "1"
                : "1"
            }
          />
        ))}
      </div>
    </section>
  );
}
