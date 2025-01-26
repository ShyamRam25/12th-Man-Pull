/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'aggie-maroon': '#651d2b',
      'aggie-white': '#FFFFFF',
      'aggie-gray': '#707373',
      'other-white': '#d6d3c4',
    },
    extend: {
      fontFamily: {
        'custom-font': ['klinic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

