const Base64 = require('./BenjamimUtils').Base64
const Hmac = require('./BenjamimUtils').Hmac

class Signature {
   constructor(owner) { this.owner = owner }

   sign = (aSign64 = false) => {
      const o = this.owner
      const a = o.Header.Algorithm
      const h = o.Header.AsString
      const p = o.Payload.AsString
      const pwd = (aSign64) ? Base64.Decode(o.Password) : o.Password
      const h64 = Base64.Encode(h)
      const p64 = Base64.Encode(p)
      const d = `${h64}.${p64}`
      const s = Hmac[a](d, pwd)
      return `${d}.${s}`
   }

   verify = (aSign64 = false) => {
      const o = this.owner
      const pwd = (aSign64) ? Base64.Decode(o.Password) : o.Password
      const t = o.Token
      const ts = t.split('.')
      const h = ts[0]
      const a = JSON.parse(Base64.Decode(ts[0])).alg
      const p = ts[1]
      const d = `${h}.${p}`
      const st = ts[2]
      const sg = Hmac[a](d, pwd)
      return (st === sg)
   }
}

module.exports = Signature