/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./data/*",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};
