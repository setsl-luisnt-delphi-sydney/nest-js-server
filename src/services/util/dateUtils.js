const FormatDateTime = (aDateTime = new Date(), aFormat = "yyyy-MM-dd h:m:s.z") => {
   var z = {
      M: aDateTime.getMonth() + 1,
      d: aDateTime.getDate(),
      h: aDateTime.getHours(),
      m: aDateTime.getMinutes(),
      s: aDateTime.getSeconds()
   };
   aFormat = aFormat.replace(/(M+|d+|h+|m+|s+|z+)/g, function (v) {
      return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
   });

   return aFormat.replace(/(y+)/g, function (v) {
      return aDateTime.getFullYear().toString().slice(-v.length)
   });
}
module.exports = {
   FormatDateTime
}
// FormataDateTime(new Date('Sun May 11,2014'), 'yyyy-MM-dd') => "2014-05-11