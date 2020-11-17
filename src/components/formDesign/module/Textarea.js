// 多行文本输入框

import Base from './Base'

export default class MTextarea extends Base {
    constructor(type='Textarea', name='多行文本框', key=`TEXTAREA_${new Date().getTime()}`, rows=5) {
        super(type, name, key)
        // showForm 右侧表单属性设置key值 留着备用
        this.showForm = ['name', 'key', 'rows', 'link', 'placeholder', 'explanation', 'necessary']
        this.title = '多行文本框'
        this.rows = rows
        this.placeholder = '请输入'
        this.link = ''
        this.explanation = ['1.该控件限制输入500个字符；', '2.若勾选必填则提交时需要校验是否填写。']
        this.clearable = true
        this.disabled = false
        // 校验
        this.rules = [
            { required: false, message: '请输入' , trigger: 'change' },
        ]
    }
}