import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#F71D7F",
        mauve: '#AC6686',
        body: "#230110",
        box: "#2E0E1C",
        'mauve-30': 'rgba(172, 102, 134, 0.30)',
        'whitealpha-10': 'rgba(255, 255, 255, 0.10)',
        'pink-2': "#EC1C79",
        brown: "#3C021C",
        lightpink: "#F71D7F",
        rose: "#BDA7B1",
        default: "#C4C4C4"
      },
      borderRadius: {
        primary: "35px",
        box: "10px",
      },
      width: {
        standard: "609px"
      }
    },
  },
  plugins: [],
};
export default config;
