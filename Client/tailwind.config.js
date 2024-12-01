/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0072DC',
        paginationBox: '#EBEBEB',
        tableHead: '#595959',
        tableBody: '#626262',
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(235deg, rgba(217, 217, 217, 0.00) 12.27%, rgba(18, 19, 22, 0.70) 45%, #121316 85%, #121316 130%)",
        "summarize_gradient":
          "linear-gradient(to bottom right, rgba(0, 45, 191, 0.2) 7%, rgba(67, 150, 247, 0.5) 46%, rgba(255, 155, 210, 0.5) 81%, rgba(201, 255, 252, 0.5) 99%)",
        "question_gradient":
          "linear-gradient(to bottom right, rgba(0, 45, 191) 7%, rgba(67, 150, 247) 46%, rgba(255, 155, 210) 81%, rgba(201, 255, 252) 99%)",
      },
    },
  },
  plugins: [],
}