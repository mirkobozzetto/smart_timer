import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#181827",
      },
      animation: {
        "gradient-spin": "gradientSpin 8s linear infinite",
      },
      keyframes: {
        gradientFlow: {
          "0%": { strokeDashoffset: "0%" },
          "100%": { strokeDashoffset: "100%" },
        },
      },
    },
  },
  plugins: [
    ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void;
    }) => {
      const newUtilities = {
        ".stroke-gradient": {
          stroke: "url(#gradientColors)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;
