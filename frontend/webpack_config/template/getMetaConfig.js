/*************************************************
 * Copyright (C), since 2017, Likechuxing Tech. Co., Ltd.
 * File name: getMetaConfig
 * Version: 1.0.0
 * Date: 2018-11-27-11:14
 * Description:
 *
 *************************************************/
const user = require('../function/user.json')
const meta = {
  mobile: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, user-scalable=no'
    }
  ],
  keywords: [
    {name: 'keywords', content: ''},
    {name: 'description', content: ''}
  ],
  noPhone: [
    {name: 'format-detection', content: 'telphone=no, email=no'}
  ],
  copyright: [
    {name: 'copyright', content: `Copyright © since 2017 立刻出行 版权所有`},
    {name: 'author', content: `Recent edit by ${user.name}/${user.email} on ${new Date().toLocaleString()}`}
  ]
}
const default_meta = ['mobile', 'keywords', 'copyright']

module.exports = function (list) {
  let default_index = list.indexOf('default')
  if (default_index > -1) {
    list.splice(default_index, 1)
    list = list.concat(default_meta)
  }

  let config = []

  list.forEach(item => {
    if (!meta[item]) throw new Error('There is a useless meta key in function getMetaConfig(keys)，please check your likePackage file.')

    config = config.concat(meta[item])
  })

  return config
}