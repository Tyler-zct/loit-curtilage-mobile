/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 老项目域名地址
 * khglUrl: 客户管理域名地址
 * dicUrl : 字典服务器地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * welUrl :默认欢迎页
 *
 */

let baseUrl = ''
let baseUrlFile = ''
let lookFile = ''
let mhUrl = ''
let mhbaseUrl = ''
let base64FileUrl = ''
let downloadFileUrl = ''
const iconfontVersion = ['567566_r22zi6t8noas8aor']
const iconfontUrl = `//at.alicdn.com/t/font_$key.css`
const codeUrl = `${baseUrl}/code`
const env = process.env
//  let ip = `` // 如果ip为空，lookFileIp也得为空,生产环境部署需要,上传git代码这块必须为空，开发人员手动修改一下值 ip = http://39.99.158.58:7002  lookFileIp = http://39.99.158.58
//  let lookFileIp = ``

let ip = `http://bba.loiot.com:83`
let lookFileIp = `http://bba.loiot.com:83`
base64FileUrl = 'http://bba.loiot.com:83'
downloadFileUrl = 'http://bba.loiot.com:83'
// let ip = `http://bba.loiot.com:8301` // 如果ip为空，lookFileIp也得为空,生产环境部署需要,上传git代码这块必须为空，开发人员手动修改一下值 ip = http://39.99.158.58:7002  lookFileIp = http://39.99.158.58
// let lookFileIp = `http://bba.loiot.com:8301`
// base64FileUrl = 'http://bba.loiot.com:8301'
// downloadFileUrl = 'http://bba.loiot.com:8301'
if (ip === '') {
  ip = window.location.protocol + '//' + window.location.host
  lookFileIp = window.location.protocol + '//' + window.location.host
  if (window.location.host === 'dsj.cgj.beijing.gov.cn' || window.location.host === '192.168.151.123') {
    base64FileUrl = 'http://dsj.cgj.beijing.gov.cn/fileviewks/'
    downloadFileUrl = 'https://dsj.cgj.beijing.gov.cn/fileviewks/'
  } else if (window.location.host === '172.26.66.33') {
    base64FileUrl = 'http://dxcc.cgj.beijing.egov.cn/'
    downloadFileUrl = 'https://dsj.cgj.beijing.gov.cn/fileviewks/'
  }
}
if (env.NODE_ENV === 'development') {
  // baseUrl = ip + `/api-pn-homestead` // 开发环境地址
  baseUrl = 'http://192.168.31.8:8301' // 开发环境地址
} else if (env.NODE_ENV === 'production') {
  baseUrl = ip + `/api-pn-homestead` // 生产环境地址
} else if (env.NODE_ENV === 'test') {
  baseUrl = ip + `/api-pn-homestead` // 测试环境地址
}
// if (env.NODE_ENV === 'development') {
//   baseUrl = ip + `/` // 开发环境地址
// } else if (env.NODE_ENV === 'production') {
//   baseUrl = ip + `/` // 生产环境地址
// } else if (env.NODE_ENV === 'test') {
//   baseUrl = ip + `/` // 测试环境地址
// }
baseUrlFile = ip + '/api-file'
mhbaseUrl = ip + '/api-portal'
// 这里的base64FileUrl需要根据不同环境去更改
// 准生产、生产 互联网访问前缀:http://dsj.cgj.beijing.gov.cn/fileviewks/
// 准生产、生产 政务网访问前缀:http://dxcc.cgj.beijing.egov.cn/
// 测试 http://ks3-cn-beijing.ksyun.com/

mhUrl = ip + '/api-portal'
lookFile = lookFileIp + '/'
export {
  baseUrl,
  mhUrl,
  lookFile,
  base64FileUrl,
  baseUrlFile,
  mhbaseUrl,
  downloadFileUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  env
}
