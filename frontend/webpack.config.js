const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// module.exports = {
//   entry: {
//     register: './src/register/app.js',
//     login: './src/login/app.js',
//     deskCalendars: './src/desk-calendar/app.js',
//     hub: './src/hub/app.js',
//     'create-new-calendar': './src/create-new-calendar/app.js',
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].webpack.bundle.js',
//   },
//   devtool: false,
//   plugins: [
//     new webpack.SourceMapDevToolPlugin({
//       filename: 'sourcemaps/[file].map',
//       publicPath: 'https://example.com/project/',
//       fileContext: 'public',
//     }),
//   ],
// };

module.exports = {
  entry: {
    register: './src/register/app.js',
    login: './src/login/app.js',
    deskCalendars: './src/desk-calendar/app.js',
    hub: './src/hub/app.js',
    'create-new-calendar': './src/create-new-calendar/app.js',
  },
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: '[name].webpack.bundle.js',
  // },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/i,
        type: 'asset/resource',
      },
      // {
      //   test: /\.js$/i,
      //   type: 'asset/resource',
      // },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname),
          from: './src/**/*.html',
        },
        {
          context: path.resolve(__dirname),
          from: './src/**/*.css',
        },
      ],
    }),
    // new webpack.SourceMapDevToolPlugin({
    //   filename: 'sourcemaps/[file].map',
    //   publicPath: 'https://example.com/project/',
    //   fileContext: 'public',
    // }),
    new MiniCssExtractPlugin({
      // filename: './src/**/*.css',
    }),

    new UglifyJsPlugin({
      minify(file, sourceMap) {
        const extractedComments = [];

        // Custom logic for extract comments

        const { error, map, code, warnings } = require('uglify-js') // Or require('./path/to/uglify-module')
          .minify(file, {
            /* Your options for minification */
          });

        return { error, map, code, warnings, extractedComments };
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`

      // For `@swc/html`:
      //
      // HTML documents - HTML documents with `Doctype` and `<html>/`<head>`/`<body>` tags
      //
      // Options - https://github.com/swc-project/bindings/blob/main/packages/html/index.ts#L5
      //
      new HtmlMinimizerPlugin({
        minify: HtmlMinimizerPlugin.swcMinify,
        minimizerOptions: {},
      }),

      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cssnanoMinify,
        minimizerOptions: {},
      }),

      new UglifyJsPlugin({
        // sourceMap: true,
        // uglifyOptions: {
        //   warnings: false,
        //   parse: {},
        //   compress: {},
        //   mangle: true, // Note `mangle.properties` is `false` by default.
        //   output: null,
        //   toplevel: false,
        //   nameCache: null,
        //   ie8: false,
        //   keep_fnames: true,
        // },
      }),
    ],
  },
};
