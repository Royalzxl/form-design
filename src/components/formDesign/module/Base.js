export default class baseModule {
    constructor (type, name, key, necessary, value) {
        this.id = type + new Date().getTime()
        this.type = type
        this.name = name
        this.key = key
        this.necessary = necessary || false  // 是否必填
        this.value = value || ''
        this.show = false
        this.related = [] // 设置关联
    }
}