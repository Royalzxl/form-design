// 单行文本输入框

import Base from './Base'

export default class MInput extends Base {
    constructor(type='Input', name='单行文本框', key=`INPUT_${new Date().getTime()}`) {
        super(type, name, key)
        // showForm 右侧表单属性设置key值 留着备用
        this.showForm = ['name', 'title', 'placeholder','necessary', 'explanation']
        this.title = '单行文本框'
        this.placeholder = '请输入'
        this.explanation = ['1.该控件限制输入200个字符；', '2.若勾选必填则提交时需要校验是否填写。']
        this.clearable = true
        this.disabled = false
        // 校验
        this.rules = [
            { required: false, message: '请输入' , trigger: 'change' },
        ]
    }
}

