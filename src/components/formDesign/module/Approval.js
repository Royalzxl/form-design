// 关联审批单

import Base from './Base'

export default class MApproval extends Base {
    constructor(type='Approval', name='关联审批单', key=`APPROVAL_${new Date().getTime()}`) {
        super(type, name, key);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title','disabled', 'necessary', 'placeholder', 'explanation', 'relatedType']
        this.title = '关联审批单'
        this.placeholder = '请选择'
        this.explanation = ['1.该控件用于关联审批单据；', '2.若勾选必填则提交时需要校验是否关联。']
        this.relatedType = '请选择' // 关联审批类型
        this.disabled = false
        // 校验
        this.rules = []
    }
}