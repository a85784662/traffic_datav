// const autoprefixer = require('autoprefixer');
// const pxtoviewport = require('postcss-px-to-viewport');
const path = require('path')
module.exports = {
  //部署应用包时的基本 URL
  publicPath: '/',
  outputDir: "dist", //打包后的文件名字
  assetsDir: "static",//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  productionSourceMap: false, //不需要生产环境的 source map
  indexPath: 'index.html',// 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  filenameHashing: true,// 默认在生成的静态资源文件名中包含hash以控制缓存
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    // loaderOptions: {
    //   postcss: {
    //     plugins: [
    //       autoprefixer(),
    //       pxtoviewport({
    //         viewportWidth: 750
    //       })
    //     ]
    //   }
    // }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, './src/assets/less/mixin.less')]
    }
  },
  // devServer: {
  //   host: '172.168.10.24',
  //   port: 8080,
  //   open: true, //是否自动打开浏览器
  //   proxy: "http://172.168.10.21:8080",
  //   disableHostCheck: true //solve Invalid Host header
  // }
  devServer: {
    host: '172.168.10.24',
    port: 8080,
    open: true, //是否自动打开浏览器
    proxy: {
      '/yzjtj': {
        target: "http://172.168.10.21:8080"
      },
      '/traffic': {
        target: "http://172.168.10.21:3001"
      },
      '/weather': {
        target: "http://172.168.10.21:3001"
      }
    },
    disableHostCheck: true //solve Invalid Host header
  }
}

