import Image from "next/image";
import Navbar from "./components/pages/Navbar";
import Hero from "./components/pages/Hero";
import Service from "./components/pages/Services";
import About from "./components/pages/About";

export default function Home() {
  return (
    <>
      <div className="bg-[url('/assets/hero-bg.png')] bg-[left_-60px] bg-cover h-svh bg-white lg:h-screen">
        <Navbar />
        <Hero />
        <Service />
      </div>
      <div className="w-full hidden lg:block container mx-auto">
        <Service />
      </div>
      <About />
    </>
  );
}
