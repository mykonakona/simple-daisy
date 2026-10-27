'use strict';

const appearanceConfig = require('../lib/appearance');

hexo.extend.helper.register('appearance_config', function () {
  return appearanceConfig(hexo.theme.config.appearance, hexo.config.theme_config?.appearance);
});
