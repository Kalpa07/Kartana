/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1e40af",   // Example primary color
          secondary: "#64748b", // Optional secondary color
          accent: "#10b981",    // Optional accent color
        },
        fontFamily: {
            body: ["var(--font-inter)", "sans-serif"],
            heading: ["var(--font-poppins)", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
  