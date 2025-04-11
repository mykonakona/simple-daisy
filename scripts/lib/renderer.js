'use strict'

const postcss = require('postcss')
const postcssrc = require('postcss-load-config')

// 设置 配置文件路径
const customConfigPath = 'themes/notebook/scripts/lib/.postcssrc.js'

function renderer (data) {
    // postcssrc函数的第二个参数，可以指定单独的配置文件
    return postcssrc({}, customConfigPath).then(({ plugins, options}) => postcss(plugins).process(data.text, options))
        .then((result) => result.css)
}

hexo.extend.renderer.register('css', 'css', renderer)