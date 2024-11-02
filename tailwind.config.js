/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customSand: '#BFA26B',
        customPurple: {
          light: '#D6BCFA', // Light purple
          DEFAULT: '#9F7AEA', // Primary purple
          dark: '#6B46C1', // Dark purple
        },
      },
    },
  },
  plugins: [],
}
