/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8) 25%, rgba(0, 0, 0, 0) 40%)",
        "card-gradient": "linear-gradient(to top, #d249ec70, #80008000)",
      },
    },
  },
  plugins: [],
};
