import Image from "next/image";
import Navbar from "./components/pages/Navbar";
import Hero from "./components/pages/Hero";
import Service from "./components/pages/Services";
import About from "./components/pages/About";
import Portofolio from "./components/pages/Portofolio";
// import Pricing from "./components/pages/Pricing";
import Testimoni from "./components/pages/Testimoni";
import Footer from "./components/pages/Footer";
import PhotographerCards from "./components/pages/Photographer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-[url('/assets/hero-bg.png')] bg-[left_-60px]  bg-cover h-svh bg-white lg:h-screen">
        <Hero />
        <Service />
      </div>
      <div className="w-full hidden lg:block ">
        <Service />
      </div>
      <About />
      <PhotographerCards />
      <Portofolio />

      {/* <Pricing /> */}
      <Testimoni />
      <Footer />
    </>
  );
}
