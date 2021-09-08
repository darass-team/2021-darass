const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const DotEnv = require("dotenv-webpack");
const Package = require("./package.json");

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `manage-${Package.version.replace("^", "")}.js`,
    publicPath: "/"
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
              plugins: [
                "@babel/transform-runtime",
                ["babel-plugin-remove-react-jsx-attribute", { attributes: ["data-testid"] }]
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
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
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin(),
    new DotEnv()
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: { "@": path.resolve(__dirname, "src") }
  },
  devtool: process.env.BUILD_MODE === "development" ? "source-map" : false,
  mode: process.env.BUILD_MODE,
  devServer: {
    host: "localhost",
    port: 3001,
    historyApiFallback: true,
    open: true,
    hot: true
  }
};

module.exports = config;
