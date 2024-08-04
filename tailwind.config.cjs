/** @types {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'gradient-purs': "url('/background-gradient.png')",
        'woman': "url('/woman.png')",
        'frame': "url('/Frame7.png')",
        'org-bg': "url('/orgBg.svg')"
      },
      clipPath: {
        'inset-30': 'inset(0 100px 0 0)',
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(0)'},
          '100%': { transform: 'scale(100%)'},
        }
      },
      animation: {
        zoom: 'zoom 225ms'
      }
    },
    textColor: {
      'purple-purs': '#7C5EB1',
      'dark-purple-purs': "#5B359E",
      'blue-purs': '#3E79A5',
      'grey-purs': "#999999",
      'black-purs': '#5E718D'
    },
    borderColor: {
      'green-purs': '#14e1b0',
      'blue-purs': '#3E79A5',
    },
    backgroundColor: {
      'purple-purs': '#7C5EB1',
      'dark-purple-purs': "#5B359E",
      'gray-purs': '#CCC'
    }
  },
  plugins: [],
}
