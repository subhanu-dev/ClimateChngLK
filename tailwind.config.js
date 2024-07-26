/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./dist/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        'space':['Space Grotesk', 'sans-serif'],
        'sinhala':['Noto Sans Sinhala','sans-serif']

      },
      colors:{
        'darkgreen':['#031806'],
        'waterdarkblue':['#003A48'],
        'waterlightblue':['#226A7F'],
        'earthgreen':['#9AAC34'],
        'bggreen':['#3B8319']
      },
      
    },
  },
  plugins: [],
}

