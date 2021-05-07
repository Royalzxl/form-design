<template>
    <div class='form-design-attribute' v-if="show">
        <!-- 控件名称 -->
        <div class="attribute-head">
            {{select.name}}<span>(控件设置)</span>
        </div>
        <!-- 控件属性 -->
        <div class="attribute-body">
            <!-- 公共的控件说明 -->
            <div class="common-tips">
                控件使用说明
                <Tooltip placement="bottom-end" max-width="300">
                    <i class="icon iconwenti"></i>
                    <div slot="content">
                        <p v-for="(item, index) in select.explanation" :key="index">{{item}}</p>
                    </div>
                </Tooltip>     
            </div>

            <!-- 控件公共的部分标题 -->
            <div class="attr-wrap common-title" v-if="select.type !== 'Caption' && select.type !== 'Switch'">
                <div class="title">标题{{select.type == 'DateRange' ? "1" : ''}}<span>限20字</span></div>
                <Input v-model="select.title" maxlength="20" :readonly="readonly && select.type !== 'DateRange'" show-word-limit @on-focus="setDisabled(1)" /> 
            </div>

            <!-- 日期区间标题2 -->
            <div class="attr-wrap common-title" v-if="select.type == 'DateRange'">
                <div class="title">标题2<span>限20字</span></div>
                <Input v-model="select.title1" maxlength="20" show-word-limit/> 
            </div>

            <!-- 控件公共的部分提示文字 -->
            <div class="attr-wrap common-plac" v-if="select.type !== 'Caption' 
                && select.type !== 'Switch' && select.type !== 'UploadImg' 
                && select.type !== 'Attachment' && select.type !== 'Details'">
                <div class="title">提示文字<span>限30字</span></div>
                <Input v-model="select.placeholder" maxlength="30" show-word-limit/> 
                <div v-if="select.type == 'Textarea'" style="margin-top: 5px">内容最多可填写8000个字</div>
            </div>

            <!-- 数字输入框 -->
            <div class="attr-wrap number-input" v-if="select.type == 'Number'">
                <div class="attr-wrap common-title">
                    <div class="title">单位<span>限20字</span></div>
                    <Input v-model="select.unit" maxlength="20" show-word-limit placeholder="如：kg 元 张等"/> 
                </div>
                <div class="attr-wrap common-title checkbox-group">
                    <div class="title">输入类型<span>可多选</span></div>
                    <CheckboxGroup v-model="select.numberType">
                        <Checkbox label="positive">正数</Checkbox>
                        <Checkbox label="negative">负数</Checkbox>
                        <Checkbox label="integer">整数</Checkbox>
                        <Checkbox label="Decimal">小数</Checkbox>
                    </CheckboxGroup>
                </div>
                <div class="attr-wrap common-title dec-places">
                    <div class="title">可输入的小数位数</div>
                    <Select v-model="select.DecPlaces">
                        <Option value="1">1位</Option>
                        <Option value="2">2位</Option>
                        <Option value="3">3位</Option>
                        <Option value="4">4位</Option>
                        <Option value="5">5位</Option>
                        <Option value="6">6位</Option>
                    </Select>
                </div>
            </div>

            <!-- 文本说明 -->
            <div class="attr-wrap text" v-if="select.type == 'Caption'">
                <div class="attr-wrap common-title">
                    <div class="title">
                        <div>文字说明<span>限2000字</span></div>
                        <ColorPicker v-model="select.textcolor" />
                    </div>
                    <Input v-model="select.text" maxlength="2000" show-word-limit type="textarea" :rows="4"/> 
                </div>
                <div class="attr-wrap common-title">
                    <div class="title">链接跳转地址<span>可填</span></div>
                    <Input v-model="select.link" placeholder="如：https://www.baidu.com" type="textarea" :rows="2"/> 
                </div>
            </div>

            <!-- 日期|日期区间 -->
            <div class="attr-wrap data" v-if="select.type == 'Date' || select.type == 'DateRange'">
                <div class="attr-wrap common-title">
                    <div class="title">日期格式选择</div>
                    <!-- 自定义单选框组 -->
                    <custom-radio-group :list="dateFormat" :checked="select.dateFormat" @change="radioSetValue"></custom-radio-group>
                </div>
            </div>

            <!-- 日期区间时长显示 -->
            <div class="attr-wrap data" v-if="select.type == 'DateRange'">
                <div class="attr-wrap common-title" >
                    <div class="title">自动计算时长</div>
                    <!-- 自定义checkbox -->
                    <custom-checkbox :checked="select.automatic" title="开启" @change="setValue('automatic')"></custom-checkbox>
                    <div class="attr-wrap common-title data-duration" v-if="select.automatic">
                        <div class="title">时长标题<span>限20字</span></div>
                        <Input :readonly="readonly" v-model="select.duration" maxlength="20" show-word-limit @on-focus="setDisabled()"/> 
                    </div>
                </div>
            </div>

            <!-- 单复选框 -->
            <div class="attr-wrap rc-box" v-show="select.type == 'Radio' || select.type == 'Checkbox'">
                <div class="attr-wrap common-title">
                    <div class="title">选项<span>最多200项，每项最多50个字</span></div>
                    <draggable :list="select.options" v-bind="dragOptions" @move="onStart">
                        <transition-group tag="ul" class="rc-box-ul" name="slideInRight">
                            <li v-for="(item, index) in select.options" :key='item.id'>
                                <Input placeholder="Enter name" :readonly="readonly" v-model="item.value" @on-focus="setDisabled()">
                                    <Icon custom="icon icontiaoxu" class="drag-item" slot="prefix" />
                                </Input>
                                <Icon type="ios-remove-circle-outline" size=20 class="remove" @click="remove(index)"/>
                                <Icon type="ios-add-circle-outline" size=20 class="add" @click="add(index)"/>
                            </li>
                        </transition-group>
                    </draggable>
                    <!-- 单选框 关联设置 -->
                    <div class="related title" v-show="select.type == 'Radio'" @click.stop="setRelated">选项属性联动设置<span :class="[{ 'color': isRelated }]">({{ isRelated ? '已' :`未`}}设置)</span></div>
                    <!-- 单选弹窗 此处弹窗不能放在common-title容器外面，不然会产生冲突-->
                    <RadioRelated 
                        :isShow="isRShow"
                        :data="select"
                        :count="related"
                        :componentList.sync="data.list"
                        @StatusChange="statusChange"
                        @doSomething="close">
                    </RadioRelated>
                </div>
            </div>

            <!-- 图片|附件 -->
            <div class="attr-wrap upload" v-if="select.type == 'UploadImg' || select.type == 'Attachment'">
                <div class="attr-wrap common-title checkbox-group">
                    <div class="title">
                        {{select.type == 'UploadImg' ? '图片' : '附件'}}格式<span>可多选</span>
                    </div>
                    <!-- CheckboxGroup 添加key属性 重绘视图 -->
                    <CheckboxGroup v-model="select.fileFormat" :key="select.id">
                        <Checkbox v-for="(item, index) in setFileFormat" :disabled="isAll && item !== 'ALL'" :label="item" :value="item" :key="index"></Checkbox>
                    </CheckboxGroup>
                </div>
            </div>

            <!-- 金额输入框|计算公式 -->
            <div class="attr-wrap money" v-show="select.type == 'Amount' || select.type == 'CFormula'">
                <div class="attr-wrap common-title" v-show="select.type == 'Amount'">
                    <div class="title ">金额千分位</div>
                    <Checkbox v-model="select.places"><span>以千分位格式显示金额；如：90,0000</span></Checkbox>
                </div>
                <div class="attr-wrap common-title" v-show="select.type == 'CFormula'">
                    <div class="formula">
                        <div class="title">计算公式</div>
                        <div class="title colors" @click="setFormula">修改</div>
                    </div>
                    <div class="formula-wrap" @click="setFormula" v-html="select.formula"></div>
                    
                    <!-- 计算公式弹窗 -->
                    <FormulaEditer 
                        :isShow="isFShow"
                        :data="select"
                        :count="formula"
                        :componentList="data.list"
                        @StatusChange="statusChange"
                        @doSomething="close">
                    </FormulaEditer>
                </div>
                <div class="attr-wrap common-title">
                    <div class="title">大写</div>
                    <Checkbox v-model="select.capital">显示大写<span>(输入数字后自动显示大写)</span></Checkbox>
                </div>
            </div>

            <!--部门|人员选择 -->
            <div class="attr-wrap money" v-if="select.type == 'Department' || select.type == 'Contact'">
                <div class="attr-wrap common-title">
                    <div class="title ">选项</div>
                    <RadioGroup v-model="select.chooseType">
                        <Radio label='0'>只能选择一{{select.type == "Contact" ? '人' : '个部门'}}</Radio>
                        <Radio label='1'>可同时选择多{{select.type == "Contact" ? '人' : '个部门'}}</Radio>
                    </RadioGroup>
                </div>
                <div class="attr-wrap common-title">
                    <div class="title">默认{{select.type == "Contact" ? '人员' : '部门'}}设置</div>
                    <Checkbox v-model="select.default">默认当前登录用户{{select.type == "Contact" ? '' : '所属部门'}}</Checkbox>
                </div>
            </div>

            <!--明细 -->
            <div class="attr-wrap details" v-if="select.type == 'Details'">
                <div class="attr-wrap common-title">
                    <div class="title">明细添加按钮名称<span>限20字</span></div>
                    <Input v-model="select.defaultAction" maxlength="20" show-word-limit/> 
                </div>
                <div class="attr-wrap common-title">
                    <div class="title">显示</div>
                    <Checkbox v-model="select.sort">显示序号</Checkbox>
                </div>
            </div>

            <!-- 是否必填共部分 -->
            <div class="attr-wrap common-title single-input" v-if="select.type !== 'Details'">
                <div class="title">
                    {{select.type == "Caption" ? '显示' : '验证'}}
                    <Tooltip placement="top-end" max-width="300" v-if="select.type == 'CFormula' || select.type == 'Number' || select.type == 'Radio' || select.type == 'DateRange' || select.type == 'Amount'">
                        <i class="icon iconwenti"></i>
                        <div slot="content">
                            <p>1.{{select.type !== 'DateRange' ? '选择为必填后' : '勾选开启时长且为必填后，自动计算得到的时长'}}可作为流程条件；</p>
                            <p>2.流程设置里可用于分支流程走向。</p>
                        </div>
                    </Tooltip> 
                </div>
                <!-- 自定义checkbox -->
                <custom-checkbox v-if="select.type !== 'Caption'" :checked="select.necessary" title="必填" @change="setValue('necessary')"></custom-checkbox>
                <custom-checkbox v-else :checked="select.isArrowShow" title="在审批页显示" @change="setValue('isArrowShow')"></custom-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import RadioRelated from './radioRelated.vue'
    import FormulaEditer from './formulaEditer.vue'
    import CustomCheckbox from './customCheckbox'
    import CustomRadioGroup from './customRadioGroup'
    export default {
        name: '',
        components: {
            draggable,
            RadioRelated,
            FormulaEditer,
            CustomCheckbox,
            CustomRadioGroup
        },
        data(){
            return {
                // 文件格式
                fileFormat: ["DOCX","DOC", "PDF", "TXT", "HTML", "XML", "PNG", "JEPG", "ALL"],
                // 图片格式
                imageFormat: ['JPG','JPEG','PNG','BMP','GIF','TIF','TIFF', "ALL"],
                // 日期格式
                dateFormat: [
                    // {id:'YYYY-MM',name:"年-月"},
                    {id:'YYYY-MM-DD',name:"年-月-日"},
                    // {id:'YYYY-MM-DD hh:mm',name:"年-月-日 时:分"},
                    // {id:'YYYY-MM-DD hh:mm:ss',name:"年-月-日 时:分:秒"},
                    {id:'YYYY-MM-DD am/pm',name:"年-月-日 上午/下午"}
                ],
                // 控制单选modal显示隐藏
                isRShow: false,
                // 单选计数 控制数据更新
                related: 0,
                // 控制计算公式modal显示隐藏
                isFShow: false,
                // 计算公式计数 控制数据更新
                formula: 0,
            }
        },

        props: ['select', 'data', 'processList'],

        computed: {
            // 是否显示设置属性控件
            show() {
                if(this.select && Object.keys(this.select).length > 0) return true
                return false
            },

            // 区分图片格式 与 附件格式
            setFileFormat() {
                let list = this.fileFormat
                if(this.select.type == 'UploadImg') list = this.imageFormat
                return list
            },

            // 流程条件
            prosessConditiionList() {
                let list = []
                for(let key in this.processList) {
                    list = [...list, ...this.processList[key]]
                }
                return list
            },

            // 判断禁止修改
            disabled() {
                if(this.prosessConditiionList.some(item => item == this.select.id)) { 
                    return true
                } else {
                    return false
                }
            },

            // 只读
            readonly(){
                if(this.disabled) {
                    return true
                } else {
                    return false
                }
            },

            // 是否可以拖拽 拖拽配置
            dragOptions() {
                let options = {
                    group:'options', 
                    handle:'.drag-item', 
                    ghostClass: 'ghost1',
                    disabled: false
                }

                if(this.disabled) 
                    this.$set(options, 'disabled', true)

                return options
            },

            // 解决单选框关联表单设置与否
            isRelated() {
                if(this.select.type == 'Radio'){
                    return this.select.options.some(e => e.related && e.related.length > 0)
                }
            },

            // 文件格式是否选择ALL
            isAll() {
                let select = this.select.fileFormat.filter(e => e == 'ALL')[0]
                select && this.$set(this.select, 'fileFormat', ['ALL'])
                return select ? select : false
            }
        },

        watch: {
            'select.necessary': {
                handler(val) {
                    if(this.select.type == 'CFormula' || this.select.type == 'Number' || this.select.type == 'Amount' || this.select.type == 'Radio' || this.select.type == 'DateRange') {
                        if(this.select.type != 'DateRange') this.$set(this.select, 'required', val)
                        else {
                            if(val == true && this.select.automatic == true ) this.$set(this.select, 'required', true)
                            else this.$set(this.select, 'required', false)
                        }

                        this.data.list.forEach(element => {
                            element.type == 'Details' && this.$delete(element, 'required')
                            element.list && element.list.forEach(el => {
                                this.$delete(el, 'required')
                            })
                        })
                    }
                }
            },

            'select.automatic': {
                handler(val) {
                    if(val == true && this.select.necessary == true ) this.$set(this.select, 'required', true)
                    else this.$set(this.select, 'required', false)
                }
            },

            data: {
                handler(val) {
                    val && this.$emit('update:data', val)
                },
                deep: true
            }
        },

        created(){},

        methods: {
            // 删除选项
            remove(index) {
                if(this.disabled) {
                    this.setMessage()
                } else {
                    this.select.options.splice(index, 1)
                }
            },

            // 新增选项
            add(index) {
                if(this.disabled) {
                    this.setMessage()
                } else {
                    this.select.options.forEach((el, index) => {
                        el.id = index + 1,
                        el.key =`option_${index}`
                    })
                    let option = {
                        value: `选项${this.select.options.length + 1}`,
                        id: this.select.options.length + 1,
                        key: `option_${this.select.options.length}`
                    };
                    if(this.select.type == "Radio") {
                        option.related = []
                        option.limits = ''
                    }
                    this.select.options.splice(index+1, 0, option)
                }
            },

            // 设置关联选项
            setRelated() {
                // 每次点开自动加一
                if(this.disabled) {
                    this.setMessage()
                } else {
                    this.related += 1
                    this.isRShow = true
                }
            },

            // 打开公式编辑器
            setFormula() {
                // 每次点开自动加一
                this.formula += 1
                this.isFShow = true;
            },

             // 控制 显示状态
            statusChange(e) {
                if(e === false) {
                    this.isRShow = false
                    this.isFShow = false
                }
            },

            // 设置属性值，不允许修改已被设置为流程条件的控件属性 日期格式
            radioSetValue(id) {
                if(this.disabled) {
                    this.setMessage()
                } else {
                    this.select.dateFormat = id
                }
            },

            // 设置属性值，不允许修改已被设置为流程条件的控件属性
            setValue(name) {
                if(this.disabled) {
                    this.setMessage()
                } else {
                    this.select[name] = !this.select[name]
                }
            },

            // 设置属性值，不允许修改已被设置为流程条件的控件输入框属性
            setDisabled(type) {
                if(type && this.select.type == 'DateRange'){}
                else {
                    this.setMessage()
                }
            },

            // 设置属性值，不允许修改已被设置为流程条件的控件属性, 提示语
            setMessage(){
                if(this.disabled) {
                    this.$Message.error('该组件已被设为审批条件，不允许修改')
                } 
            },

            // 设置属性值，不允许修改已被设置为流程条件的控件单复选框选项拖动排序
            onStart(evt) {
                let oldIndex = evt.oldIndex
                this.setMessage()
            },

            // 关闭弹窗
            close() {
                this.isRShow = false
                this.isFShow = false
            }
        },

        mounted(){}
    }
</script>

<style lang='less' scoped>

</style>
