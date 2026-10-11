import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: { DEFAULT: "#120620", plum: "#2a0a3a" },
        ruby: "#b3122e",
        cream: "#fff4dc",
        ivory: "#fffaf0",
        gold: { light: "#f1d98a", DEFAULT: "#d4a439", dark: "#9a6f12" },
        maroon: { DEFAULT: "#6b1220", deep: "#3d0a14" },
        magenta: "#a3185f",
        saffron: "#f28c38",
        blush: "#f4a3b5",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        display: ["var(--font-display)", "serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
