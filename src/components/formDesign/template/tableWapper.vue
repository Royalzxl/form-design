<template>
    <FormItem class="form-design-wapper-item widget-view"
        :class="{'hover active': selectWidget && selectWidget.key == element.key}"
        @mouseout.native.stop="mouseOut"
        @mouseover.native.stop="hover"
        @click.native.stop="handleSelectWidget(index)">
        <div class="wrap">
            <div class="plac">{{element.title}}</div>
        </div>
        <div class="wrap table-wapper" :style="style" :class="{'empty': element.list && element.list.length <= 0}">
            <span class="emptytip" v-if="element.list && element.list.length <= 0">可拖入多个组件(不包含明细组件)</span>
            <Form class="table-design">
                <draggable
                    :list="element.list"
                    :no-transition-on-drag="true"
                    v-bind="{ group:'form-design-drag', ghostClass: 'ghost', animation: 200, handle: '.widget-view'}"
                    @end.stop="handleMoveEnd($event, element)"
                    @add.stop="handleWidgetTableAdd($event, element, index)">
                    <transition-group name="fade" tag="div" ref="tableList" class="widget-table-list">
                        <div v-for="(item, i) in element.list" :key="item.id">
                            <form-design-wapper-item
                                class="widget-view table-item" 
                                :element="item" 
                                :select.sync="selectWidget" 
                                :index="i" 
                                :data="element"
                                :flag="index"
                                :processList="processList"
                                :flagData="data"
                                @setHeight="setHeight">
                            </form-design-wapper-item>
                        </div>
                    </transition-group>
                </draggable>
            </Form>
        </div>
        <div class="wrap add-detail">
            <div class="add-actoin">
                <Icon type="md-add" />
                {{element.defaultAction}}
            </div>
        </div>
        <!-- 删除图标 -->
        <div class="widget-view-action">
            <Icon class="icon" type="ios-close" @click.stop="handleWidgetDelete(index)"></Icon>
        </div>
    </FormItem>
</template>

<script>
    import { newObject } from '../common/utils'
    import draggable from 'vuedraggable'
    import FormDesignWapperItem from './formDesignWapperItem.vue'
    export default {
        name: '',
        components: {
            draggable,
            FormDesignWapperItem
        },
        data(){
            return {
                selectWidget: this.select,
                style: {height: ''}
            }
        },

        props: ['element', 'select', 'index', 'data', 'processList'],

        watch: {
            select: {
                handler (val) {
                    this.selectWidget = val
                },
                deep: true
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
            // 添加样式
            hover: function (e) {
                // 样式的移除
                e.path.forEach(element => {
                    if(element.classList && element.classList.contains('form-design-wapper-item')==true)
                        element.classList.remove('hover')
                });
                // 添加样式
                e.currentTarget.classList.add('hover')
            },
            
            // 样式的移除
            mouseOut: function (e) {
                e.currentTarget.classList.remove('hover')
            },

            // 获取点击或拖拽时的对象 用于设置属性
            handleSelectWidget(index) {
                this.selectWidget = this.data.list[index]
            },

            // 删除当前组件
            handleWidgetDelete(index) {  
                // 数据首尾特殊处理     
                if (this.data.list.length - 1 === index) {
                    if (index === 0) {
                        this.selectWidget = {}
                    } else {
                        this.selectWidget = this.data.list[index - 1]
                    }
                } else {
                    this.selectWidget = this.data.list[index + 1]
                }

                this.$nextTick(() => {
                    this.data.list.splice(index, 1)
                })
            },

            // 拖拽结束
            handleMoveEnd (evt, element) {
                // 获取下标, 目标容器，出发容器
                const newIndex = evt.newIndex
                const to = evt.to
                const from = evt.from

                // 设置高度
                this.setHeight()

                // 设置选中状态
                if(from == to) this.selectWidget = element.list[newIndex]
            },

            // 表格动态拖拽
            handleWidgetTableAdd(evt, element, index) {
                // 获取下标
                const newIndex = evt.newIndex
                const oldIndex = evt.oldIndex

                // 定义数据变量
                let data = null

                // 深拷贝一份数据留作备用
                let original = JSON.parse(JSON.stringify(this.data.list))

                // 生成数据
                if(!element.list[newIndex].key)
                    data = newObject(element.list[newIndex])
                else 
                    data = element.list[newIndex]

                // 控件已被设为审批条件，不可移出/入明细控件
                if(this.processList.some(item => item == element.list[newIndex].id)) {
                    this.$Message.error('该控件已被设为审批条件，不可移出/入明细控件')
                    this.$nextTick(() => {
                        // 移除表格内数据
                        element.list.splice(newIndex, 1)
                        // 被移动数据还原到原来的位置
                        this.data.list.splice(oldIndex, 0, data)
                        // 设置选中状态
                        this.selectWidget = this.data.list[oldIndex]
                    })
                    return
                }

                // 处理表格里面不能嵌套表格
                if(element.list[newIndex].type == 'Details') {
                    
                    this.$nextTick(() => {
                        
                        // 处理数据title显示
                        let typeList = this.data.list.filter(item => item.type == data.type)
                        if(typeList.length > 0) data.title = `${data.title}(${typeList.length})`

                        // 移除表格内数据
                        element.list.splice(newIndex, 1)

                        // 数据当前位置后面添加一个数据
                        this.data.list.splice(index+1, 0, data)
                        // 设置选中状态
                        this.selectWidget = this.data.list[index+1]
                    })
                    
                } else {
                    this.$nextTick(() => {
                        if(!element.list[newIndex].key){
                            data = newObject(element.list[newIndex])
                            
                            // 处理数据title显示
                            let typeList = element.list.filter(item => item.type == data.type)
                            if(typeList.length > 1) {
                                data.title = `${data.title}(${typeList.length - 1})`
                                if(data.title1) data.title1 = `${data.title1}(${typeList.length - 1})`
                                if(data.text) data.text = `${data.text}(${typeList.length - 1})`
                            }
                        }

                        // inTable 用于判断数据是否在表单内
                        this.$set(data, 'inTable', true)
                        
                        // 对象内部数据替换
                        this.$set(element.list, newIndex, data)
                        // 设置选中状态
                        this.selectWidget = element.list[newIndex]
                    })
                }
                
                // 设置高度
                this.setHeight()

                // 重置选中数据
                this.$nextTick(() => {
                    this.$emit('update:select', this.selectWidget)
                })
            },

            // 设置高度
            setHeight(type) {
                this.$nextTick().then(() => {
                    let Dom = this.$refs.tableList.children,
                        _height = 0
                    for(let i = 0; i < Dom.length; i++){
                        _height += parseInt(window.getComputedStyle(Dom[i].elm).height.split('px')[0])
                    }
                    // 更新明细内部高度
                    this.$set(this.style, "height", `${_height}px`)
                })
            }
        },

        mounted(){
            // 初始化 明细高度
            this.setHeight()
        }
    }
</script>
