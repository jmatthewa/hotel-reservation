/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0a',
        accent: {
          DEFAULT: '#a37d4c',
          hover: '#967142',
        },
      },
      backgroundImage: {
        room: "url('@/assets/5.jpg')",
      },
    },
    fontFamily: {
      primary: 'Gilda Display',
      secondary: 'Barlow',
      tertiary: 'Barlow Condensed',
      signature: 'Great Vibes',
    }
  },
  container: {
    padding: {
      DEFAULT: '15px',
    },
  },
  plugins: [],
}

