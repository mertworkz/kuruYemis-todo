const AESConfig = {
    secret_key: 'yani_AES_56',
    secret_iv: 'yani_AES_56_IV',
    encryption_method : 'aes-256-cbc'
}

const crypto = require('crypto');

const key = crypto
  .createHash('sha512')
  .update(AESConfig.secret_key)
  .digest('hex')
  .substring(0, 32)
const encryptionIV = crypto
  .createHash('sha512')
  .update(AESConfig.secret_iv)
  .digest('hex')
  .substring(0, 16)


function encryptData(data) {
    const cipher = crypto.createCipheriv(AESConfig.encryption_method, key, encryptionIV)
    return Buffer.from(
      cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') // Encrypts data and converts to hex and base64
  }

function decryptData(encryptedData) {
    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(AESConfig.encryption_method, key, encryptionIV)
    return (
      decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8')
    ) // Decrypts data and converts to utf8
  }

module.exports = {
    encryptData,
    decryptData
};