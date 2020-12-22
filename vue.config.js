var path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
        styles: '/assets/scss'
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/styles/_pallettes.scss";
        `
      }
    }
  }
}
