/* eslint-disable */
module.exports = {
  purge: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      animation: {
        fadeInFast: 'fadeIn ease 2s',
        fadeInMedium: 'fadeIn ease 4s',
        fadeInSlow: 'fadeIn ease 6s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
