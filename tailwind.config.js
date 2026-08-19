/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            50: '#eef4ff',
            100: '#d9e6ff',
            200: '#b3ccff',
            300: '#82adff',
            400: '#4d82ff',
            500: '#245bea',
            600: '#1642c4',
            700: '#122f92',
            800: '#0f2570',
            900: '#0a1a4d',
            950: '#060f2e'
          },
          gold: {
            300: '#ffe38a',
            400: '#ffd24d',
            500: '#ffc107',
            600: '#e6a800',
            700: '#b88400'
          }
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Segoe UI"', 'sans-serif']
      },
      boxShadow: {
        card: '0 4px 14px rgba(10, 26, 77, 0.15)',
        'card-dark': '0 4px 18px rgba(0, 0, 0, 0.45)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
}
