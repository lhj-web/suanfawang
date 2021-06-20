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
    host: '172.21.182.144',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://192.168.254.128:5000',
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
