/*
 * 在 node 端为 jsencrypt 搭建浏览器环境，测试加密
 */
const GLOBAL = require('./env.window');
global = GLOBAL;
const fs = require('fs');
const JSEncrypt = require('jsencrypt');
const { _resolve } = require('./_node');

const PUBLIC_KEY = fs.readFileSync(_resolve('../pem', 'public.pem'), 'utf-8');

// 创建解密对象实例
const crypto = new JSEncrypt();

// 设置公钥
crypto.setPublicKey(PUBLIC_KEY);

// 给字段加密
exports.encrypt = (data) => crypto.encrypt(data);
