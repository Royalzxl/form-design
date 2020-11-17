// 部门选择

import Base from './Base'

export default class MDepartment extends Base {
    constructor(type='Department', name='部门选择', key=`DEPARTMENT_${new Date().getTime()}`) {
        super(type, name, key);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title','disabled', 'necessary', 'placeholder', 'explanation', 'chooseType', 'default']
        this.title = '部门选择'
        this.placeholder = '请选择'
        this.explanation = ['1.该控件用于添加部门；', '2.若勾选必填则提交时需要校验是否添加；','3.若勾选“默认部门”，则发起申请时默认为当前登录用户所属部门。']
        this.chooseType = '1' // 选择类型 0 表示单选 1 表示多选
        this.default = false // 默认设置部门
        this.disabled = false
        this.listValue = []
        // 校验
        this.rules = []
    }
}