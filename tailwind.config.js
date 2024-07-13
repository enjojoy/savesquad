const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {

    
    extend:{
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'vt323': ['VT323', 'monospace'],
          'roboto-mono': ['"Roboto Mono"', 'monospace'],
      },
      colors: {
        'beige': '#F1F1F1',
        'brown': '#655561',
        'purple': '#9670FA',
        'azure':'#10C2A2',
      },
    }

  },
  plugins: [
    flowbite.plugin(),
  ],
}