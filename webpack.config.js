module.exports = {

  output: {
    library: 'onlyIf',
    libraryTarget: 'umd',
  },

  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  }],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        plugins: ['add-module-exports'],
      },
    }],
  },

};
