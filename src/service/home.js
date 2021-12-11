/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

// import { service } from '../utils/axios'

// export function getHome() {
//   return service.get('/api/v1/dictionary/page');
// }

import { get, getmh } from '@/utils/axios.js'
var api = '/api/v1'

// 获取获取字典数据项
export function getDictDataList(data) {
  return getmh(api + '/dictData/getDictDataByDictId', data)
}
// 获取屏南搜索条件字典表
export function getSearchDic(data) {
  return get(`${api}/dictionary/findByDictionaryCode`, data)
}