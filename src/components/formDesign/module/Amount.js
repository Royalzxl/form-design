// 金额

import Base from './Base'

export default class MAmount extends Base {
    constructor(type = 'Amount', name='金额', key=`AMOUNT_${new Date().getTime()}`) {
        super(type, name, key)
        // showForm 右侧表单属性设置key值 留着备用
        this.showForm = ['name', 'title', 'placeholder','necessary', 'explanation', 'capital', 'places']
        this.title = '金额(元)'
        this.placeholder = '请输入金额'
        this.explanation = ['1.该控件只能输入数字；', '2.若勾选必填则提交时需要校验是否填写。']
        this.capital = true  // 大写
        this.places = false  // 千分位展示
        this.necessary = false
    }
}