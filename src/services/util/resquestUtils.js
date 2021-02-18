const ClientIp = (req) => {
   value = ((typeof req.headers['x-forwarded-for'] === 'string' && req.headers['x-forwarded-for'].split(',').shift()) || req.connection?.remoteAddress || req.socket?.remoteAddress || req.connection?.socket?.remoteAddress)
   return value.split(':').pop() || '0.0.0.0'
}

const ServerIp = (req) => {
   const value = req.rawHeaders[1] || '0.0.0.0'
   return value
}


module.exports = {
   ClientIp,
   ServerIp
}