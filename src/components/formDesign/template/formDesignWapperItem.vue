<template>
    <FormItem class="form-design-wapper-item widget-view"
        v-if="element && element.key" 
        :class="{'hover active': selectWidget && selectWidget.key == element.key}"
        @mouseout.native.stop="mouseOut"
        @mouseover.native.stop="hover"
        @click.native.stop="handleSelectWidget(index)">
        <!-- 定义组件生成模板 -->
        <!-- 除文字说明|日期区间|计算公式|金额外的组件模板 -->
        <template v-if="element.type !== 'Caption' && element.type !== 'DateRange' 
            && element.type !== 'Amount' && element.type !== 'CFormula'">
            <div class="wrap">
                <!-- 非数字输入框 -->
                <div class="name" v-if="element.type !== 'Number'">{{element.title}}</div>
                
                <!-- 数字输入框 -->
                <div class="name number-unit" v-if="element.type == 'Number'">
                    <p>{{element.title}}</p>
                    <p v-if="element.unit">({{element.unit}})</p>
                </div>

                <!-- 非开关 -->
                <div class="plac" v-if="element.type !== 'Switch'">
                    <div class="text">
                        {{element.placeholder}}
                        <span v-if="+element.necessary">(必填)</span>
                    </div>
                    <!-- 非输入型input框并且非图片上传非附件上传 -->
                    <i v-if="element.type !== 'Input' && element.type !== 'Textarea' && 
                        element.type !== 'Number' && element.type !== 'UploadImg' &&
                        element.type !== 'Attachment'" class="icon iconxiala1 icons">
                    </i>
                    <!-- 图片上传 -->
                    <i v-if="element.type == 'UploadImg'" class="icon icontupianshangchuan"></i>
                    <!-- 附件上传 -->
                    <i v-if="element.type == 'Attachment'" class="icon iconfujian"></i>
                </div>

                <!-- 开关 预设 暂未开放 -->
                <!-- 注意：没有使用 iview-loader 时，必须使用 i-switch 标签。 -->
                <i-switch v-if="element.type == 'Switch'" v-model="element.status" :disabled="element.disabled" :size="element.size" style="pointer-events: none;"/>
            </div>
        </template>

         <!-- 日期区间 -->
        <template v-if="element.type == 'DateRange'">
            <div class="wrap">
                <div class="name">{{element.title}}</div>
                <div class="plac">
                    <div class="text">
                        {{element.placeholder}}
                        <span v-if="+element.necessary">(必填)</span>
                    </div>
                    <i class="icon iconxiala1 icons"></i>
                </div>
            </div>
            <div class="wrap">
                <div class="name">{{element.title1}}</div>
                <div class="plac">
                    <div class="text">
                        {{element.placeholder}}
                        <span v-if="+element.necessary">(必填)</span>
                    </div>
                    <i class="icon iconxiala1 icons"></i>
                </div>
            </div>
            <div class="wrap" v-if="element.automatic">
                <div class="name">{{element.duration}}({{unit}})</div>
            </div>
        </template>

        <!-- 文字说明 -->
        <template v-if="element.type == 'Caption'">
            <div class="wrap caption">
                <div class="text" :style="{'color': element.textcolor}">{{element.text}}</div>
            </div>
        </template>

        <!-- 金额|计算公式 -->
        <template v-if="element.type == 'Amount' || element.type == 'CFormula'">
            <div class="wrap m-cformula">
                <div class="name">{{element.title}}</div>
                <div class="plac">
                    {{element.placeholder}}
                    <span v-if="+element.necessary">(必填)</span>
                </div>
            </div>
            <div class="wrap capital" v-if="element.capital">大写：壹万元整(示例)</div>
        </template>

        <!-- 删除图标 -->
        <div class="widget-view-action">
            <Icon class="icon" type="ios-close" @click.stop="handleWidgetDelete(index)"></Icon>
        </div>
    </FormItem>
</template>

<script>
    export default {
        name: '',
        components: {},
        data(){
            return {
                selectWidget: this.select
            }
        },

        props: ['element', 'select', 'index', 'data', 'flag', 'flagData', 'processList'],

        computed:{
            unit() {
                if(this.element.dateFormat == "YYYY-MM-DD" || this.element.dateFormat == "YYYY-MM-DD am/pm") {
                    this.element.unit = "天"
                    return '天'
                }
                if(this.element.dateFormat == "YYYY-MM-DD hh-mm") {
                    this.element.unit = "小时"
                    return '小时'
                }
            }
        },

        watch: {
            select: {
                handler (val) {
                    this.selectWidget = val
                    if(this.flag && this.flagData) this.$emit('setHeight')
                },
                deep: true,
                immediate: true
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
            // 样式添加
            hover: function (e) {
                e.currentTarget.classList.add('hover')
            },
            // 样式移除
            mouseOut: function (e) {
                e.currentTarget.classList.remove('hover')
            },

            // 获取点击或拖拽时的对象 用于设置属性
            handleSelectWidget(index) {
                this.selectWidget = this.data.list[index]
            },

            // 删除当前组件
            handleWidgetDelete(index) {  
                
                // 被选入流程条件控件不能删除
                if(this.processList.some(item => item == this.data.list[index].id)) {
                    this.$Message.error('该组件已被设为审批条件，不允许删除')
                    return
                }

                // 数据首尾特殊处理     
                if (this.data.list.length - 1 === index) {
                    if (index === 0) {
                        // 处理表格内部不存在内容时 
                        // 此处不能用this.flag && this.flagData 
                        // 因为this.flag 有可能为0 会导致this.flag && this.flagData 不成立
                        if(this.flagData) {
                            this.selectWidget = this.flagData.list[this.flag]
                        } else this.selectWidget = {}
                    } else {
                        this.selectWidget = this.data.list[index - 1]
                    }
                } else {
                    this.selectWidget = this.data.list[index + 1]
                }

                this.$nextTick(() => {
                    this.data.list.splice(index, 1)
                    // 设置明细内部高度
                    // 此处不能用this.flag && this.flagData 
                    // 因为this.flag 有可能为0 会导致this.flag && this.flagData 不成立
                    if(this.flagData) this.$emit('setHeight')
                })
            }
        },

        mounted(){}
    }
</script>