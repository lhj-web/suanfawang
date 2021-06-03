module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        router: '@/router',
        store: '@/store',
        views: '@/views',
        api: '@/api',
        utils: '@/utils',
      },
    },
  },
  devServer: {
    proxy: 'http://localhost:3000',
  },
  productionSourceMap: true,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
};
