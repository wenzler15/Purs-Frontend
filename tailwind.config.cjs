/** @type {import('tailwindcss').Config} */
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
      },
    },
    textColor: {
      'purple-purs': '#7C5EB1',
      'blue-purs': '#3E79A5',
      'grey-purs': "#999999"
    },
    borderColor: {
      'green-purs': '#14e1b0',
      'blue-purs': '#3E79A5',
    },
    backgroundColor: {
      'purple-purs': '#7C5EB1',
    }
  },
  plugins: [],
}
