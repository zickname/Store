const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'primary': '#6c6cef',
        'primary-dark': '#3e3eea',
        'primary-light': '#9a9af4',
        'primary-content': '#ffffff',
        'alert-error': '#aa77f1',
      },
      backgroundColor: {
        'primary': '#6c6cef',
        'primary-dark': '#3e3eea',
        'primary-light': '#9a9af4',
        'primary-content': '#ffffff',

        /* ErrorColor */
        'alert-error': '#aa77f1',
      },
      screens: {
        sm: '480px',
      }
    },
  },
  plugins: [
   plugin (function ({ addUtilities }) {
      addUtilities({
        '.shp-button': {
          '@apply flex justify-center items-center text-white bg-primary-light border-none rounded-xl w-full p-0.5 text-base font-medium cursor-pointer transition-colors select-none': {},
          '&:hover': {
            '@apply bg-primary': {},
          },
          '&:active': {
            '@apply bg-primary': {},
          },
          '&:disabled': {
            '@apply bg-primary-content cursor-default': {},
          },
        },
        '.cart-item__btn-change, .product-card__increment-btn': {
          '@apply w-8 h-8 p-2': {},
        }
      })
    })
  ],
};

