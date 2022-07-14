/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js.jsx,ts,tsx}"],
  important: "#root",
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      textColor: {
        primary: "#cfd8dc",
      },
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        // "#00887A"
        "main-bg": "#77A6F7",
        "light-grayBlue": "#D3E3FC",
        "light-pink": "FFCCBC",
        "side-bar-bg": "#FFFFFF",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      rotate: {
        360: "360deg",
      },
    },
  },
  plugins: [],
};
