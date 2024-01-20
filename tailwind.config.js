/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    colors: {
      ...colors,
      "grey-1": "var(--color-grey-1)",
      "grey-2": "var(--color-grey-2)",
    },
    extend: {},
  },
  plugins: [],
};
