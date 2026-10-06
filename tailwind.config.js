/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f5fc',
          100: '#e0ecfb',
          200: '#bed3f4',
          300: '#83ace8',
          400: '#4b82d9',
          500: '#2260be',
          600: '#174a96',
          700: '#0f3775',
          800: '#0a2959',
          900: '#071f43', // Royal Temple Navy from logo and Image 2 header
          950: '#04132b', // Deep midnight navy
        },
        gold: {
          50:  '#fdfbf7',
          100: '#faf2df',
          200: '#f4e3be',
          300: '#ebd094',
          400: '#dfbb66',
          500: '#d4a359', // Rich Temple Gold from logo gopuram, lotus, and CTA buttons
          600: '#bc8a38',
          700: '#986c24',
          800: '#77531d',
          900: '#553a15',
          950: '#332109',
        },
        forest: {
          50:  '#f0f7f3',
          100: '#deede4',
          200: '#beddcb',
          300: '#95c5ac',
          400: '#66a788',
          500: '#3f8967',
          600: '#2a6e4f',
          700: '#1c573d',
          800: '#165b3d', // Temple Forest Green from Image 2 trust badges and eyebrow
          900: '#0e3b2b', // Deep Heritage Green from Image 2 headings
          950: '#08241a',
        },
        cream: '#faf8f4',
      },
      fontFamily: {
        sans:    ['Inter','system-ui','sans-serif'],
        display: ['Playfair Display','Georgia','serif'],
        accent:  ['Cormorant Garamond','Georgia','serif'],
        script:  ['Caveat','cursive'],
      },
      backgroundImage: {
        'navy-radial': 'radial-gradient(ellipse at 30% 40%, #0f3775 0%, #071f43 55%, #04132b 100%)',
      },
      boxShadow: {
        'gold': '0 4px 20px -4px rgba(212,163,89,0.38)',
      },
    },
  },
  plugins: [],
};

