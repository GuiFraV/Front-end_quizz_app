/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: "#A729F5",
        darkNavy : "#313E51",
        greyNavy : "#3B4D66",
        grey : "#626C7F",
        blueLight : "#ABC1E1",
        blueLightGrey : "#F4F6FA",
        redOrange : "#EE5454"
      },
      fontFamily: {
        'RubikMedium' : ['Rubik Medium Medium', 'sans-serif'],
        'RubikMedium' : ['Rubik Medium Regular', 'sans-serif'],
        'RubikItalic' : ['Rubik Medium Italic', 'sans-serif']
      },
      fontSize: {
        'Display' : "144px",
        'Heading-L' : "64px",
        'Heading-M' : "36px",
        'Heading-S' : "28px",
        'Body-M' : "12px",

      }
    },
  },
  plugins: [],
}