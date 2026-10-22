'use strict'

const postcss = require('postcss')
const postcssrc = require('postcss-load-config')

// Resolve the site's PostCSS configuration independently of the working directory.
const customConfigPath = hexo.base_dir

function renderer (data) {
    // postcssrc函数的第二个参数，可以指定单独的配置文件
    return postcssrc({}, customConfigPath).then(({ plugins, options}) =>
        postcss(plugins).process(data.text, { ...options, from: data.path }))
        .then((result) => result.css)
}

hexo.extend.renderer.register('css', 'css', renderer)
