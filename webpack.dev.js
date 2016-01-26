import webpack              from 'webpack';
import assign               from 'object-assign';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import prodCfg              from './webpack.prod.config.js';

Object.assign = assign;

export default function (app) {
  const config = Object.assign(prodCfg, {
    devtool: 'cheap-module-inline-source-map',
    entry:   [
      'webpack-hot-middleware/client',
      './client'
    ],
    module: {
      loaders: [
        {
          test:    /\.jsx?$/,
          exclude: /node_modules/,
          loader:  'babel',
          query:   {
            plugins: [
              [
                'react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports:   ['react'],
                  locals:    ['module']
                }]
              }
              ]
            ]
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __DEVELOPMENT__: true,
      })
    ]
  });

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
}
