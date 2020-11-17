// 人员选择

import Base from './Base'

export default class MContact extends Base {
    constructor(type='Contact', name='人员选择', key=`CONTACT_${new Date().getTime()}`, necessary=false, value=[]) {
        super(type, name, key, necessary, value);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title', 'disabled', 'necessary', 'placeholder', 'explanation', 'chooseType', 'default']
        this.title = '人员选择'
        this.placeholder = '请选择'
        this.explanation = ['1.该控件用于添加人员；', '2.若勾选必填则提交时需要校验是否添加；','3.若勾选“默认人员”，则发起申请时默认为当前登录用户。']
        this.chooseType = '1' // 选择类型 0 表示单选 1 表示多选 String 类型
        this.default = false // 默认设置人员
        this.disabled = false
        // 校验
        this.rules = []
    }
}