const { Benjamim, JwtAlgorithm } = require('.')

Benjamim.Payload.sub = '1234567890'
Benjamim.Payload.add('name', 'John Doe') // custom key
Benjamim.Payload.iat = 1516239022
const token = Benjamim.Signature.sign()
console.log('token', token)

// OR
Benjamim.Payload.value = {
   sub: '1234567890',
   name: 'John Doe', // custom key
   iat: 1516239022
}

const token = Benjamim.Signature.sign()
console.log('token', token)