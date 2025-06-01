/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c1d8ff',
          300: '#93baff',
          400: '#5f94ff',
          500: '#3366ff',
          600: '#1f4cff',
          700: '#1537e6',
          800: '#172B4D',
          900: '#101e36',
        },
        secondary: {
          50: '#f0f5ff',
          100: '#e5f0ff',
          200: '#cce0ff',
          300: '#99c0ff',
          400: '#66a3ff',
          500: '#3380ff',
          600: '#0066ff',
          700: '#0055d4',
          800: '#0044aa',
          900: '#003380',
        },
        accent: {
          50: '#fff0f0',
          100: '#ffe0e0',
          200: '#ffc1c1',
          300: '#ffa3a3',
          400: '#ff7a7a',
          500: '#FF5A5F',
          600: '#ff1a1a',
          700: '#e60000',
          800: '#cc0000',
          900: '#a30000',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
    },
  },
  plugins: [],
}
