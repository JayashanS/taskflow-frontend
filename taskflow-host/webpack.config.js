const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    port: 4000,
    static: {
      directory: path.join(__dirname, "dist"),
    },
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
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        admin_dashboard: "admin_dashboard@http://localhost:4001/remoteEntry.js",
        task_management: "task_management@http://localhost:4002/remoteEntry.js",
        user_dashboard: "user_dashboard@http://localhost:4003/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
