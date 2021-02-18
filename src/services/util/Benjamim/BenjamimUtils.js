const crypto = require('crypto');

class JwtAlgorithm {
   constructor() {
      this.HS256 = "HS256"
      this.HS384 = "HS384"
      this.HS512 = "HS512"
   }

   get HS256() { return this._HS256 }
   set HS256(aHS256) { this._HS256 = aHS256 }

   get HS384() { return this._HS384 }
   set HS384(aHS384) { this._HS384 = aHS384 }

   get HS512() { return this._HS512 }
   set HS512(aHS512) { this._HS512 = aHS512 }
}

class Base64 {
   Encode = typeof atob !== 'undefined' ? atob : value => Buffer.from(value).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
   Decode = typeof btoa !== 'undefined' ? btoa : value => Buffer.from(value, 'base64').toString()
}

class Hmac {
   HS256 = (value, password) => crypto.createHmac('sha' + '256', password).update(value).digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
   HS384 = (value, password) => crypto.createHmac('sha' + '384', password).update(value).digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
   HS512 = (value, password) => crypto.createHmac('sha' + '512', password).update(value).digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

module.exports = {
   JwtAlgorithm: new JwtAlgorithm(),
   Base64: new Base64(),
   Hmac: new Hmac()
}
