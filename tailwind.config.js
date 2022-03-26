const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {    
    extend: {
      scale: {
        '30': '0.3',
        '40': '0.4',
      },
      fontFamily: {
          poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
          lato: ['Lato'],
      },
      colors: {
        'color': {
          100: '#917EBD44',
          200: '#E5DAFD',          
          300: '#DFD1E7',
          400:'#917ebd'
        },
        'accent': {          
          200: '#F9EDF5',
          400: '#F9C1EB'
        },
        'contrast': {
          400:'#5290F2',
        }, 
        'contrastAccent': {
          200: '#FFF8F0',
        }
      },
    },
  },
  plugins: [],
}
