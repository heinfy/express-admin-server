/*
 * 搭建浏览器环境
 */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM(
  '<!DOCTYPE html><html lang="en"><head></head><body></body></html>'
);
const { window } = jsdom;
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

module.exports = global;
