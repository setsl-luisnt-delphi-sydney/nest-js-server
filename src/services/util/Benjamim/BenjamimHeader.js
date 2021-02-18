const JwtAlgorithm = require('./BenjamimUtils').JwtAlgorithm

class Header {
   constructor() {
      this.Algorithm = process.env.BENJAMIM_ALGORITHM
   }

   get value() { return this._value }             // 
   set value(aValue) { this._value = aValue }     // 

   get Algorithm() { return this._value.alg }
   set Algorithm(alg = JwtAlgorithm.HS256) { this._value = { alg, typ: "JWT" } }

   get AsString() { return JSON.stringify(this._value) }
   set AsString(value) { this._value = JSON.parse(value) }

   get AsJson() { return this._value }
   set AsJson(value) { this._value = value }
}

module.exports = Header