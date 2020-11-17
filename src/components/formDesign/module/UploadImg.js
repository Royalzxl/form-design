// 图片上传

import Base from './Base'

export default class MUploadImg extends Base {
    constructor(type='UploadImg', name='图片上传', key=`UPLOADIMG_${new Date().getTime()}`) {
        super(type, name, key);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title', 'necessary', 'disabled', 'fileFormat', 'explanation']
        this.title = '图片'
        this.fileFormat = [] // 文件格式
        this.explanation = ['1.该控件只能上传图片类型文件；', '2.可根据需要限定图片上传格式', '3.若勾选必填则提交时需要校验是否图片是否上传。']
        this.disabled = false
        this.imgs = []
        // 校验
        this.rules = []
    }
}
