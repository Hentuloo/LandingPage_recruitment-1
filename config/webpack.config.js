const path = require('path');
const {
   CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      filename: 'scripts/main-[contenthash:6].js',
      path: path.resolve(__dirname, '../', 'build'),
   },
   module: {
      rules: [
         {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: 'fonts/[folder]/[name].[ext]',
                     outputPath: 'assets',
                  },
               },
            ],
         },
         {
            test: /\.s[ac]ss$/i,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader',
            ],
         },
         {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
                  plugins: [
                     '@babel/plugin-proposal-class-properties',
                  ],
               },
            },
         },
      ],
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
         filename: '[name]-[contenthash:6].css',
      }),
      new CopyPlugin([
         { from: 'src/assets', to: 'assets' },
      ]),
   ],
   devServer: {
      open: true,
      port: 3000,
   },
};
