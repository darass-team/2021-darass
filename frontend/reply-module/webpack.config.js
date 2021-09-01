const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const DotEnv = require("dotenv-webpack");
const Package = require("./package.json");

const config = {
  entry: { replyModule: "./src/index.tsx", modal: "./src/Modal.tsx" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `[name]-${Package.version.replace("^", "")}.js`
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["replyModule"],
      template: "./public/index.html"
    }),
    new HtmlWebpackPlugin({
      filename: "modal.html",
      chunks: ["modal"],
      template: "./public/modal.html"
    }),
    new CleanWebpackPlugin(),
    new DotEnv()
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  devtool: process.env.BUILD_MODE === "development" ? "source-map" : false,
  mode: process.env.BUILD_MODE,
  devServer: {
    host: "localhost",
    port: 3000,
    historyApiFallback: true,
    open: true
  }
};

module.exports = config;
