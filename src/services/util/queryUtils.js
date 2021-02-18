module.exports.insert = (tableName, data) => {
   let sep = ''
   let fields = ''
   let values = ''
   if (!data) return ''

   for (let field in data) {
      fields += sep + field
      values += sep + data[field]
      sep = ','
   }
   return `insert into ${tableName}(${fields})values(${values})`
}

module.exports.update = (tableName, data, id) => {
   let sep = ''
   let pairs = ''
   if (data.length === 0) return ''

   for (let field in data) {
      pairs += sep + `${field}=${data[field]}`
      sep = ','
   }
   return `update ${tableName} set ${pairs} where id = ${id})`
}

