const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/danghuiDemo/'  // 替换为您的 GitHub 仓库名
    : '/'
})
