const path = require('path');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    register: './src/register/app.js',
    login: './src/login/app.js',
    'desk-calendar': './src/desk-calendar/app.js',
    hub: './src/hub/app.js',
    'create-new-calendar': './src/create-new-calendar/app.js',
  },
  output: {},
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/i,
        type: 'asset/resource',
      },
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
        sourceMap: true,
        cache: true,
        uglifyOptions: {
          //   warnings: false,
          //   parse: {},
          //   compress: {},
          //   mangle: true, // Note `mangle.properties` is `false` by default.
          //   output: null,
          //   toplevel: false,
          //   nameCache: null,
          //   ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
};
