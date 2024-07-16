/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./dist/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        'space':['Space Grotesk', 'sans-serif']
      }
    },
  },
  plugins: [],
}

