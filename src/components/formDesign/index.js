// 全局批量注册组件

import index from './index.vue';

const components = {index};

const install = function (Vue, opts = {}) {
    Object.keys(components).forEach((key) => {
        // 此处的conponent.name 是用到该组件的名字，与index.vue里面的name一致
        Vue.component(components[key].name, components[key])
    });
}

export default install