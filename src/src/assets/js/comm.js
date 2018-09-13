let util = {
  getUrlParam (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r !== null) {
      return r[2]
    }
    return null
  }
}
export default util
