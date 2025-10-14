import { COLORS } from "./src/constants/styles";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: COLORS,
    },
    fontFamily: {
      "inter-regular": "InterRegular",
      "inter-medium": "InterMedium",
      "inter-semibold": "InterSemiBold",
      "inter-italic": "InterItalic",
      "poppins-medium": "PoppinsMedium",
      "poppins-semibold": "PoppinsSemiBold",
    },
    screens: {
      sm: "360px", // Small devices
      md: "430px", // Medium devices
      lg: "600px", // Large phones / small tablets
      xl: "768px", // Tablets
    },
    fontSize: {
      // fontSize with corresponding line-height for consistent text rhythm
      sm: ["0.81rem", { lineHeight: "1.2rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.75rem", { lineHeight: "2.25rem" }],
      xl: ["2.5rem", { lineHeight: "3rem" }],
    },
  },
  plugins: [],
};
