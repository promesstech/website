/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "primary": "#101216",
        "light-primary": "#363C4E",
        "dark-primary": "#303030",
        "very-dark-primary": "#151821",
        "secondary": "#6B7480",
        "very-light-secondary": "#8F9BAA",
        "light-secondary": "#3D434B",
        "dark-secondary": "#353A41",
        "very-dark-secondary": "#25292e",
        "accent": "#6366f1",
        "error": "#f87171",
        "blurple": "#454FBF",
        "blue-1": "#3CFFFF",
        "blue-2": "#3CA1FF",
        "blue-3": "#3C67FF",
        "blue-4": "#3F3CFF",
        "blue-5": "#2D43B2",
        "blue-6": "#112D74",
        "blue-7": "#9868FF",
        "blue-8": "#7331FF",
        "blue-9": "#4200FF",
        "blue-10": "#400E73",
      },
      spacing: {
        "84": "22rem",
        "108": "28rem",
        "120": "32rem",
        "1xx": "100px",
        "2xx": "200px",
        "3xx": "300px",
        "4xx": "400px",
        "5xx": "500px",
        "6xx": "600px",
        "7xx": "700px",
        "8xx": "800px",
        "9xx": "900px",
        "10xx": "1000px",
        "11xx": "1100px",
        "12xx": "1200px",
        "1/12": "8.33333333%",
      },
      fontSize: {
        "mini": "0.5rem",
        "tiny": "0.6rem",
        "10xl": "10rem",
        "11xl": "12rem",
      },
      minWidth: {
        "sm": "30px",
        "1xx": "100px",
        "2xx": "200px",
      },
      maxWidth: {
        "1xx": "100px",
        "2xx": "200px",
      },
    },
    screens: {
      "xl": { max: "1450px" },
      "2lg": { max: "1280px" },
      "lg": { max: "1100px"},
      "2md": { max: "900px" },
      "md": { max: "768px" },
      "sm": { max: "640px" },
      "2xs": { max: "500px" },
      "xs": { max: "380px" },
      "tiny": { max: "300px" },
    },
  },
  plugins: [],
}
