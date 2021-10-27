const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const DotEnv = require("dotenv-webpack");
const { DefinePlugin, IgnorePlugin } = require("webpack");
const Package = require("./package.json");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `manage-${Package.version.replace("^", "")}.js`,
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
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new DefinePlugin({
      "process.env.BUILD_MODE": JSON.stringify(process.env.BUILD_MODE)
    }),
    process.env.KAKAO_REST_API_KEY
      ? new DefinePlugin({
          "process.env.KAKAO_REST_API_KEY": JSON.stringify(process.env.KAKAO_REST_API_KEY),
          "process.env.KAKAO_JAVASCRIPT_API_KEY": JSON.stringify(process.env.KAKAO_JAVASCRIPT_API_KEY),
          "process.env.SENTRY_MANAGE_PAGE_DSN": JSON.stringify(process.env.SENTRY_MANAGE_PAGE_DSN),
          "process.env.GITHUB_CLIENT_ID": JSON.stringify(process.env.GITHUB_CLIENT_ID),
          "process.env.NAVER_CLIENT_ID": JSON.stringify(process.env.NAVER_CLIENT_ID)
        })
      : new DotEnv()
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: { "@": path.resolve(__dirname, "src") }
  },
  devtool: process.env.BUILD_MODE !== "production" ? "source-map" : false,
  mode: process.env.BUILD_MODE === "localhost" ? "development" : process.env.BUILD_MODE,
  devServer: {
    host: "localhost",
    port: 3001,
    historyApiFallback: true,
    open: true,
    hot: true,
    https: {
      key: "./localhost-key.pem",
      cert: "./localhost.pem"
    }
  }
};

if (process.env.BUILD_MODE === "localhost") {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
