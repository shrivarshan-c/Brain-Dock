/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",

  ],
  theme: {

    extend: {
        colors:{
            600:"#F22929",
            300:"#F2F2F2"
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            heading: ['Poppins', 'sans-serif'],
            display: ['Playfair Display', 'serif'],
            fancy: ['Raleway', 'sans-serif'],
            code: ['Fira Code', 'monospace'],
          },
          screens: {
            'custom-xl':'1200px'
          },



    },

  },
  plugins: [],
}
