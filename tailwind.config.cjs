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
        montserrat: "'Montserrat', sans-serif",
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
        'sudo-grad-navbar':
          'linear-gradient(180deg, #C99752 -80.21%, #4D2A0C 70.83%)',
        'sudo-grad-btn': 'linear-gradient(to top, #4D2A0C, #C89652)',
        'sudo-grad-btn-cancel': 'linear-gradient(to top, #DD3916, #E18838)',
        'sudo-grad-card': 'linear-gradient(to right, #C89652, #F2DF93)',
        'sudo-grad-modal': 'linear-gradient(to top, #E0C79F, #F2DF93)',
        'sudo-grad-kesanpesan-input':
          'linear-gradient(180deg, #C89652 0%, #F2DF93 97.92%, #E0C79F 100%)',
        'sudo-grad-kesanpesan-card':
          'linear-gradient(96.86deg, #C89652 0%, #F2DF93 100%)',
      },
      boxShadow: {
        textarea: '0 2px 4px 0 rgb(0 0 0 / 0.25)',
      },
    },
  },
  plugins: [],
};
