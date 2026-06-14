const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => ({
  entry: "./src/main.ts",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfe_angular",
      filename: "remoteEntry.js",
      exposes: {
        // Exposes a framework-agnostic mount/unmount API.
        // Consumed by the shell's AngularMfeLoader component.
        "./bootstrap": "./src/bootstrap.ts",
      },
      shared: {
        "zone.js": { singleton: true, eager: true },
        "@angular/core": { singleton: true, strictVersion: false },
        "@angular/common": { singleton: true, strictVersion: false },
        "@angular/platform-browser": { singleton: true, strictVersion: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    port: 3003,
    headers: { "Access-Control-Allow-Origin": "*" },
    static: { directory: path.join(__dirname, "dist") },
    hot: true,
  },
  output: {
    publicPath: "auto",
    clean: true,
  },
});
