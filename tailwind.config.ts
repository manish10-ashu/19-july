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
        background: "var(--background)",
        foreground: "var(--foreground)",
        romantic: {
          pink: {
            light: "#FFF0F5", // Lavender Blush
            DEFAULT: "#FFB7C5", // Cherry Blossom Pink
            dark: "#FF8DA1",
          },
          lavender: {
            light: "#F3E8FF",
            DEFAULT: "#E9D5FF",
            dark: "#C084FC",
          },
          roseGold: {
            light: "#EAD2C9",
            DEFAULT: "#B76E79",
            dark: "#9C525D",
          },
          gold: {
            light: "#FEF08A", // yellow-200
            DEFAULT: "#F59E0B", // amber-500
            dark: "#D97706", // amber-600
          }
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
