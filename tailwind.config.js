/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
fontFamily: {
        "poppins": "Poppins",
        "readex-pro" : "Readex Pro",
        "k2d" : "K2D",
        "noto-naskh-arabic" : "Noto Naskh Arabic",
        "mukti" : "Mukti"
      },
},
  },
  plugins: [require("daisyui")], 
}
