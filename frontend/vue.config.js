const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 线上访问路径： https://zsh-afrangry.github.io/danghui/
  publicPath: process.env.NODE_ENV === 'production'
    ? '/danghui/'   // 生产环境走子路径
    : '/',           // 本地开发还是 /

  // 把打包结果输到仓库根目录的 docs 文件夹
  outputDir: '../docs',
})
