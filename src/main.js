// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
import Antd from 'ant-design-vue'//引入全部antd组件
import {message} from 'ant-design-vue'//引入全部antd组件
import 'ant-design-vue/dist/antd.css'//引入antd的css样式
import axios from 'axios'
import {sesSetState, sesGetState} from "@/tools/session";

Vue.prototype.$axios = axios; // 特殊情况下可以使用this.$axios，一般使用自定义的
Vue.config.productionTip = false;
router.beforeEach(function (to, from, next) {
    console.log(to);
    console.log(from);
    var data = store.state.data;    // 获取store中状态
    var isLogin = data.isLogin;     //是否登陆了——默认Number类型 0 ,登陆后会被设置为  1
    var isAllow = data.permission.includes(to.meta.role);// 要去的路由页面是否符合当前身份的权限
    var uid = data.uid; // 身份信息——主要只用作判断是否为1
    //1__没有登陆。
    if (to.path == '/login' && isLogin == false ) {
        next();
        // 1__已经登陆。2__不是去login页面。3__是总管理
    }else if (to.path !== '/login' && uid==1) {
        next();
        //1__登陆了。2__不是去login页面。3__不是总管理。4__拥有去目标路由的权限
    }else if(to.path !== '/login' && uid!=1 && isAllow) {
        next();
        //1__登陆了。2__不是去login页面。3__不是总管理。4__未拥有去目标路由的权限
    }else if(to.path !== '/login' && uid!=1 && isAllow == false) {
        next(from.fullPath);
        // 1__登陆了。2__去的是login页面
    } else if (to.path == '/login'){
        message.warn('尚未退出登陆！');
        console.log(from);
        next(from.fullPath);
    }
});
Vue.use(Antd);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    beforeCreate() {
        // 提示信息的全局配置
        this.$message.config({
            top: `100px`,
            duration: 2,
            maxCount: 3,
        });
    },
    created() {

    },
    watch : {
        // 当isLogin发生改变时。执行更新options.routes——相当于更新了左侧侧边栏选项菜单
        '$store.state.data.isLogin' : {
            handler : function () {
                var data = this.$store.state.data;
                // isLogin为1 说明登陆了。且data.role 不是1 也就是说不是总管理。则需要过滤出新的菜单
                if (data.isLogin == '1' && data.uid != '1') {
                    // 身份信息，permission，当作 filterPrivilege方法的参数。用来对比出一个新的路由数组
                    var permission = data.permission;
                    var target = this.$router.options.filterPrivilege(permission);
                    this.$router.options.routes = target;// options.routes是用来页面生成左侧Slider菜单的
                    console.log(this.$router.options.routes,'Target__this.$router.options.routes');
                }
            },
            immediate: true
        }
    },
    methods: {},
    components: {App},
    template: '<App/>'
});


