// 单选框

import Base from './Base'

export default class MRadio extends Base {
    constructor(type='Radio', name='单选框', key=`RADIO_${new Date().getTime()}`){
        super(type, name, key);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title','status','disabled', 'value', 'options', 'placeholder', 'explanation', 'related']
        this.title = '单选框'
        this.placeholder = '请选择'
        this.explanation = ['1.该控件的选项为单选；', '2.若勾选必填则提交时需要校验是否选择；', '3.此选项可以添加或减少', '4.拖动可以对选项进行排序。']
        this.disabled = false
        this.valIndex = ''
        this.options = [
            {
                value: '选项1',
                related: [],
                limits: '',
                key: 'option_0',
                id: 1
            },
            {
                value: '选项2',
                related: [],
                limits: '',
                key: 'option_1',
                id: 2
            },
            {
                value: '选项3',
                related: [],
                key: 'option_2',
                limits: '',
                id: 3
            }
        ]
        // 校验
        this.rules = []
    }
}