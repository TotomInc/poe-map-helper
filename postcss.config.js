/* eslint-disable global-require */
module.exports = {
  plugins: [require('postcss-preset-env')({ stage: 0 }), require('tailwindcss')(), require('autoprefixer')()]
};
