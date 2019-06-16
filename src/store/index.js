import Vue from 'vue'
import Vuex from 'vuex'
import { sesSetState,sesGetState } from "@/tools/session";
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        data:{
            token:'',//身份唯一表示token
            uid:'',// 身份特权，只用来判断是否为1 ，也就是只用作在路由守卫逻辑中判断是否为总管理
            role:'',//岗位
            permission:[],//路由权限
            isLogin:0,//是否登陆 默认值0——未登录
        },
    },
    getters: {
        // 获取全部state中全部data值
        Getters_GetData: (state)=>{
            return state.data
        },
    },
    mutations: {
        Mu_SetData: (state,data) => {   // 通过actions直接设置完整的data
            state.data = data;
        },
        Mu_SetToken:(state,token)=>{      // 通过actions设置token
            state.data.token = token;
        },
        Mu_SetPermission:(state,permission)=>{    // 通过actions设置permission,权限
            state.data.permission = permission;
        },
        Mu_SetIsLogin:(state,isLogin)=>{       // 通过actions设置isLogin
            state.data.isLogin = isLogin;
        },
        Mu_SetRole:(state,role)=>{       // 通过actions设置身份数字
            state.data.role = role;
        },
        Mu_SetUid:(state,uid)=>{       // 通过actions设置uid
            state.data.uid = uid;
        },
    },
    actions: {  //context默认相当于子组件中的this.$store
        Ac_SetData: (context,data) => {	            // 控制mutations设置完整的 data值
            context.commit('Mu_SetData',data)
        },
        Ac_Set_Gather: (context,data)=>{ // 登陆时，一次性设置四个值
            var {token,permission,isLogin,role,uid} = {...data};
            context.commit('Mu_SetToken',token);
            context.commit('Mu_SetPermission',permission);
            context.commit('Mu_SetIsLogin',isLogin);
            context.commit('Mu_SetRole',role);
            context.commit('Mu_SetUid',uid);
        },
    },
});
// 缓存 state.data
window.addEventListener("beforeunload",(ev)=>{
    let stateDate = store.state.data;
    sesSetState(stateDate);
});
// 获取并还原 state.data
let stateData = sesGetState();
if (stateData) {
    store.state.data = stateData;
}
export default store
