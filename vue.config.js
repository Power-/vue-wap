//用于标记项目发布时间
process.env.VUE_APP_BUILDTIME = new Date().toString() + getGitVersionInfo();

// 测试环境
const proxyTargetServe = "http://admin.yifenqi.lianhejinxin.com:8400";
// 生产环境
// const proxyTargetServe = "http://www.jiawei.nw.localhost";

module.exports = {
  assetsDir: "static",
  productionSourceMap: false,
  chainWebpack: config => {
    // js 压缩自定义配置（去console插件）-- production 模式下生效
    config.optimization.minimizer("terser").tap(args => {
      args[0].terserOptions.compress.drop_console = true;
      return args;
    });
  },
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8201,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: proxyTargetServe,
        ws: false
      }
    },
    before: process.env.VUE_APP_MOCK === "true" ? require("./mock") : null
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-plugin-px2rem")({
            rootValue: 37.5, //换算基数
            exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            selectorBlackList: ["html", "body"], //要忽略并保留为px的选择器
            mediaQuery: true //（布尔值）允许在媒体查询中转换px。
          })
        ]
      }
    }
  }
};

function getGitVersionInfo() {
  if (process.env.NODE_ENV === "production") {
    try {
      var fs = require("fs");
      var gitHEAD = fs.readFileSync(".git/HEAD", "utf-8").trim(); // ref: refs/heads/master
      var ref = gitHEAD.split(": ")[1]; // refs/heads/master
      var branchName = gitHEAD.split("/")[2]; // master
      var gitVersion = fs.readFileSync(".git/" + ref, "utf-8").trim(); // git版本号，例如：db3b1d0e91f41026ebf50fc20a17df8a5317dd57
      var gitCommitVersion = '"' + branchName + ": " + gitVersion + '"'; // 例如dev环境: "master: db3b1d0e91f41026ebf50fc20a17df8a5317dd57"
      console.log(gitCommitVersion);
      return gitCommitVersion;
    } catch (error) {
      console.log(error);
      return "";
    }
  } else {
    return "";
  }
}
