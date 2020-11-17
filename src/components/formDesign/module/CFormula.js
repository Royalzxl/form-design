// 金额

import Base from '../module/Base'

export default class MCFormula extends Base {
    constructor(type = 'CFormula', name='计算公式', key=`CFORMULA_${new Date().getTime()}`) {
        super(type, name, key)
        // showForm 右侧表单属性设置key值 留着备用
        this.showForm = ['name', 'title', 'placeholder','necessary', 'explanation', 'capital', 'formula']
        this.title = '计算公式'
        this.placeholder = '自动计算数值'
        this.explanation = ['1.该控件用于审批单内数据自动结算。']
        this.capital = true  // 大写
        this.formula = `<span class='span-label'>计算公式 = </span>`  // 公式
        this.formulaApp = []
    }
}