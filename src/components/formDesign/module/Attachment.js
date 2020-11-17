// 附件上传

import Base from './Base'

export default class MAttachment extends Base {
    constructor(type='Attachment', name='附件上传', key=`ATTACHMENT_${new Date().getTime()}`) {
        super(type, name, key);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title','disabled', 'necessary', 'fileFormat', 'explanation']
        this.title = '附件'
        this.fileFormat = [] // 文件格式
        this.explanation = ['1.该控件只能上传文件；', '2.可根据需要限定文件上传格式', '3.若勾选必填则提交时需要校验是否文件是否上传。']
        this.disabled = false
        this.files = []
        // 校验
        this.rules = []
    }
}