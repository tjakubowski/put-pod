const WorkerPlugin = require('./src/workers');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/put-pod/' : '/',
  transpileDependencies: [
    'vuetify',
  ],
  lintOnSave: true,
  configureWebpack: {
    output: {
      globalObject: 'this',
    },
    plugins: [
      new WorkerPlugin(),
    ],
  },

};
