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
                        list: []
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
