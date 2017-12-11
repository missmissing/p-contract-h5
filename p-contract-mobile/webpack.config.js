const path = require('path');

module.exports = function (conf) {
  const config = Object.assign(conf, {
    externals: {
      vue: 'Vue'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.join(process.cwd(), 'src')
      }
    }
  });

  // 模拟nginx代理请求
  const domain = 'longguo.dev.rs.com:56101';
  config.devServer = {
    proxy: {
      '/api-longguo/**': {
        target: domain,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/api-longguo': '' //rewrite path
        }
      }
    }
  };

  return config;
};
