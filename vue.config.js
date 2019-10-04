const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const IN_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin({
      //   analyzerPort: IN_PRODUCTION ? 8889 : 8888
      // })
    ],
  },
};
