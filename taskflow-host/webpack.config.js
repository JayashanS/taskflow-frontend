const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const packageJson = require("./package.json");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    port: 4000,
    static: [
      {
        directory: path.join(__dirname, "dist"),
      },
      {
        directory: path.join(__dirname, "public"),
      },
    ],
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:4000/",
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
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        exclude: /googleapis\.com/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[hash][ext]",
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name].[hash][ext][query]",
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        task_management: "task_management@http://localhost:4002/remoteEntry.js",
      },
      exposes: {
        "./store": "./src/store/store",
        "./useAuth": "./src/hooks/useAuth",
        "./taskSlice": "./src/store/slices/taskSlice",
        "./userSlice": "./src/store/slices/userSlice",
        "./messageSlice": "./src/store/slices/messageSlice",
        "./userSearchSlice": "./src/store/slices/userSearchSlice",
        "./taskInterface": "./src/interfaces/taskInterface",
        "./userInterface": "./src/interfaces/userInterface",
        "./globalTypes": "./src/interfaces/globalTypes",
        "./ThemeProvider": "./src/theme/ThemeProvider",
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
      favicon: "./public/favicon.ico",
    }),
    new Dotenv(),
  ],
};
