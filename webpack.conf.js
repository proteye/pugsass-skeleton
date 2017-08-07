import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

function makeWebpackConfig({watch = true, sourcemaps = false, debug = false}) {
  return {
    context: path.resolve(__dirname, 'app/scripts'),
    entry: {
      app: './app.js'
    },
    watch,
    bail: false,
    profile: true,
    output: {
      path: path.resolve(__dirname, 'dist/assets/scripts/'),
      filename: 'app.min.js',
      pathinfo: false
    },
    devtool: (sourcemaps || !debug) ? 'source-map' : 'eval',
    resolve: {
      extensions: ['.js']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'happypack/loader'
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        }
      ].filter(loader => loader)
    },
    plugins: [
      new HappyPack({
        loaders: ['babel-loader'],
        threads: 4,
        verbose: false
      }),
      new webpack.LoaderOptionsPlugin({
        debug
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: "vendor.min.js",
        minChunks: function (module, count) {
          return module.resource && module.resource.indexOf(path.resolve(__dirname, 'app/scripts')) === -1;
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      })
    ].concat(debug
      ? [new webpack.HotModuleReplacementPlugin()]
      : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, output: {comments: false}})
      ])
  };
}

export default makeWebpackConfig;
