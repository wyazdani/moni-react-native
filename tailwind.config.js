/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "rgba(155, 0, 255, 1)",
        white: "rgb(250,250,250)",
        black: "rgba(47, 47, 47, 1)",
        gray: "rgba(122, 122, 122, 1)",
        border: "rgba(122, 122, 122, 0.15)",
        error: "rgba(234, 67, 53, 1)",
      },
    },
    fontFamily: {
      "inter-regular": "InterRegular",
      "inter-medium": "InterMedium",
      "inter-italic": "InterItalic",
      "poppins-medium": "PoppinsMedium",
      "poppins-semibold": "PoppinsSemiBold",
    },
  },
  plugins: [],
};
