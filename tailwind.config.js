/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "emerald-gradient": "linear-gradient(to bottom left, #059669, #047857)",
      }
    },
  },
  plugins: [],
}