<template>
    <div class='form-design'>
        <!--左侧侧组件属性设置-->
        <aside class="side left">
            <component-list @setData='setData'></component-list>
        </aside>
        <!--中间表单布局-->
        <section class="content">
            <form-design-wapper ref="formDesign" :data="formDesign" :select.sync='formDesignSelect' :processList='processList'></form-design-wapper>
        </section>
        <!--右侧组件属性设置-->
        <aside class="side right" :class="{'open': formDesignSelect && Object.keys(formDesignSelect).length > 0}">
            <form-attr :select="formDesignSelect" :data.sync="formDesign" :processList='processList'></form-attr>
        </aside>
    </div>
</template>

<script>
    import { ObjDeepCopy } from './common/utils'
    import ComponentList from './template/componentList'
    import FormAttr from './template/formAttr'
    import FormDesignWapper from './template/formDesignWapper'
    export default {
        name: 'FormDesign',
        components: {
            ComponentList,
            FormAttr,
            FormDesignWapper
        },
        data(){
            return {
                // 选中的组件数据对象
                formDesignSelect: null,
            }
        },
        props:{
            formDesign: {
                type: Object,
                default: function () {
                    return {
                        list: [{"id":"Details1619424603956","type":"Details","name":"明细/表格","key":"DETAILS_1619424603956","necessary":false,"value":"","show":false,"related":[],"specialKey":"","isAbstract":false,"showFrom":["title","explanation","defaultAction","list","sort"],"title":"表格","explanation":["1.明细控件内部可以添加除明细控件外的多个控件。"],"list":[{"id":"Radio1619430416368","type":"Radio","name":"单选框","key":"RADIO_1619430416368","necessary":false,"value":"","show":false,"related":[],"specialKey":"","isAbstract":false,"showFrom":["title","status","disabled","value","options","placeholder","explanation","related"],"title":"单选框","placeholder":"请选择","explanation":["1.该控件的选项为单选；","2.若勾选必填则提交时需要校验是否选择；","3.此选项可以添加或减少","4.拖动可以对选项进行排序。"],"disabled":false,"valIndex":"","options":[{"value":"选项1","related":["NUMBER_1619430425377"],"limits":"","key":"option_0","id":1},{"value":"选项2","related":[],"limits":"","key":"option_1","id":2},{"value":"选项3","related":[],"key":"option_2","limits":"","id":3}],"rules":[],"inTable":true,"details_item_title":"单选框(明细)"},{"id":"Number1619430425377","type":"Number","name":"数字输入框","key":"NUMBER_1619430425377","necessary":false,"value":"","show":false,"related":["RADIO_1619430416368_0"],"specialKey":"","isAbstract":false,"showFrom":["title","unit","placeholder","necessary","numberType","DecPlaces","explanation"],"title":"数字输入框","unit":"","numberType":[],"DecPlaces":"","placeholder":"请输入数字","explanation":["1.该控件只能输入数字；","2.若勾选必填则提交时需要校验是否填写；","3.数字最大长度限20字符。"],"clearable":true,"disabled":false,"rules":[{"required":false,"message":"请输入数字","trigger":"change"}],"inTable":true,"details_item_title":"数字输入框(明细)"}],"defaultAction":"添加","sort":false,"disabled":false,"rules":[],"uniqueFlag":"detail_1619424603956","inTable":false},{"id":"Date1619430418660","type":"Date","name":"日期","key":"DATE_1619430418660","necessary":false,"value":"","show":false,"related":[],"specialKey":"","isAbstract":false,"showFrom":["title","status","disabled","placeholder","value","dateFormat","explanation"],"title":"日期","placeholder":"请选择","dateFormat":"YYYY-MM-DD","explanation":["1.该控件支持两种种日期格式选择；","2.若勾选必填则提交时需要校验是否选择。"],"disabled":false,"rules":[],"inTable":false,"details_item_title":"日期(明细)"},{"id":"UploadImg1619430420574","type":"UploadImg","name":"图片上传","key":"UPLOADIMG_1619430420574","necessary":false,"value":"","show":false,"related":[],"specialKey":"","isAbstract":false,"showFrom":["title","necessary","disabled","fileFormat","explanation"],"title":"图片","fileFormat":[],"explanation":["1.该控件只能上传图片类型文件；","2.可根据需要限定图片上传格式","3.若勾选必填则提交时需要校验是否图片是否上传。"],"disabled":false,"imgs":[],"rules":[],"inTable":false,"details_item_title":"图片(明细)"}] 
                    }
                }
            },
            processList: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        watch: {
            formDesign: {
                handler(val) {},
                deep: true
            },
            formDesignSelect: {
                handler (val) {},
                deep: true
            },
        },

        methods: {
            // 获取左侧拖拽|点击选中的数据
            setData(_Object) {
                // 处理数据title显示
                let typeList = this.formDesign.list.filter(item => item.type == _Object.type)
                if(typeList.length > 0) {
                    _Object.title = `${_Object.title}(${typeList.length})`
                    if(_Object.title1) _Object.title1 = `${_Object.title1}(${typeList.length})`
                    if(_Object.text) _Object.text = `${_Object.text}(${typeList.length})`
                }
                this.$nextTick(() => {
                    // inTable 用于判断数据是否在表单内
                    this.$set(_Object, 'inTable', false)
                    this.formDesign.list.push(_Object)
                    this.formDesignSelect = _Object
                })
            }
        },

        mounted(){}
    }
</script>

<style lang='less' src='./style.less'></style>
