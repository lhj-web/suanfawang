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
    port: 80,
    proxy: {
      '/api': {
        target: '',// 真实服务器地址和端口
        changeOrigin: true,
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
  // productionSourceMap: true,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
};
