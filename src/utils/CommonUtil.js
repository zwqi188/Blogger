var commonUtil = {
  convertTime (hirdate) {
    var dt = new Date(hirdate)
    var y = dt.getFullYear()
    var m = dt.getMonth() + 1
    var d = dt.getDate()
    var hh = dt.getHours()
    var mm = dt.getMinutes()
    var ss = dt.getSeconds()
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
}
module.exports = commonUtil
