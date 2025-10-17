const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    // Ignore unused microservice transport dependencies
    new webpack.IgnorePlugin({
      resourceRegExp: /^@grpc\/grpc-js$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@grpc\/proto-loader$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^kafkajs$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^mqtt$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^nats$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^ioredis$/,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^@nestjs\/websockets\/socket-module$/,
    }),
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
    }),
  ],
};
