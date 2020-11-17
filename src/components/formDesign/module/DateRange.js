// 日期区间

import Base from './Base'

export default class MDateRange extends Base {
    constructor(type='DateRange', name='日期区间', key=`DATERANGE_${new Date().getTime()}`) {
        super(type, name, key);
        // showForm 右侧表单属性设置key值 留着备用
        this.showFrom = ['title', 'title1', 'status','disabled', 'placeholder', 'value', 'dateFormat', 'duration', 'automatic', 'explanation']
        this.title = '开始时间'
        this.title1 = '结束时间'
        this.value1 = ''
        this.show1 = false
        this.dateFormat = 'YYYY-MM-DD'
        this.placeholder = '请选择'
        this.explanation = ['1.开始时间必须早于或等于结束时间；', '2.结束时间必须晚于或等于开始时间；', '3.该控件支持两种日期格式选择；',  '4.若勾选必填则提交时需要校验是否选择。']
        this.durationTitle = '时长（天）' // 时长title
        this.durationValue = ''
        this.durationTip = '由系统自动计算时长'
        this.duration = '时长'
        this.automatic = false // 是否开启自动计算时长
        this.disabled = false
        // 校验
        this.rules = []
        this.unit = '天'   
    }
}