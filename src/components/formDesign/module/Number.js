// 数字输入框

import Base from './Base'

export default class MNubmer extends Base {
    constructor(type='Number', name='数字输入框', key=`NUMBER_${new Date().getTime()}`) {
        super(type, name, key);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title', 'unit', 'placeholder', 'necessary', 'numberType', 'DecPlaces', 'explanation']
        this.title = '数字输入框'
        this.unit = '' // 单位
        this.numberType = [] // 输入数字类型
        this.DecPlaces = '' // 可输入的小数位数
        this.placeholder = '请输入数字'
        this.explanation = ['1.该控件只能输入数字；', '2.若勾选必填则提交时需要校验是否填写；', '3.数字最大长度限20字符。']
        this.clearable = true
        this.disabled = false
        // 校验
        this.rules = [
            { required: false, message: '请输入数字' , trigger: 'change' },
        ]
    }
}