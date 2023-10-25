/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundColor: {
        "black-border": "#52616B",
      },
      colors: {
        border: "#1B262C",
        input: "#1B262C",
        ring: "#1B262C",
        background: "#F9F7F7",
        foreground: "#000",
        primary: {
          DEFAULT: "#05445E",
          foreground: "#F9F7F7",
        },
        secondary: {
          DEFAULT: "#1B262C",
          // foreground: "#F9F7F7",
        },
        destructive: {
          DEFAULT: "#1B262C",
          // foreground: "#F9F7F7",
        },
        muted: {
          DEFAULT: "#1B262C",
          // foreground: "#F9F7F7",
        },
        accent: {
          DEFAULT: "#05445E",
          foreground: "#F9F7F7",
        },
        popover: {
          DEFAULT: "#1B262C",
          // foreground: "#F9F7F7",
        },
        card: {
          DEFAULT: "#1B262C",
          // foreground: "#F9F7F7",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
