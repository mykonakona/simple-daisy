'use strict';

hexo.extend.helper.register('prism_stylesheet', function () {
  const theme = hexo.config.theme_config?.prism?.theme ?? hexo.theme.config.prism?.theme ?? 'okaidia';
  const themes = ['default', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight', 'coy'];
  if (!themes.includes(theme)) {
    throw new Error(`Unknown prism.theme: ${theme}. Use one of: ${themes.join(', ')}.`);
  }
  const filename = theme === 'default' ? 'prism' : `prism-${theme}`;
  return `https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/themes/${filename}.min.css`;
});
