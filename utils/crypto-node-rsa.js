const NodeRSA = require('node-rsa');
const fs = require('fs');
const { _resolve } = require('./_node');

// 公钥加密
const encrypt = (data) => {
  const publicKey = fs.readFileSync(_resolve('../pem', 'public.pem'));
  const nodersa = new NodeRSA(publicKey);
  // nodersa.setOptions({ encryptionScheme: 'pkcs1' });
  const encrypted = nodersa.encrypt(data, 'base64');
  return encrypted;
};

// 私钥解密
const decrypt = (data) => {
  const privateKey = fs.readFileSync(_resolve('../pem', 'private.pem'));
  const nodersa = new NodeRSA(privateKey);
  nodersa.setOptions({ encryptionScheme: 'pkcs1' }); // 因为jsencrypt自身使用的是pkcs1加密方案, nodejs需要修改成pkcs1。
  const decrypted = nodersa.decrypt(data, 'utf8');
  return decrypted;
};

// 实例
// const data = '003';
// const encrypted = encrypt(data);
// console.log('encrypted:', encrypted);

// const decrypted = decrypt(encrypted);
// console.log('decrypted:', decrypted);

module.exports = {
  encrypt,
  decrypt,
};
