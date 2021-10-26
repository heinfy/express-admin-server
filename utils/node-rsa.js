/* 
 每次重启服务都要重新生成的公私钥
 并写入 /pem 文件夹
*/
const NodeRSA = require('node-rsa');
const chalk = require('chalk');
const fs = require('fs');
const { _resolve } = require('./_node');

const key = new NodeRSA({ b: 2048 });
key.setOptions({ encryptionScheme: 'pkcs1' });
let privatePem = key.exportKey('pkcs1-private-pem');
let publicPem = key.exportKey('pkcs8-public-pem');

// publicPem = publicPem.replace(/\n/g, '');
// publicPem = publicPem.replace('-----BEGIN PUBLIC KEY-----', '');
// publicPem = publicPem.replace('-----END PUBLIC KEY-----', '');

// privatePem = privatePem.replace(/\n/g, '');
// privatePem = privatePem.replace('-----BEGIN RSA PRIVATE KEY-----', '');
// privatePem = privatePem.replace('-----END RSA PRIVATE KEY-----', '');

fs.writeFile(_resolve('../pem', 'public.pem'), publicPem, (err) => {
  if (err) throw err;
  console.log(chalk.green('公钥已写入！'));
});

fs.writeFile(_resolve('../pem', 'private.pem'), privatePem, (err) => {
  if (err) throw err;
  console.log(chalk.green('私钥已写入！'));
});
