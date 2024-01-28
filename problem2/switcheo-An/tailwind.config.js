/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    backgroundImage: {
      'gradient-bubblegum': 'linear-gradient(139.73deg,#e5fdff,#f3efff)',
    },
    colors: {
      input: {
        text: '#eeeaf4',
      },
      modal: {
        backdrop: '#280d5f99',
      },
    },
  },
};
export const plugins = [];
