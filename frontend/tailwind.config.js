// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7e22ce",
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: '0.5' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        pop: 'pop 0.3s ease-out',
      },


    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
