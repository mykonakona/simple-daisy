'use strict'

const postcss = require('postcss')
const postcssrc = require('postcss-load-config')
const appearanceConfig = require('./appearance')

// Resolve the site's PostCSS configuration independently of the working directory.
const customConfigPath = hexo.base_dir

function renderer (data) {
    const appearance = appearanceConfig(hexo.theme.config.appearance, hexo.config.theme_config?.appearance)
    const themes = [...new Set([appearance.light, appearance.dark])].map(name => [
        name,
        name === appearance.light ? '--default' : '',
        name === appearance.dark ? '--prefersdark' : ''
    ].filter(Boolean).join(' ')).join(', ')
    const input = postcss.parse(data.text, { from: data.path })
    input.walkAtRules('plugin', rule => {
        if (rule.params.replace(/["']/g, '') === 'daisyui') {
            rule.walkDecls('themes', declaration => { declaration.value = themes })
        }
    })
    // postcssrc函数的第二个参数，可以指定单独的配置文件
    return postcssrc({}, customConfigPath).then(({ plugins, options}) =>
        postcss(plugins).process(input.toString(), { ...options, from: data.path }))
        .then((result) => result.css)
}

hexo.extend.renderer.register('css', 'css', renderer)

// Tailwind output also changes when templates or appearance settings change.
hexo.extend.filter.register('before_generate', function () {
    return this.model('Asset').update({ path: 'css/main.css' }, { modified: true })
})
