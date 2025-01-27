import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Montserrat",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
