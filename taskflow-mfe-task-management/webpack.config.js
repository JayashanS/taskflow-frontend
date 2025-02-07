const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const packageJson = require("./package.json");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    port: 4002,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: false,
  },
  output: {
    publicPath: "http://localhost:4002/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "task_management",
      filename: "remoteEntry.js",
      exposes: {
        "./TaskModule": "./src/modules/TaskModule",
        "./TaskTable2": "./src/components/TaskTable",
        "./TaskForm2": "./src/components/TaskForm",
      },
      remotes: {
        host: "host@http://localhost:4000/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
        "react-redux": {
          singleton: true,
          requiredVersion: packageJson.dependencies["react-redux"],
        },
        "@reduxjs/toolkit": {
          singleton: true,
          requiredVersion: packageJson.dependencies["@reduxjs/toolkit"],
        },
        antd: { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
