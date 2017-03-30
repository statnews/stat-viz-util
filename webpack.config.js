const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'stat-viz-util.js'
  },
  target: 'node',
  externals: [nodeExternals()]
};

module.exports = config;
