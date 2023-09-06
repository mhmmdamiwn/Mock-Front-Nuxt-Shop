/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
   content: ["./**/*.{html,js,vue}"],
   theme: {
    colors: {
      color1: '#e2e8f0',
      color2 : '#ffffff',
      white : '#ffffff',
      attention : '#3b82f6',
      about : '#fde047',
      footer : '#64748b',
      black : 'f000000',
      red : '#ef4444'
      // ...
    },
     extend: {},
   },
   plugins: [require("daisyui")],
 }