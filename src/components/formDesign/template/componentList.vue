<template>
    <div class='component-list'>
        <div class="list" v-if="basicComponent.length > 0">
            <div class="title">基础控件</div>
            <component-list-item :list="basicComponent" @getData='getData'></component-list-item>
        </div>
        <div class="list" v-if="advancedComponent.length > 0">
            <div class="title">高级控件</div>
            <component-list-item :list="advancedComponent" @getData='getData'></component-list-item>
        </div>
        <div class="list" v-if="layoutComponent.length > 0">
            <div class="title">布局控件</div>
            <component-list-item :list="layoutComponent" @getData='getData'></component-list-item>
        </div>
    </div>
</template>

<script>
    import ComponentListItem from './componentListItem.vue'
    import { basicComponentsList, advancedComponentsList, layoutComponentsList } from '../common/base.config'
    export default {
        name: '',
        components: {
            ComponentListItem
        },
        data(){
            return {
                // 设置显示组件
                // 基础控件
                basicFields: ['Input', 'Textarea', 'Number', 'Radio', 'Checkbox', 'Caption', 'Date', "DateRange", 'UploadImg', 'color', 'Attachment'],
                // 高级控件 暂时没有用到 
                advanceFields: ['blank', 'imgupload', 'editor', 'cascader'],
                // 布局控件 暂时没有用到
                layoutFields:  ['grid']
            } 
        },

        computed: {
            // 基础控件
            basicComponent() {
                return basicComponentsList.filter(item => this.basicFields.includes(item.type))
            },
            // 高级控件
            advancedComponent() {
                return advancedComponentsList
            },
            // 布局控件
            layoutComponent() {
                return layoutComponentsList
            },
        },

        created(){},

        methods: {
            // 数据传给父组件
            getData(_Object) {
                this.$emit('setData', _Object)
            }
        },

        mounted(){}
    }
</script>
