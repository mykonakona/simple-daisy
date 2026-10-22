'use strict';

const { stripHTML } = require('hexo-util');

hexo.extend.helper.register('reading_time', function (content) {
  const html = String(content || '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<\/?(?:p|div|li|h[1-6]|pre|br|td|th)\b[^>]*>/gi, ' ');
  const text = stripHTML(html).replace(/&(?:#\d+|#x[\da-f]+|[a-z]+);/gi, ' ');
  const hanCharacters = text.match(/\p{Script=Han}/gu) || [];
  const words = text.replace(/\p{Script=Han}/gu, ' ')
    .match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) || [];

  // Estimate Chinese characters and other-language words separately.
  return Math.max(1, Math.ceil(hanCharacters.length / 400 + words.length / 200));
});
