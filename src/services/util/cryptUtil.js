const crypto = require('crypto');

class Base64 {
   Encode = typeof atob !== 'undefined' ? atob : value => Buffer.from(value).toString('base64')
   Decode = typeof btoa !== 'undefined' ? btoa : value => Buffer.from(value, 'base64').toString()
}

class Hash {
   MD5 = value => crypto.createHash('md5').update(value).digest('hex')
   Sha1 = value => crypto.createHash('sha1').update(value).digest('hex')
   Sha224 = value => crypto.createHash('sha224').update(value).digest('hex')
   Sha256 = value => crypto.createHash('sha256').update(value).digest('hex')
   Sha384 = value => crypto.createHash('sha384').update(value).digest('hex')
   Sha512 = value => crypto.createHash('sha512').update(value).digest('hex')
}

module.exports = {
   Base64: new Base64(),
   Hash: new Hash()
}