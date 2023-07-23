/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./**/*.{html,js,vue}",
   'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
   'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
   theme: {
     extend: {},
   },
   plugins: [require("daisyui"), require('flowbite/plugin')],
 }