/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f5f6f8',
        ink: '#363636',
        coral: '#ff7c7e',
        action: '#3864e8',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
