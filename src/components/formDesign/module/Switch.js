// 开关

import Base from './Base'

export default class extends Base {
    constructor(type='Switch', name='开关', key=`SWITCH_${new Date().getDate()}`) {
        super(type, name, key);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title','size', 'explanation']
        this.title = '开关'
        this.size = 'small'
        this.explanation = ['1.该控件可用于开启或关闭的地方。']
        this.clearable = true
        this.disabled = false
        // 校验
        this.rules = []
    }
}