const utils = {}
const ua = navigator.userAgent.toLowerCase()
utils.platform = {
  isAndroid: /android/ig.test(ua)
}
utils.getToken = () => {
  const userToken = window.localStorage.getItem('token') || ''
  return userToken
}
utils.setToken = (token) => {
  window.localStorage.setItem('token', token)
}
utils.getcurrentUserId = () => {
  const usercurrentUserId = window.localStorage.getItem('currentUserId') || ''
  return usercurrentUserId
}
utils.setcurrentUserId = (currentUserId) => {
  window.localStorage.setItem('currentUserId', currentUserId)
}
utils.isObject = x => x != null && typeof x === 'object'
// 设置title
utils.setDocumentTitle = (title) => {
  document.title = title
  if (/ip(hone|od|ad)/i.test(window.navigator.userAgent)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = () => {
      setTimeout(() => {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}
// 校验手机号码格式
utils.checkMobile = mobile => /^((1[3-9][0-9])+\d{8})$/.test(mobile)
// 获取url参数
utils.query2json = (url) => {
  const getSearchJson = {}
  let getSearch = ''
  let search = url || location.search
  if (!url && !location.search && location.hash) {
    search = location.hash.substring(location.hash.indexOf('?') + 1)
  }
  const turlstr = (decodeURIComponent(search).replace(/\S*\?/, ''))
  getSearch = turlstr.replace(/&/g, ',')
  const getSearchArr = getSearch.split(',')
  const len = getSearchArr.length
  for (let i = 0; i < len; i++) {
    const temp = getSearchArr[i].split('=')
    getSearchJson[temp[0]] = temp[1]
  }
  return getSearchJson
}
// 数字千分位
utils.numFormat = (num) => {
  const c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return c
}
export default utils
