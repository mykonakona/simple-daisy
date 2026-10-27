'use strict';

module.exports = function appearanceConfig(options = {}, overrides = {}) {
  for (const settings of [options, overrides]) {
    if (settings != null && (typeof settings !== 'object' || Array.isArray(settings))) {
      throw new Error('appearance must be a configuration mapping.');
    }
  }
  const { light = 'corporate', dark = 'black' } = { ...options, ...overrides };
  for (const [mode, name] of Object.entries({ light, dark })) {
    if (typeof name !== 'string' || !/^[a-z][a-z0-9-]*$/.test(name)) {
      throw new Error(`appearance.${mode} must be a built-in daisyUI theme name.`);
    }
    try {
      require.resolve(`daisyui/theme/${name}.css`);
    } catch (error) {
      throw new Error(`Unknown daisyUI theme in appearance.${mode}: ${name}`);
    }
  }
  return { light, dark };
};
