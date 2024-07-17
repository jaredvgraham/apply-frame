import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        backgroundAlt: "var(--background-alt-color)",
        text: "var(--text-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        border: "var(--border-color)",
        neutral: "var(--neutral-color)",
        warning: "var(--warning-color)",
        success: "var(--success-color)",
      },
      boxShadow: {
        custom: "var(--shadow)",
      },
    },
  },
  plugins: [],
};
export default config;
