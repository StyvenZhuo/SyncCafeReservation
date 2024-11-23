/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Set Poppins as the default sans-serif font
      },
    },
  },
  theme: {
    extend: {
      colors: {
        "soft-brown": "#d9c7a3", // Warna coklat muda
        "soft-green": "#ffffff", // Warna hijau muda
      },
    },
  },
  plugins: [],
}

