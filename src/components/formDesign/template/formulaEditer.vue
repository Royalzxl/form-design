<template>
    <Modal
        :value="isShow"
        :closable="true"
        width="600"
        :styles="{top: '100px'}"
        @on-visible-change="getFaultModalStatusChange">
        <!-- 自定义header -->
        <div slot="header" style="color: #fff;font-size: 16px;">
            <div class="title">编辑计算公式</div>
        </div>
        <!-- body -->
        <div class="modal-formula">
            <div class="editer-tips">注意：请输入合法的计算公式！不合法的计算公式会导致自动计算失败！</div>
            <div class="editer-wrapper">
                <div class="formula-screen" v-html="formula"></div>
                <div class="formula-action">
                    <span @click="remove">×</span>
                    <span @click="clear">清空</span>
                </div>
            </div>
            <div class="editer-object">
               <div class="title">计算对象：</div>
               <div class="content">
                    <div class="item" v-for="(item, index) in editerObject" :key="index"  @click="setObject(item)">{{ item.details_item_title || item.title }}</div>
                </div>
            </div>
            <div class="editer-symbol">
                <div class="title">计算符号：</div>
                <div class="content">
                    <div class="item" v-for="(item, index) in editerSymbol" :key="index" @click="setSymbol(item)">{{item}}</div>
                </div>
            </div>
            <div class="editer-number">
                <div class="title">数字键盘：</div>
                <div class="content">
                    <div class="item" v-for="(item, index) in editerNumber" :key="index" @click="setNumber(item)">{{item}}</div>
                </div>
            </div>
        </div>
        <!-- 自定义footer -->
        <div slot="footer">
            <Button type="default" @click="doSomething('cancel')">取消</Button>
            <Button type="primary" @click="doSomething('submit')">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import { IsValidateForFormnla, ObjDeepCopy } from '../common/utils'
    export default {
        name: '',
        components: {},
        
        data(){
            return {
                editerNumber: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
                editerSymbol: ['+', '-', '×', '÷', '(', ')'],
                // 记录公式输入
                formulaStr: [],
                // 记录公式选择的计算对象
                formulaObject: [],
                // 存储解析字符串获取的数组
                spanList: [],
                // 存储为app所需要的数组
                appArr: []
            }
        },

        props: ['data', 'componentList', 'isShow', 'count'],

        computed: {
            // 公式显示
            formula() {
                let str = ''
                this.formulaStr.forEach(el => {
                    str += el
                })
                return this.spanList[0] + str
            },
            // 计算对象
            editerObject() {
                // 定义数字|金额变量
                let list = []
                if(!this.data.inTable)
                    list = this.componentList.filter(item => (item.type == "Number" || item.type == "Amount" || (item.type == "CFormula" && item.key !== this.data.key)))
                
                // 找到表单数据里面含有金额|数字输入框的表单
                let tableList = this.componentList.filter(item => item.type == "Details")

                // 获取表单列表里面的数字|金额控件 并加入list
                tableList.forEach(element => {
                    if(element.list && element.list.length > 0) {
                        element.list.forEach(el => {
                            el.details_item_title = `${el.title}(明细)`
                        })
                        list = [...list, ...element.list.filter(el => (el.type == "Number" || el.type == "Amount" || (el.type == "CFormula" && el.key !== this.data.key)))]
                    }
                })
                
                return list
            }
        },

        watch: {
            count: {
                handler(val) {
                    this.clear()
                    // 处理公式输入
                    // 定义正则 用于匹配数据
                    let reg = /<\/span>/ig;
                    this.spanList = (this.data.formula.replace(reg, '</span>,').replace(/,$/, '')).split(',')
                    const [first, ...rest] = this.spanList
                    this.formulaStr.push(...rest)

                    let list = rest.filter(el => /[A-Z]{4,}_[0-9]{13,}/g.test(el))
                    list.forEach(el => {
                        this.formulaObject.push(el.match(/[A-Z]{4,}_[0-9]{13,}/g)[0])
                    })

                    this.appArr = ObjDeepCopy(this.data.formulaApp)
                },
            }
        },

        created(){},

        methods: {
            // 状态控制
            getFaultModalStatusChange(e) {
                this.$emit("StatusChange", e);
            },

            // 设置计算对象
            setObject(data){
                let str = `<span class='span-object' data-id='${data.key}'>${data.details_item_title || data.title}</span>`
                this.formulaStr.push(str)
                this.formulaObject.push(data.key)
                this.appArr.push(data)
            },

            // 设置运算符
            setSymbol(data){
                let str = `<span class='span-symbol'>${data}</span>`
                this.formulaStr.push(str)
                this.appArr.push(data)
            },

            // 设置数字
            setNumber(data){
                let str = `<span class='span-number'>${data}</span>`
                this.formulaStr.push(str)
                this.appArr.push(data)
            },

            // 删除
            remove() {
                // 定义正则 用于匹配数据
                let reg = /\'\w+\'/;
                // 存储移除对象数据的key
                let key = null
                // 临时数据 存储删除数据
                let data = this.formulaStr[this.formulaStr.length-1]

                // 获取删除对象数据的key
                if(reg.test(data)) {
                    key = (data.match(reg)[0]).match(/\w+/)[0]
                }
                // 移除 数据
                this.formulaStr.splice(this.formulaStr.length-1, 1);

                // 移除appArr 数据
                this.appArr.splice(this.appArr.length-1, 1);
                
                // 更新 存储数据
                this.formulaObject = this.formulaObject.filter(el => el !== key)
            },

            // 清空
            clear() {
                this.formulaStr = []
                this.formulaObject = []
                this.appArr = []
            },

            // 确定|取消
            doSomething(type) {
                if(type == "submit"){

                    // 获取移动端显示数据格式
                    let str = ''
                    
                    // 组装计算公式字符串
                    this.appArr.forEach(el => {
                        if(typeof el == 'object') str += el.key
                        else str += el
                    })
                    
                    // 验证计算公式是否正确
                    let flag = IsValidateForFormnla(str, this.formulaObject)
                    
                    // 更改外部数据
                    if(flag) {
                        if(this.formulaObject.length === 0) {
                            this.$Message.warning({content: '请输入需要计算的对象'})
                            return false
                        }
                        this.$set(this.data, 'formula', this.formula)
                        this.$set(this.data, 'formulaApp', this.appArr)
                        this.$emit('doSomething', false)
                    } else {
                        this.$Message.warning({content: '请输入正确的计算公式'})
                    }
                } else {
                    this.clear()
                    this.$emit('doSomething', false)
                }
            },
        },

        mounted(){}
    }
</script>