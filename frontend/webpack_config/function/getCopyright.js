/*************************************************
 File name: getCopyright
 Version: 1.0.0
 Date: 2018/3/6-下午3:41
 Description:即将删除......
 Param:
 Return:
 *************************************************/
const fs = require('fs')
const path = require('path')
const file_path = './user.json'

fs.access(path.join(__dirname,file_path), fs.constants.F_OK, (err) => {
  if(err)throw new Error(`
  请手动创建${path.join(__dirname,file_path)}文件，内容如下：
  {"name":"your name","email":"your office email"}\r\n
  ps：此文件没有也不应加入版本控制!
  pps：欢迎加入前端组
`)
});

const user = require(file_path);

module.exports = function(project){
  return `Copyright © 2020 华夏电通 版权所有
  Project name:${project.group}_${project.name}
  Version:${project.version}
  Recent edit by ${user.name}/${user.email} on ${new Date().toLocaleString()}`
}