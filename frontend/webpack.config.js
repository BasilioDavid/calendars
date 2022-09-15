const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

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
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map',
      publicPath: 'https://example.com/project/',
      fileContext: 'public',
    }),
  ],
};
