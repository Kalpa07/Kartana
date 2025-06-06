/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "730px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1920px",
      },
      colors: {
        'color-primary': "#1CD9A9",
        secondary: "#0F5C4A",
        base: "#1E1E1E",
        neutral: "#5C5C5C",
        accent: "#D91C4A",
        white: "#FFFFFF",
        black: "#000000",
      },
      fontFamily: {
        body: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
