// 多选框

import Base from './Base'

export default class MCheckbox extends Base {
    constructor(type='Checkbox', name='多选框', key=`CHECKBOX_${new Date().getTime()}`, necessary=false, value=[]) {
        super(type, name, key, necessary, value);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title', 'status', 'disabled', 'options', 'placeholder', 'explanation']
        this.placeholder = '请选择'
        this.title = '多选框'
        this.explanation = ['1.该控件的选项为多选；', '2.若勾选必填则提交时需要校验是否选择；', '3.此选项可以添加或减少', '4.拖动可以对选项进行排序。']
        this.disabled = false
        this.select = []
        this.options = [
            {
                value: '选项1',
                key: 'option_0',
                id: 1
            },
            {
                value: '选项2',
                key: 'option_1',
                id: 2
            },
            {
                value: '选项3',
                key: 'option_2',
                id: 3
            }
        ]
        // 校验
        this.rules = []
    }
}