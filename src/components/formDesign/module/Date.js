// 日期

import Base from './Base'

export default class MDate extends Base {
    constructor(type='Date', name='日期', key=`DATE_${new Date().getTime()}`) {
        super(type, name, key);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title', 'status','disabled', 'placeholder', 'value', 'dateFormat', 'explanation']
        this.title = '日期'
        this.placeholder = '请选择'
        this.dateFormat = 'YYYY-MM-DD'
        this.explanation = ['1.该控件支持两种种日期格式选择；', '2.若勾选必填则提交时需要校验是否选择。']
        this.disabled = false
        // 校验
        this.rules = []
    }
}