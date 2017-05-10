"use strict"

const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require("path")

module.exports = {
  entry: {
    index: ["./index.html", "./src/index.js"]
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loaders: ["raw-loader"]
      }, {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  node: {
    fs: "empty",
    module: "empty",
    net: "empty"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "index.html", to: "index.html" },
      { from: "node_modules/antd/dist/antd.min.css", to: "antd.min.css"}
    ])
  ],
  target: "web"
}
