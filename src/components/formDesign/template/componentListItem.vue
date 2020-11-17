<template>
    <draggable tag="ul" :list="list" 
        v-bind="{group:{ name: 'form-design-drag', pull: 'clone', put: false}, sort:false}"
        @end="handleMoveEnd"
        @start="handleMoveStart"
        :move="handleMove">
        <li v-for="(item, index) in list" :key="index" @click="getObject(item)">
            <span>{{item.name}}</span>
            <i class="icon" :class="item.icon"></i>
        </li>
    </draggable>
</template>

<script>
    import draggable from 'vuedraggable'
    import { newObject } from '../common/utils'
    export default {
        name: '',
        components: {
            draggable
        },
        data(){
            return {}
        },
        props:['list'],

        created(){},

        methods: {
            // 获取组件对象数据 并传递给父组件
            getObject(data) {
                let _Object = newObject(data)
                this.$emit('getData', _Object)
            },

            handleMoveEnd (evt) {},

            handleMoveStart ({oldIndex}) {},
                
            handleMove (evt) {
                return true
            },
        },

        mounted(){}
    }
</script>
