/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'border-color':'#BBBBBB',
        'primary':'#3E6990'
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        slide: 'slide 1s linear infinite',
        'drop-spin': 'dropSpin 1s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        dropSpin: {
          '0%': { 
            transform: 'translateY(-10px) rotate(0deg)',  // Start slightly above and not rotated
            opacity: '0',  // Invisible at the start
          },
          '100%': { 
            transform: 'translateY(0) rotate(360deg)',  // Final position at the center and fully spun
            opacity: '1',  // Fully visible
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none', /* For Firefox */
          '-ms-overflow-style': 'none', /* For IE and Edge */
        },
        '.scrollbar-none::-webkit-scrollbar': {
          display: 'none', /* For Chrome, Safari, and Opera */
        },
      });
    },
  ],
}

