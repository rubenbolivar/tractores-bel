/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bel-green': {
          50: '#f0f9f4',
          100: '#daf2e4',
          200: '#b8e4cd',
          300: '#89d1ad',
          400: '#54b587',
          500: '#367C2B', // Color principal BEL
          600: '#2d6723',
          700: '#25521d',
          800: '#204119',
          900: '#1c3617'
        },
        'bel-yellow': {
          DEFAULT: '#FFDE00',
          dark: '#E5C800'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
};
