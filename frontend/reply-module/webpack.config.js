const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic"
                  }
                ],
                "@babel/preset-typescript"
              ],
              plugins: [["@babel/transform-runtime"]]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    host: "localhost",
    port: 3000,
    historyApiFallback: true,
    open: true
  }
};
