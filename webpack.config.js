const path = require("path");

module.exports = {
  entry: "./src/content.js",
  output: {
    filename: "content.js",
    path: path.resolve(
      __dirname,
      "Demo Safari Extension Extension",
      "Resources"
    ),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
