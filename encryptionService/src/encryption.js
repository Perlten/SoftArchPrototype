const crypto = require("crypto")

const algorithm = 'aes-256-cbc'; // Using AES encryption
const key = Buffer.from(crypto.createHash("shake256", { "outputLength": 16 })
    .update("SuperSecretPassword")
    .digest("hex"))

function encrypt(plainText) {
    let iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), cipherText: encrypted.toString('hex') }
}


function decrypt(cipherText, iv) {
    iv = Buffer.from(iv, 'hex');
    let encryptedText = Buffer.from(cipherText, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = { encrypt, decrypt }
