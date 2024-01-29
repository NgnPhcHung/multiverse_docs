/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#2C2C2C",
        secondary: "#464646",
      },
      zIndex: {
        modalOverlay: 99998,
        modal: 99999,
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
