var NodeRSA = require('node-rsa');
var fs = require('fs');
function encrypt() {
  fs.readFile('./pem/private.pem', function (err, data) {
    var key = new NodeRSA(data);
    let cipherText = key.encryptPrivate('候飞', 'base64');
    console.log(cipherText);
  });
}
encrypt();

function decrypt() {
  fs.readFile('./pem/public.pem', function (err, data) {
    var key = new NodeRSA(data);
    let rawText = key.decryptPublic(
      'A6S8zmIyhW54yzuqBeZWDDx9iv2sBXYJAVLQm4muYp3s9VsMF0L7Yo3q29YTZ6hykW9+TseKgXecKuVjv83fIh9TbTSiwXEgNVwrzxI9cKruTOYkj82BePlOReRCW6rxylkicOyKpNbInoDznUia+xNGkdwdb+bTq9KLKPnnzkIgoEn5iopAr0UXkzj1dPe52J6XyWoDvP7Zmpdo2XHvmUHjzynCxG6J6o0l2LWC+F0FiDiQRz3MgV/1vh3Wim9eIXWA6Af0dtjehfFRAc4Kcj1VItMntHMLNTlEYg70cmIrwDIO/xncXanoXEmDF4eu3tDz7ZtHf28yVQJFOaNaRw==',
      'utf8'
    );
    console.log(rawText);
  });
}
//generator();
//encrypt();
decrypt();
