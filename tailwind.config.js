/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          4: "#D3DCDE",
          5: "#F4F6F7"
        },
        "light-blue": {
          1: "#22302E",
          2: "#A8EEE7",
          3: "#D3F7F3",
          4: "#EEFCFA"
        },
        text: {
          secondary: "#354959",
          primary: "#021C2F",
          tertiary: "#808D97"
        },
        background: {
          secondary: "#071012",
          "secondary-2": "#A8EEE7"
        },
        green: "#008E5B",
        amber: "#EE8100",
        accent: {
          tertiary: "#224E59",
          primary: "#B0100D",
          secondary: "#A8EEE7"
        },
        grey: {
          dark: {
            1: "",
            2: "",
            3: "",
            4: "#F2F4F5"
          }
        },
        "light-green": "#EFFFE1",
        "light-red": "#FFF4F4",
        green: {
          0: "#11240E",
          1: "#55b648",
          2: "#aadba3",
          3: "#ddf0da",
          4: "#f6fbf6",
          base: "#4EA507"
        },
        "dark-green": {
          0: "#041401",
          1: "#136207",
          2: "#89b083",
          3: "#d0e0cd",
          4: "#f3f7f3"
        },
        yellow: {
          0: "#323007",
          1: "#fcee21",
          2: "#fdf790",
          3: "#fefcd3",
          4: "#fffef4"
        },
        semantics: {
          error: "#dd2418",
          amber: "#df9900",
          success: "#24c790"
        },
        "portal-bg": "#f8f9fa",
        "input-filled": "#dadcdd"
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

