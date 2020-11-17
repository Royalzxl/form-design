// 明细

import Base from './Base'

export default class MDetails extends Base {
    constructor(type='Details', name='明细/表格', key=`DETAILS_${new Date().getTime()}`) {
        super(type, name, key);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title', 'explanation', 'defaultAction', 'list', 'sort']
        this.title = '表格'
        this.explanation = ['1.明细控件内部可以添加除明细控件外的多个控件。']
        this.list = []  // 包括里面的组件列表
        this.defaultAction = '添加' // 默认设置人员
        this.sort = false // 是否显示序号
        this.disabled = false
        // 校验
        this.rules = []
    }
}