const path = require('path');

module.exports = {
  entry: {
    register: './src/register/app.js',
    login: './src/login/app.js',
    deskCalendars: './src/desk-calendar/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].webpack.bundle.js',
  },
};