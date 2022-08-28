/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        'sudo-title': "'Hertical Serif', serif",
        'sudo-body': "'Book Antiqua', serif",
      },
      colors: {
        'sudo-dark-brown': '#4D2A0C',
        'sudo-orange': '#E18838',
        'sudo-dark-tan': '#E0C79F',
        'sudo-tan': '#F2DF93',
        'sudo-green': '#4FAC77',
        'sudo-red': '#DD3916',
        'sudo-gradtext-dark': '#3A1A0D',
        'sudo-gradtext-light': '#C99752',
      },
      backgroundImage: {
        'sudo-grad1': 'linear-gradient(to top, #4D2A0C, #C99752)',
        'sudo-grad2': 'linear-gradient(to top, #3A1A0D, #C99752)',
        'sudo-grad3': 'linear-gradient(to top, #4D2A0C, #C99752)',
        'sudo-grad-btn': 'linear-gradient(to top, #4D2A0C, #C89652)',
        'sudo-grad-btn-cancel': 'linear-gradient(to top, #DD3916, #E18838)',
        'sudo-grad-card': 'linear-gradient(to right, #C89652, #F2DF93)',
      },
    },
  },
  plugins: [],
};
