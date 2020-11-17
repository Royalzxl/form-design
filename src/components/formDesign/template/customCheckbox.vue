<template>
    <div :class="['imitate-checkbox', {'imitate-checkbox-checked': checked}]" @click="change">
        <div class="imitate-input"></div>
        <div class="imitate-label">{{ title }}</div>
    </div>
</template>

<script>
    export default {
        name: 'imitate-checkbox',
        components: {},
        data(){
            return {
                
            }
        },

        props: {
            checked: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            }
        },

        created(){},

        methods: {
            change() {
                this.$emit("change")
            }
        },

        mounted(){}
    }
</script>

<style lang='less' scoped>
    .imitate-checkbox{
        display: flex;
        justify-content: flex-start;
        align-items: center;
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
            border-radius: 2px;
            margin-right: 5px;
            -webkit-transition: border-color .2s ease-in-out, background-color .2s ease-in-out;
            transition: border-color .2s ease-in-out, background-color .2s ease-in-out;
            &:hover{
                border-color: #bcbcbc;
            }
            &::after{
                content: '';
                position: absolute;
                top: 2px;
                left: 5px;
                border: 2px solid #fff;
                border-top: 0;
                border-left: 0; 
                display: table;
                width: 4px;
                height: 8px;
                -webkit-transform: rotate(45deg) scale(0);
                -ms-transform: rotate(45deg) scale(0);
                transform: rotate(45deg) scale(0);
                -webkit-transition: all .2s ease-in-out;
                transition: all .2s ease-in-out;
            }
        }
        &.imitate-checkbox-checked{
            .imitate-input{
                border-color: #5497D6;
                background-color: #5497D6;
                &:hover{
                    border-color: #5497D6;
                }
                &::after{
                -webkit-transform: rotate(45deg) scale(1);
                -ms-transform: rotate(45deg) scale(1);
                transform: rotate(45deg) scale(1);
                }
            }
        }
    }
</style>
