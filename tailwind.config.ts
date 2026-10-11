import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: { 50: "#f1f4ec", 100: "#e1e8d5", 200: "#c5d2b0", 300: "#a6b88a", 400: "#8aa070", 500: "#72895a", 600: "#5a6f46", 700: "#47593a", 800: "#3a4930" },
        cream: "#faf6ea",
        beige: "#eadfc6",
        gold: { light: "#e8d28f", DEFAULT: "#c9a24b", dark: "#9a7625" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
