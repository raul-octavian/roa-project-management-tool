const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    proxy: 'https://boiling-brook-48441.herokuapp.com/'
  }
}
