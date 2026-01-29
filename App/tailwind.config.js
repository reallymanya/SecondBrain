/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#030014", // Deep rich space black
        foreground: "#ffffff",
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9", // Electric Blue
          600: "#0284c7",
          900: "#0c4a6e",
        },
        accent: {
          500: "#8b5cf6", // Electric Purple
          glow: "#a78bfa",
        },
      },
    },
  },
  plugins: [],
}

