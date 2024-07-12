const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      'press-start': ['"Press Start 2P"', 'cursive'],
    },

    extend:{
      colors: {
        'beige': '#F1F1F1',
        'brown': '#655561',
        'purple': '#9670FA',
        'azure':'#10C2A2'
      },
    }

  },
  plugins: [
    flowbite.plugin(),
  ],
}