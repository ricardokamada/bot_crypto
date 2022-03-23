const aes = require('aes-js');

const key = aes.utils.utf8.toBytes(process.env.AES_KEY);
if (key.length !== 32) throw new Error("Invalid key for AES. Must be 256-bit / 32 bytes.");

function encrypt(text){
    //console.log(text);
    const bytesInfo = aes.utils.utf8.toBytes(text);
    const aesCTR = new aes.ModeOfOperation.ctr(key);
    const encryptedBytes = aesCTR.encrypt(bytesInfo);
    //console.log(encryptedBytes);
    const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);
    //console.log(encryptedHex);
    return encryptedHex;
}

function decrypt(encryptedHex){
    const encryptedBytes = aes.utils.hex.toBytes(encryptedHex);
    const aesCTR = new aes.ModeOfOperation.ctr(key);
    const decryptBytes = aesCTR.decrypt(encryptedBytes);
    //console.log(decryptBytes);
    const text = aes.utils.utf8.fromBytes(decryptBytes);
    //console.log(text);
    return text;
}

module.exports = {
    encrypt,
    decrypt
}