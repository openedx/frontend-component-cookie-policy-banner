"use strict";

module.exports = {
  process: function process() {
    return 'module.exports = {};';
  },
  getCacheKey: function getCacheKey() {
    // The output is always the same.
    return 'svgTransform';
  }
};