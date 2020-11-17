<template>
    <div class="imitate-radio-group">
        <div v-for="item in list" :key="item.id" :class="['imitate-radio', {'imitate-radio-checked': checked === item.id}]" @click="change(item)">
            <div class="imitate-input"></div>
            <div class="imitate-label">{{ item.name }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'imitate-radio-group',
        components: {},
        data(){
            return {}
        },

        props: {
            list: {
                type: Array,
                default: function() {
                    return []
                }
            },
            checked: {
                type: String,
                default: ''
            }
        },

        created(){},

        methods: {
            // 获取选中数据
            change(item) {
                if(item.id == this.checked) return
                this.$emit('change', item.id)
            }
        },

        mounted(){}
    }
</script>

<style lang='less' scoped>
    .imitate-radio-group{
        .imitate-radio{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: auto;
            cursor: pointer;
            .imitate-input{
                position: relative;
                overflow: hidden;
                display: inline-block;
                width: 16px;
                height: 16px;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                border: 1px solid #dcdee2;
                background-color: #fff;
                border-radius: 50%;
                margin-right: 5px;
                -webkit-transition: border-color .2s ease-in-out, background-color .2s ease-in-out;
                transition: border-color .2s ease-in-out, background-color .2s ease-in-out;
                &:hover{
                    border-color: #bcbcbc;
                }
                &::after{
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    display: table;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: #fff;
                    overflow: hidden;
                    -webkit-transform: translate(-50%, -50%) scale(0);
                    -ms-transform: translate(-50%, -50%) scale(0);
                    transform: translate(-50%, -50%) scale(0);
                    -webkit-transition: all .2s ease-in-out;
                    transition: all .2s ease-in-out;
                }
            }
            &.imitate-radio-checked{
                .imitate-input{
                    border-color: #5497D6;
                    &:hover{
                        border-color: #5497D6;
                    }
                    &::after{
                        -webkit-transform: translate(-50%, -50%) scale(1);
                        -ms-transform: translate(-50%, -50%) scale(1);
                        transform: translate(-50%, -50%) scale(1);
                        background-color: #5497D6;
                    }
                }
            }
        }
    }
</style>
