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
    host: '172.21.129.118',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://192.168.177.131:5000',
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
