import {
    post,
} from '@/utils/axios.js'
var api = '/api/v1'

// 保存、提交建房信息
export function saveBuildApply(data) {
    return post(api + '/buildApplyBase/save', data)
}