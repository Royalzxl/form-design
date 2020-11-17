// 收款账户

import Base from './Base'

export default class MAccount extends Base {
    constructor(type='Account', name='收款账户', key=`ACCOUNT_${new Date().getTime()}`, necessary=true) {
        super(type, name, key, necessary);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title', 'disabled', 'necessary', 'placeholder', 'explanation']
        this.title = '收款账户'
        this.placeholder = '请选择'
        this.explanation = ['1.收款账户默认为必填。']
        this.disabled = false
        // 校验
        this.rules = []
    }
}