/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D3F1DF',
        secondary: '#85A98F',
        accent: '#5A6C57',
        dark: '#525B44',
      },
    },
  },
  plugins: [],
};
