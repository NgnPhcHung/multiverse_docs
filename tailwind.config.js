/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-mode="dark"]'],
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
      },
      zIndex: {
        theme: 99999,
        modalOverlay: 98,
        modal: 99,
        sideBar: 95,
        editor: 96,
        onEditor: 97,
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
