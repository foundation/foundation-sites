module.exports = {
  entry: './js/entries/foundation.js',
  output: {
    path: './_build/assets/js/',
    filename: 'foundation.js',
    libraryTarget: 'umd'
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    loaders: [
    ],
    rules: [
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
      }
    ]
  }
};
