<template>
    <div class='design-wapper'>
        <div class="design-wapper-inner" :class="{'empty': data.list.length == 0}">
            <div class="empty-phone" :style="{backgroundImage: `url(${$assets.formDesignPhoneEmpty})`}" v-if="data.list.length == 0">
                <div class="tips">选择左侧控件拖到此处</div>
            </div>
            <Form class="design-form">
                <draggable
                    :list="data.list" 
                    v-bind="{group:'form-design-drag', ghostClass: 'ghost', animation: 200, handle: '.widget-view'}"
                    @end="handleMoveEnd"
                    @add="handleWidgetAdd">
                    <transition-group name="fade" tag="div" class="widget-form-list">
                        <template v-for="(element, index) in data.list">
                            <!-- table 表格明细 -->
                            <template v-if="element.type == 'Details'"> 
                                <table-wapper
                                    class="widget-view" 
                                    v-if="element && element.key"
                                    :key="element.key" 
                                    :element="element" 
                                    :select.sync="selectWidget" 
                                    :processList="prosessConditiionList"
                                    :index="index" 
                                    :data="data">
                                </table-wapper>
                            </template>
                            <!-- 其它控件 -->
                            <template v-else>
                                <form-design-wapper-item 
                                    class="widget-view" 
                                    v-if="element && element.key"
                                    :key="element.key" 
                                    :element="element" 
                                    :select.sync="selectWidget" 
                                    :processList="prosessConditiionList"
                                    :index="index" 
                                    :data="data">
                                </form-design-wapper-item>
                            </template>
                        </template>
                    </transition-group>
                </draggable>
            </Form>
        </div>
    </div>
</template>

<script>
    import { newObject } from '../common/utils'
    import draggable from 'vuedraggable'
    import FormDesignWapperItem from './formDesignWapperItem.vue'
    import TableWapper from './tableWapper.vue'
    export default {
        name: '',
        components: {
            FormDesignWapperItem,
            TableWapper,
            draggable
        },
        data(){
            return {
                // 选中的组件
                selectWidget: this.select
            }
        },

        props: ['data', 'select', 'processList'],

        computed: {
            prosessConditiionList() {
                let list = []
                for(let key in this.processList) {
                    list = [...list, ...this.processList[key]]
                }
                return list
            }
        },

        watch: {
            select (val) {
                this.selectWidget = val
            },
            selectWidget: {
                handler (val) {
                    this.$emit('update:select', val)
                },
                deep: true
            }
        },

        created(){},

        methods: {
            // 拖拽结束
            handleMoveEnd (evt) {
                // 获取下标, 目标容器，出发容器
                const newIndex = evt.newIndex
                const to = evt.to
                const from = evt.from
                // 设置选中状态
                if(from == to) this.selectWidget = this.data.list[newIndex]
            },

            // 拖拽添加
            handleWidgetAdd (evt) {
                // 获取下标
                const newIndex = evt.newIndex
                
                
                // 定义拖拽数据
                let data = null
                
                // 深拷贝一份数据留作备用
                let original = JSON.parse(JSON.stringify(this.data.list))

                // 生成数据
                if(!this.data.list[newIndex].key) {
                    data = newObject(this.data.list[newIndex])
                    // 处理数据title显示
                    let typeList = this.data.list.filter(item => item.type == data.type)
                    if(typeList.length > 1) {
                        data.title = `${data.title}(${typeList.length - 1})`
                        if(data.title1) data.title1 = `${data.title1}(${typeList.length - 1})`
                        if(data.text) data.text = `${data.text}(${typeList.length - 1})`
                    }
                } else 
                    data = this.data.list[newIndex]

                this.$nextTick(() => {
                    // inTable 用于判断数据是否在表单内
                    this.$set(data, 'inTable', false)
                    // 数据替换
                    this.$set(this.data.list, newIndex, data)

                    // 设置选中状态
                    this.selectWidget = this.data.list[newIndex]
                })
            },
        },

        mounted(){}
    }
</script>