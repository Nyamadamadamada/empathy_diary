const { transform } = require('typescript');

module.exports = {
  mode: 'jit',
  content: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  },
  theme: {
    minWidth: {
      40: '10rem',
      60: '15rem',
      80: '20rem',
      100: '25rem',
    },
    maxWidth: {
      120: '30rem',
      160: '40rem',
      200: '50rem',
    },
    extend: {
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'fade-fast': 'fade-in 500ms ease forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(-6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animationDelay: {
        0: '0ms',
        100: '100ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        600: '600ms',
        700: '700ms',
        1000: '1000ms',
        1500: '1500ms',
        2000: '2000ms',
        3000: '3000ms',
        4000: '4000ms',
        5000: '5000ms',
        6000: '6000ms',
        // 必要に応じて追加
      },
    },
  },
  variants: {},
  plugins: [
    require('daisyui'),
    function ({ addUtilities }) {
      const newDelays = {
        '.delay-0': { animationDelay: '0ms' },
        '.delay-100': { animationDelay: '100ms' },
        '.delay-200': { animationDelay: '200ms' },
        '.delay-300': { animationDelay: '300ms' },
        '.delay-400': { animationDelay: '400ms' },
        '.delay-500': { animationDelay: '500ms' },
        '.delay-600': { animationDelay: '600ms' },
        '.delay-700': { animationDelay: '700ms' },
        '.delay-1000': { animationDelay: '1000ms' },
        '.delay-1500': { animationDelay: '1500ms' },
        '.delay-2000': { animationDelay: '2000ms' },
        '.delay-3000': { animationDelay: '3000ms' },
        '.delay-4000': { animationDelay: '4000ms' },
        '.delay-5000': { animationDelay: '5000ms' },
        '.delay-6000': { animationDelay: '6000ms' },
      };
      addUtilities(newDelays, ['responsive']);
    },
  ],
  daisyui: {
    themes: ['emerald'],
  },
};
