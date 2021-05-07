<template>
    <Modal
        :value="isShow"
        :closable="true"
        width="800"
        :styles="{top: '100px'}"
        @on-visible-change="getFaultModalStatusChange">
        <!-- 自定义header -->
        <div slot="header" style="color: #fff;font-size: 16px;">
            <div class="title">单选框 - 选项属性联动设置</div>
        </div>
        <!-- body -->
        <div class="modal-related">
            <div class="add-action">
                <Button type="primary" style="display: block" @click.native.stop="addAction()">+添加行</Button>
                <p v-if="!flag">根据选项，可以关联控制其他控件是否显示。当前控件和上级选项不能被关联显示。</p>
                <p v-if="flag">根据选择的选项，显示明细内的其他控件。</p>
            </div>
            <div>
               <Table row-key="id" ref='table' max-height="500" :columns="columns" :data="tableData">
                    <!-- 选项名称 -->
                    <template v-slot:name="{ row, index }">
                        <Input v-model="row.value" style="width: 94%" @on-change="setValue($event, index, row.value)" />
                    </template>
                    <!-- 关联控件 -->
                    <template v-slot:related="{ row, index }">
                        <Select :value="row.related" clearable multiple style="width: 94%" @on-change="setRelated($event, index, row.related)">
                            <Option v-for="(item, index) in list" :disabled="item.disabled" :value="item.key" :key="index">{{`${item.title}${item.title1 ? item.title1 : ''}`}}</Option>
                        </Select>
                    </template>
                    <!-- 权限 -->
                    <!-- <template v-slot:limits="{ row, index }">
                        <Select v-model="row.limits" clearable style="width: 94%" @on-change="setLimits($evwnt, index, row.limits)">
                            <Option v-for="(item, index) in limits" :value="item.id" :key="index">{{ item.value }}</Option>
                        </Select>
                    </template> -->
                    <!-- 操作 -->
                    <template class="action" v-slot:action="{ index }">
                       <Button type="error" @click="remove(index)">删除</Button>
                    </template>
                </Table>
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
    import { ObjDeepCopy } from '../common/utils'
    export default {
        name: '',
        components: {},
        
        data(){
            return {
                // 表格columns表头
                columns: [
                    {
                        title: '当选项为',
                        key: 'title',
                        align: 'center',
                        width: '150px',
                        slot:'name',
                    },
                    {
                        title: '显示以下控件',
                        key: 'related',
                        align: 'center',
                        slot:'related',
                    },
                    // {
                    //     title: '权限',
                    //     key: 'limits',
                    //     align: 'center',
                    //     width: '150px',
                    //     slot: 'limits',
                    // },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: '100px',
                        slot:'action'
                    }
                ],
                // 权限数据
                // limits: [
                //     {
                //         value: '只读',
                //         id: 1
                //     },
                //     {
                //         value: '显示',
                //         id: 2
                //     },
                //     {
                //         value: '隐藏',
                //         id: 1
                //     },
                //     {
                //         value: '读写',
                //         id: 1
                //     }
                // ],
                // 数据分离，确保数据不会影响操作
                tableData: ObjDeepCopy(this.data.options),
                // 判断是否是表格里面的单选
                flag: false,
            }
        },

        props: ['data', 'componentList', 'isShow', 'count'],

        computed: {
            list() {
                let list = ObjDeepCopy(this.componentList) || []
                let tableList = null
                
                // 找到当前单选框是否在表单数据里面
                this.componentList.filter(item => item.type == "Details").forEach(el => {
                    if(el.list && el.list.some(elm => elm.key == this.data.key))
                        tableList = ObjDeepCopy(el.list)
                })

                // 设置 提示
                this.data.inTable ? this.flag = true : this.flag = false

                // 设置禁止选择
                Array.isArray(tableList) && tableList.forEach(element => {
                    if(element.key == this.data.key) {
                        element.disabled = true
                    }
                });

                // 设置禁止选择
                list.forEach(element => {
                    if(element.key == this.data.key) {
                        element.disabled = true
                    }
                    if(element.type === 'Caption') {
                        element.title = element.text
                    }
                });

                return tableList ? tableList : list
            }
        },

        watch: {
            count: {
                handler(val) {
                    // 数据分离，便于操作
                    this.tableData = ObjDeepCopy(this.data.options)
                },
            },

            componentList: {
                handler(val) {
                    val && this.$emit('updated:componentList', val)
                },
                deep: true
            }
        },

        created(){},

        methods: {
            // 状态控制
            getFaultModalStatusChange(e) {
                this.$emit("StatusChange", e)
            },

            // 添加一行
            addAction() {
                let option = {
                    value: `选项${this.tableData.length + 1}`,
                    id: this.tableData.length + 1,
                    related: [],
                    key: `option_${this.tableData.length}`,
                    limits: ''
                };
                this.tableData.push(option)
            },

            // 选项名改变
            setValue(evt, index, value) {
                this.$set(this.tableData[index], 'value', value)
            },

            // 关联控件改变
            setRelated(evt, index, value) {
                let key = `${this.data.key}_${index}`,
                    related = this.tableData[index].related || [],
                    len = related.length,
                    InTableList = [],
                    controlList = []
                
                if(this.data.inTable) {
                    this.componentList.filter(item => item.type == "Details").forEach(el => {
                        if(el.list && el.list.some(elm => elm.key == this.data.key))
                            InTableList = el.list
                    })
                }
                
                controlList = this.data.inTable ? InTableList : this.componentList


                // 给所有表单控件添加 related 属性
                controlList.forEach(e => {
                    // Ⅰ、value.length == 0
                    if(!value.length) {
                        e.related = e.related.filter(el => el !== key)
                    }
                    // Ⅱ、value.length < len
                    if(value.length && value.length < len) {
                        // 获取取消的关联的控件key
                        let keys = related.filter(el => value.every(ele => ele !== el))
                        keys.forEach(el => {
                            // 修改数据e.related
                            if(el == e.key) e.related = e.related.filter(ele => ele !== key)
                        })
                    }
                    // Ⅲ、value.length > len
                    if(value.length && value.length > len) {
                        // 获取新增的关联的控件key
                        let keys = value.filter(ele => related.every(elem => ele !== elem))
                        keys.forEach(el => {
                            // 修改数据e.related
                            if(el == e.key) e.related = [...e.related, key]
                        })
                    }
                })
                
                this.tableData[index].related = evt
            },

            // 权限改变
            setLimits(evt, index, value) {
                this.$set(this.tableData[index], 'limits', value.id)
            },

            // 删除
            remove(index) {
                this.tableData.splice(index, 1)
            },

            // 确定|取消
            doSomething(type) {
                if(type == "submit"){
                    // 更改外部数据
                    this.$set(this.data, 'options', ObjDeepCopy(this.tableData))
                }
                this.$emit('doSomething', false)
            },
        },

        mounted(){
            // 数据分离，确保数据不会影响操作
            // this.tableData = ObjDeepCopy(this.data.options)
        }
    }
</script>
