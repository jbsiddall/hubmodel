const path = require("path")

module.exports = {
  mode: 'development',
  entry : {
    cli: "./src/cmd.ts",
    main: "./src/index.ts",
  },
  output : {
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
        {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }
    ]
  },
  resolve: {
    extensions: ['.ts'],
  },
}