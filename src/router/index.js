import Vue from 'vue'
import Router from 'vue-router'
import tempObj from './routes'//包含着一个routes数组和一个过滤数组的递归方法

Vue.use(Router);
export default new Router({
    routes:tempObj.routes,
    filterPrivilege:tempObj.filterPrivilege
})
