module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/put-pod/' : '/',
  transpileDependencies: [
    'vuetify',
  ],
  lintOnSave: true,
};
