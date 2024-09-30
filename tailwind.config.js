/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
            "./src/input.css"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss')
  ],
}

