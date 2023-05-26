/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1ED760",
        "black": "#1A1A1A",
        "grey": "#828282"
      },

      fontFamily: {
        sans: ["PublicSans", "san-serif"]
      }
    },
  },
  plugins: [],
}

