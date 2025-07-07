/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'], // Add Cairo font
        tajawal: ['Tajawal', 'sans-serif']
      },
    },
  },
  plugins: [],
}

