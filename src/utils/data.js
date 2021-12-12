import {
	get
} from '@/utils/axios.js'
// 获取字典数据

export function getDictData(dictType) {
	return new Promise((resolve, reject) => {
		get('/api/v1/dictionary/findByDictionaryCode', {
			dictionaryCode: dictType
		}).then(res => {
			resolve(res.body.list || [])
		}).catch(() => reject())
	})

}