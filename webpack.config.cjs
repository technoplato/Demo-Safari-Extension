const path = require("path");

module.exports = {
  entry: {
    content: "./src/content.js",
    inject: "./src/inject.js",
  },
  output: {
    filename: (pathData) => {
      if (pathData.chunk.name === 'content') {
        return 'content.js';
      }
      if (pathData.chunk.name === 'inject') {
        return 'inject.bundle.js';
      }
      return '[name].js';
    },
    path: path.resolve(
      __dirname,
      "Demo Safari Extension Extension",
      "Resources"
    ),
    library: "UniqueNewYorkWallet", // Expose the library globally
    libraryTarget: "umd",  // Universal Module Definition, works in various environments
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