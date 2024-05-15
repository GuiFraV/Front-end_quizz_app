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
        violetLight: "#F6E7FF",
        darkNavy : "#313E51",
        greyNavy : "#3B4D66",
        grey : "#626C7F",
        blueLight : "#ABC1E1",
        blueLightGrey : "#F4F6FA",
        redOrange : "#EE5454"
      },
      fontFamily: {
        'RubikMedium' : ['Rubik Medium Medium', 'sans-serif'],
        'RubikRegular' : ['Rubik Medium Regular', 'sans-serif'],
        'RubikItalic' : ['Rubik Medium Italic', 'sans-serif']
      },
      fontSize: {
        'Display' : "144px",
        'Heading-L' : "64px",
        'Heading-M' : "36px",
        'Heading-S' : "28px",
        'Body-M' : "12px",

      },
      screens: {
        'md': '760px',
        'lg': '1024px', 
      },
      backgroundImage: {
        'desktop-light': "url('/images/pattern-background-desktop-light.svg')",
        'desktop-dark': "url('/images/pattern-background-desktop-dark.svg')",
        'tablet-light': "url('/images/pattern-background-tablet-light.svg')",
        'tablet-dark': "url('/images/pattern-background-tablet-dark.svg')",
        'mobile-light': "url('/images/pattern-background-mobile-light.svg')",
        'mobile-dark': "url('/images/pattern-background-tablet-dark.svg')",
      },
    },
  },
  plugins: [],
}