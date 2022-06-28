/*************************************************
 * File name: dev3
 * Version: 1.0.0
 * Date: 2018-11-22-13:49
 * Description:
 *
 *
 *************************************************/
process.env.NODE_ENV = 'development';

const app = require('express')();
const Webpack = require('webpack');
const proxy = require('http-proxy-middleware');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const argv = require('./function/parseArgv')


const port = 8080
const ora=require('ora');
const chalk = require('chalk');

const ProjectList = require('./function/getProjectList.js');
const getWebpackConf = require('./function/getWebpackConf.js');

let project=ProjectList.find(project=>project.id === argv.project_id);
if(!project){
  console.log(chalk.red(' [error] ')+'There is something wrong in get project object,please check build arguments and project_id in file ProjectList.js.');
  return
}

const spinner = ora(`Building ${project.name}(${project.name_zh}) for development...`);
spinner.start();

let config=getWebpackConf(project);

Object.keys(config.entry).forEach(function (name) {
  config.entry[name].push('webpack-hot-middleware/client?reload=true&noInfo=true')
})


let compiler = Webpack(Object.assign(config,{mode:'development'}));

let devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/',
  logLevel:'silent'
})

let hotMiddleware = webpackHotMiddleware(compiler, {
  log:false,
  heartbeat:2000
})
//配置代理服务器
app.use('/api', proxy({
  target: 'http://10.50.24.2:8080',
  //target: 'http://10.50.24.185:8080',
  //target: 'http://10.50.12.39:80',
  //target: 'http://10.50.7.81:80',
  //target:'http://10.50.7.90:80',
  //target:'http://10.50.12.39:80',
  //secure:false,// 如果是https接口，需要配置这个参数为true`
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}))
app.use(devMiddleware)
app.use(hotMiddleware)

devMiddleware.waitUntilValid(() => {
  spinner.succeed()
  console.log('> Succeed...')
  console.log('> Open your browser with http://localhost:' + port + '\n')
})

app.listen(port)

