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
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://47.98.188.254:8000',
        changeOrigin: true,
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
  productionSourceMap: true,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
};
