import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ridge: {
          dark: "#0a0a12",
          cyan: "#00e5ff",
          amber: "#f59e0b",
        },
      },
      animation: {
        "event-pop": "eventPop 1.8s ease-out forwards",
      },
      keyframes: {
        eventPop: {
          "0%": { opacity: "0", transform: "translate(-50%, 20px) scale(0.8)" },
          "15%": { opacity: "1", transform: "translate(-50%, 0) scale(1.05)" },
          "80%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translate(-50%, -30px) scale(0.95)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
