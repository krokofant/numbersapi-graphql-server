var path = require("path")
var nodeExternals = require("webpack-node-externals")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.gql$/,
        use: "raw-loader"
      }
    ]
  },
  resolve: {
    alias: {
      GQLSchema$: path.resolve(__dirname, "src/schema/types.gql"),
      Utils: path.resolve(__dirname, "src/utils")
    }
  },
  watch: true,
  devtool: "cheap-module-eval-source-map"
}
