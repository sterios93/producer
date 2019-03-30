module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/lunch-deal-base/'
    : '/',
  devServer: {
    disableHostCheck: true
  }
}
