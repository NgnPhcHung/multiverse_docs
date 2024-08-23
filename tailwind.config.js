/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-mode="dark"]'],  
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "hsl(var(--brand))",
        brandHover: "hsl(var(--brand-hover))",
        secondary: "hsl(var(--secondary))",
        secondaryHover: "hsl(var(--secondary-hover))",
        primary: "hsl(var(--primary))",
        primaryHover: "hsl(var(--primary-hover))",
        diagram: "hsl(var(--diagram))",
        default: "hsl(var(--default))",
      },
      zIndex: {
        modalOverlay: 99998,
        modal: 99999,
        sideBar:999,
        editor:1000,
        onEditor:1001,
      },
      borderWidth: {
        1: "1px",
      },
      height: {
        17: "70px",
      },
    },
  },
  plugins: [],
};
