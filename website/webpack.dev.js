const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js"
  },
  devtool: "source-map",
  watch: true,
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new CopyWebpackPlugin([
      {
        from: "./node_modules/bulma/css/bulma.min.css",
        to: "./css/bulma.min.css"
      }
    ]),
    new webpack.DefinePlugin({
      API_BASE_URL: JSON.stringify("https://div-api.trouchon.com")
    })
  ],
  stats: {
    // copied from `'minimal'`
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: false,
    // our additional options
    moduleTrace: true,
    errorDetails: true
  }
};
