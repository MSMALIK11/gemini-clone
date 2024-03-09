/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: '#f0f4f9',
        primary: '#131314',
        secondary: '#1e1f20',
        softGray: "#444746",


      }
    },
  },
  plugins: [],
}

