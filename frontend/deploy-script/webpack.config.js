const { DefinePlugin } = require("webpack");

const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "embed.js",
    publicPath: "/",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
              plugins: ["@babel/transform-runtime"]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new DefinePlugin({ "process.env.BUILD_MODE": JSON.stringify(process.env.BUILD_MODE) })],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: { "@": path.resolve(__dirname, "src") }
  },
  devtool: process.env.BUILD_MODE !== "production" ? "source-map" : false,
  mode: process.env.BUILD_MODE === "development" ? "development" : "production"
};
