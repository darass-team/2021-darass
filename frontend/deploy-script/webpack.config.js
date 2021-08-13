const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");

const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "embed.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({ "process.env.BUILD_MODE": JSON.stringify(process.env.BUILD_MODE) })
  ],
  resolve: {
    extensions: [".jsx", ".js"]
  },
  devtool: "source-map",
  mode: process.env.BUILD_MODE
};
