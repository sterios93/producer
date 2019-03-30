module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/base-app/'
    : '/',
  devServer: {
    disableHostCheck: true
  }
}
