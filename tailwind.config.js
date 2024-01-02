/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pop: "'Poppins', sans-serif",
        sans: "'Nunito Sans', sans-serif",
      },
      colors: {
        white1: "#F8FAFD",
        primary: "#C2E7FF",
      },
    },
  },
  plugins: [],
};
