const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  target: "web",
  entry: {
    contentScript: path.join(__dirname, "src/content/index.ts"),
    background: path.join(__dirname, "src/background/index.ts"),
    react: path.join(__dirname, "./src/react/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("manifest.json"),
          to: path.resolve("dist"),
        },
      ],
    }),
    new Dotenv({
      path: path.resolve(__dirname, ".env.local"),
      safe: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
    },
  },
};
