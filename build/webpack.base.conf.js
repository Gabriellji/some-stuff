const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  //   savannah: path.join(__dirname, '../src/minigames/savannah'),
  //   fillword: path.join(__dirname, '../src/minigames/fillword'),
  //   main: path.join(__dirname, '../src/main'),
  //   audiocall: path.join(__dirname, '../src/minigames/audio-call'),
  //   speakit: path.join(__dirname, '../src/minigames/speakit'),
  //   sprint: path.join(__dirname, '../src/minigames/sprint'),
  //   englishpuzzle: path.join(__dirname, '../src/minigames/englishpuzzle'),
  assets: 'assets',
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  resolve: {
    alias: {
      app: PATHS.src,
    //   speakit: PATHS.speakit,
    //   savannah: PATHS.savannah,
    //   fillword: PATHS.fillword,
    },
    extensions: ['.js'],
  },
  entry: {
    promo: `${PATHS.src}/js/main.js`,
    // audiocall: `${PATHS.audiocall}/audiocall.js`,
    // main: `${PATHS.main}/js/main.js`,
    // speakit: `${PATHS.speakit}/speakit.js`,
    // sprint: `${PATHS.sprint}/index-sprint.js`,
    // englishpuzzle: `${PATHS.englishpuzzle}/index.js`,
    // fillword: `${PATHS.fillword}/fillword.js`,
    // savannah: `${PATHS.savannah}/savannah.js`,
  },
  output: {
    filename: `${PATHS.assets}/js/[name].[hash].js`,
    path: PATHS.dist,
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [
        /(node_modules|dist|public)/,
      ],
      use: ['babel-loader', 'eslint-loader'],
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: './build/postcss.config.js' } },
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    }, {
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    }, {
      test: /\.(wav|mp3)$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/css/[name].[contenthash].css`,
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
      chunks: ['promo'],
    }),
    // new HtmlWebpackPlugin({
    //   template: `${PATHS.main}/index.html`,
    //   filename: './main/index.html',
    //   chunks: ['main'],
    // }),
    // new HtmlWebpackPlugin({
    //   template: `${PATHS.speakit}/index.html`,
    //   filename: './speakit/index.html',
    //   chunks: ['speakit'], // include exact this chunk of needed code
    // }),
    // new HtmlWebpackPlugin({
    //   template: `${PATHS.sprint}/index.html`,
    //   filename: './sprint/index.html',
    //   chunks: ['sprint'],
    // }),
    // new HtmlWebpackPlugin({
    //   template: `${PATHS.audiocall}/index.html`,
    //   filename: './audiocall/index.html',
    //   chunks: ['audiocall'],
    // }),
    // new HtmlWebpackPlugin({
    //   template: `${PATHS.savannah}/index.html`,
    //   filename: './savannah/index.html',
    //   chunks: ['savannah'],
    // }),
    // new HtmlWebpackPlugin({
    //   template: `${PATHS.englishpuzzle}/index.html`,
    //   filename: './englishpuzzle/index.html',
    //   chunks: ['englishpuzzle'], // include exact this chunk of needed code
    // }),
    // new HtmlWebpackPlugin({
    //   template: `${PATHS.fillword}/index.html`,
    //   filename: './fillword/index.html',
    //   chunks: ['fillword'],
    // }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/img`,
        to: `${PATHS.assets}/img`,
      },
      //   {
      //     from: `${PATHS.src}/audio`,
      //     to: `${PATHS.assets}/audio`,
      //   },
      {
        from: `${PATHS.src}/static`,
        to: '',
      },
    ]),
  ],
};
