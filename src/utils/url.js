const Url = {}
Url.getQueryString = function(name) {
  name = name.toLowerCase()
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const pageUrl = window.location.search.toLowerCase()
  const r = pageUrl.substr(1).match(reg)
  if (r !== null) return unescape(r[2])
  return null
}

Url.getParamsByRouter = function(name) {
  name = name.toLowerCase()
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const pageUrl = window.location.href.toLowerCase()
  const r = pageUrl.split('?')[1].match(reg)
  if (r !== null) return unescape(r[2])
  return null
}

export default Url
