// 文字说明

import Base from './Base'

export default class MCaption extends Base {
    constructor(type='Caption', name='文字说明', key=`CAPTION_${new Date().getTime()}`) {
        super(type, name, key)
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['text', 'title', 'link', 'textcolor', 'necessary', 'isArrowShow', 'explanation']
        this.title = '文字说明'
        this.text = '这是文字说明'
        this.link = ''
        this.explanation = ['1.该控件可用于需要文字说明的地方；', '2.可根据需要选择文字颜色。']
        this.textcolor = '#999'
        this.clearable = true
        this.isArrowShow = true
        this.disabled = false
        // 校验
        this.rules = []
    }
}