const { encrypt } = require('../utils/jsencrypt');
const { decrypt } = require('../utils/crypto-node-rsa');

const a = encrypt('003');
console.log('encrypt 加密 => ', a);
console.log('decrypt 解密 => ', decrypt(a));
