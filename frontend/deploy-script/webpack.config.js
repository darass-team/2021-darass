const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

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
  plugins: [new CleanWebpackPlugin(), new UglifyJsPlugin()],
  resolve: {
    extensions: [".jsx", ".js"]
  },
  devtool: "source-map",
  mode: "production"
};
