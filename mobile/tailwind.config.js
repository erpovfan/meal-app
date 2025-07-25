/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors : {
        primary : '#030014' ,
        secondary : '#151312' ,
        light : {
          100 : '#d6c6ff' , 
          200 : '#a8b5db' , 
          300 : '#9ca4ab'
        } , 
        dark : {
          100 : '#221f3d' ,
          200 : '#0f0d23'
        } , 
        accent : '#ab8bff'
      }
    },
  },
  plugins: [],
}