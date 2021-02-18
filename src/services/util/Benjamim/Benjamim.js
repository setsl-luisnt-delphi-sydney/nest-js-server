const { JwtAlgorithm, Base64 } = require('./BenjamimUtils')
const Header = require('./BenjamimHeader')
const Payload = require('./BenjamimPayload')
const Signature = require('./BenjamimSignature')

class Benjamim {
   constructor() {
      this.Header = new Header()
      this.Payload = new Payload()
      this.Signature = new Signature(this)
      this.Password = process.env.BENJAMIM_PASSWORD
   }
   get Password() { return this._Password }
   set Password(aPassword) { this._Password = aPassword }

   get Token() { return this._Token }
   set Token(aToken) {
      const t = aToken
      const ts = t.split(' ').pop().split('.')
      if (ts.length === 3) {
         const h64 = ts[0]
         const p64 = ts[1]
         const h = Base64.Decode(h64)
         const p = Base64.Decode(p64)
         this.Header.value = JSON.parse(h)
         this.Payload.value = JSON.parse(p)
         this._Token = aToken
         return
      }
      this._Token = '0.0.0'
   }

   get Header() { return this._Header }
   set Header(aHeader) { this._Header = aHeader }

   get Payload() { return this._Payload }
   set Payload(aPayload) { this._Payload = aPayload }

   get Signature() { return this._Signature }
   set Signature(aSignature) { this._Signature = aSignature }

   header = aValue => { this.Header.value = aValue; return this }

   payload = aValue => { this.Payload.value = aValue; return this }

   token = aValue => { this.Token = aValue; return this }

   sign = (aPasswordEncodedBase64 = false) => this._Signature.sign(aPasswordEncodedBase64)

   verify = (aPasswordEncodedBase64 = false) => this._Signature.verify(aPasswordEncodedBase64)
}

module.exports.Benjamim = new Benjamim()
module.exports.JwtAlgorithm = JwtAlgorithm