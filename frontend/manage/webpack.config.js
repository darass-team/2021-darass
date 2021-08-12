const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { DefinePlugin } = require("webpack");
const { DotEnv } = require("webpack-dotenv");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
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
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new DefinePlugin({
      "process.env.KAKAO_REST_API_KEY": JSON.stringify(process.env.KAKAO_REST_API_KEY),
      "process.env.KAKAO_JAVASCRIPT_API_KEY": JSON.stringify(process.env.KAKAO_JAVASCRIPT_API_KEY),
      "process.env.BUILD_MODE": JSON.stringify(process.env.BUILD_MODE),
      "process.env.SENTRY_MANAGE_PAGE_DSN": JSON.stringify(process.env.SENTRY_MANAGE_PAGE_DSN)
    }),

    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  devtool: process.env.BUILD_MODE === "development" ? "source-map" : false,
  mode: "production", //process.env.BUILD_MODE,
  devServer: {
    host: "localhost",
    port: 3001,
    historyApiFallback: true,
    open: true,
    hot: true
  }
};

if (!process.env.KAKAO_JAVASCRIPT_API_KEY) {
  config.plugins.push(new DotEnv());
}

module.exports = config;
