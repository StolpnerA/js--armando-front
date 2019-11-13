module.exports = {
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api/armando': {
        target: 'https://js--diplom-backend.herokuapp.com/',
        pathRewrite: { '^/api/armando': '' },
      },
    },
  },
};
