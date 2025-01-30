import { Cinzel, Playfair } from "next/font/google";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060504",
        primary: "#D4AF37",
        secondary: "#FFFFF0",
      },
    },
    fontFamily: {
      cinzel: ["Cinzel", "serif"],
      playfair: ["Playfair", "serif"],
      jost: ["Jost", "sans-serif"], // Perbaiki formatnya
    },
  },
  plugins: [],
};
