module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/producer/'
    : '/',
  devServer: {
    disableHostCheck: true
  }
}
