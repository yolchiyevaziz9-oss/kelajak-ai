import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        accent: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        ink: {
          900: "#0b0f1a",
          800: "#111827",
          700: "#1f2937",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "fade-in": "fadeIn 0.6s ease-out both",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 12s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "gradient-x": "gradientX 8s ease infinite",
        "glow": "glow 2.5s ease-in-out infinite",
        "typing": "typing 2.4s steps(28, end), blink .75s step-end infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-22px)" },
        },
        pulseSoft: {
          "0%,100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
        gradientX: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glow: {
          "0%,100%": { boxShadow: "0 0 24px rgba(99,102,241,0.45)" },
          "50%": { boxShadow: "0 0 56px rgba(34,211,238,0.55)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)",
        "hero-radial":
          "radial-gradient(60% 50% at 50% 30%, rgba(99,102,241,0.35) 0%, rgba(8,11,24,0) 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
