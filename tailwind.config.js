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
      textShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.5)",
        DEFAULT: "0 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "0 8px 16px rgba(0, 0, 0, 0.5)",
        xl: "0 12px 24px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-sm": {
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow": {
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-lg": {
          textShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
