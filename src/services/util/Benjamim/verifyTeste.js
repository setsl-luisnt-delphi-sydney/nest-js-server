const { Benjamim } = require('.')

Benjamim.Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o'
Benjamim.Password = 'secret'
const verified = Benjamim.Signature.verify()

console.log('Token', Benjamim.Token)
console.log('Algorithm', Benjamim.Header.Algorithm)
console.log('Password', Benjamim.Password)
console.log('Verified', verified)