class Payload {
   constructor() {
      this._value = {}
   }

   get value() { return this._value }             // 
   set value(aValue) { this._value = aValue }     // 

   get jti() { return this._value["jti"] }        // jti - Jwt ID - Jwt ID(ID)
   get iss() { return this._value["iss"] }        // iss - Issuer - Emissor(Emissor)
   get sub() { return this._value["sub"] }        // sub - Subject - Assunto
   get aud() { return this._value["aud"] }        // aud - Audience - Audiência(Remote IP)
   get iat() { return this._value["iat"] }        // iat - Issued At - Emitido em(Quando o Token foi Emitido / Automático)
   get nbf() { return this._value["nbf"] }        // nbf - Not Before - Validade Iniciada(Inicia Em)
   get exp() { return this._value["exp"] }        // exp - Expiration Time - Validade Terminada(Expirar Em)

   set jti(value) { this._value["jti"] = value }  // jti - Jwt ID - Jwt ID(ID)
   set iss(value) { this._value["iss"] = value }  // iss - Issuer - Emissor(Emissor)
   set sub(value) { this._value["sub"] = value }  // sub - Subject - Assunto
   set aud(value) { this._value["aud"] = value }  // aud - Audience - Audiência(Remote IP)
   set iat(value) { this._value["iat"] = value }  // iat - Issued At - Emitido em(Quando o Token foi Emitido / Automático)
   set nbf(value) { this._value["nbf"] = value }  // nbf - Not Before - Validade Iniciada(Inicia Em)
   set exp(value) { this._value["exp"] = value }  // exp - Expiration Time - Validade Terminada(Expirar Em)

   add = (key, value) => {
      this._value[key] = (typeof value == 'object') ? JSON.stringify(value) : value
   }

   get AsString() { return JSON.stringify(this._value) }
   set AsString(value) { this._value = JSON.parse(value) }

   get AsJson() { return this._value }
   set AsJson(value) { this._value = value }
}

module.exports = Payload