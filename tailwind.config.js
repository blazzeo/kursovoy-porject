/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {},
    fontFamily: {
      'Poppins' : ['Poppins'],
      'Roboto' : ['Roboto']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}