module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        'niceblue': '#5995da',
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
