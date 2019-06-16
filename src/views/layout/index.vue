<!--项目主组件layout，包含了页头和左侧导航菜单，以及路由出口  也就是主内容区-->
<template>
    <div id="layout">
        <template>
            <a-layout id="components-layout-demo-side" style="min-height: 100vh">
                <!--左侧选项菜单-->
                <a-layout-sider collapsible v-model="collapsed">
                    <!---->
                    <div class="logo"/>
                    <a-menu @click="handleClick"
                            theme="dark"
                            v-model="currentSelectedKeys"
                            :openKeys.sync="currentOpenKeys"
                            mode="inline"
                    >
                        <!--在此处遍历a-sub-menu-->
                        <a-sub-menu v-for="par in list" :key="par.name" v-if="par.meta.cname!='empty'">
                            <!--一级菜单的图标和内容-->
                            <span slot="title" v-if="par.meta.icon">
                                <a-icon :type="par.meta.icon"/>
                                <span>{{par.meta.cname}}</span>
                            </span>
                            <!--二级菜单-->
                            <template v-for="son in par.children">
                                <!--三级菜单——如果当前二级菜单有children则说明这个二级菜单有三级菜单-->
                                <a-sub-menu v-if="son.children" :key="son.name" :title="son.meta.cname">
                                    <!--<span slot="title">{{son.meta.cname}}</span>-->
                                    <a-menu-item v-for="item in son.children" :key="item.name">
                                        <!--mySelectedKeys点击标签页时需要用来更新——当前选中的Slider项-->
                                        <!--myOpenKeys点击标签页时需要用来更新——当前展开的Slider选项组,myOpenKeys:par.name+','+son.name-->
                                        <router-link
                                            :to="{path:`${par.path}/${son.path}/${item.path}`,query:{mySelect:`${item.name}-${par.name}+${son.name}`}}">
                                            {{item.meta.cname}}
                                        </router-link>
                                    </a-menu-item>
                                </a-sub-menu>
                                <!--没有children则直接显示为a-menu-item项-->
                                <a-menu-item v-else="" :key="son.name">
                                    <!--mySelectedKeys点击标签页时需要用来更新——当前选中的Slider项-->
                                    <!--myOpenKeys点击标签页时需要用来更新——当前展开的Slider选项组,myOpenKeys:-->
                                    <router-link
                                        :to="{path:`${par.path}/${son.path}`,query: {mySelect:`${son.name}-${par.name}`}}">
                                        {{son.meta.cname}}
                                    </router-link>
                                </a-menu-item>
                            </template>
                        </a-sub-menu>
                    </a-menu>
                </a-layout-sider>
                <!--右侧主要内容-->
                <a-layout>
                    <!--主体部分——包含页头和内容显示区-->
                    <a-layout-header class="header">
                        <div class="funDop">
                            <a-dropdown placement="bottomRight">
                                <a-button>注销</a-button>
                                <a-menu slot="overlay">
                                    <a-menu-item>
                                        <div class="" @click="">
                                            <router-link to="/">
                                                <a-icon type="user"/>
                                                <span>个人中心</span>
                                            </router-link>
                                        </div>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <div class="" @click="">
                                            <!--<router-link to="/login">-->
                                                <a-icon type="poweroff"/>
                                                <span>退出登录</span>
                                            <!--</router-link>-->
                                        </div>
                                    </a-menu-item>
                                </a-menu>
                            </a-dropdown>
                        </div>
                    </a-layout-header>
                    <a-layout-content style="margin:16px;background-color: #fff;">
                        <!--页部header-->
                        <template>
                            <div class="tabs">
                                <a-tabs
                                    hideAdd
                                    v-model="activeKey"
                                    type="editable-card"
                                    @edit="onEdit"
                                    @tabClick="tabClick"
                                >
                                    <a-tab-pane
                                        v-for="pane in panes"
                                        :key="pane.key"
                                    >
                                        <span slot="tab">
                                            <router-link :to="pane.path">{{pane.title}}</router-link>
                                        </span>
                                    </a-tab-pane>
                                </a-tabs>
                            </div>
                        </template>
                        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                            <div>
                                <transition name="fade-transform" mode="out-in">
                                    <router-view/>
                                </transition>
                            </div>
                        </div>
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </template>
    </div>
</template>

<script>
    import routes from '@/router/routes'
    import {sesGetState} from "@/tools/session";

    export default {
        name: 'layout',
        data() {
            /*panes中数据
            {
                path:route.fullPath,
                title:route.meta.cname,
                name:route.name,
                key:route.path,
                openKeys:openKeys,
                selectedKeys:selectedKeys
            }*/
            return {
                collapsed: false,
                panes: [],//标签页数组
                activeKey: '',//当前标签页被选中的标签key
                currentOpenKeys: [],// Slider当前应该被展开的选项页
                currentSelectedKeys: [],// Slider当前应该被选中的选项item
            }
        },
        methods: {
            //点击侧边栏的每个item执行 —— 添加 一个标签页
            handleClick(e) {
                var tab = this.setPane();
                var key = tab.key;
                var isPush = this.panes.every(function (value) {
                    return value.key != key
                });
                this.activeKey = key;//将刚添加的标签设置为选中状态
                if (isPush){
                    this.panes.push(tab);
                }
            },
            callback(key) {
                // console.log(key,'key')
            },
            // 点击标签页执行的函数
            tabClick(a) {
            },
            // 监听标签页被删除和添加时的执行事件
            onEdit(targetKey, action) {
                // targetKey 被点击的标签页的key
                // action 值只有remove和add
                this[action](targetKey)
            },
            // 删除标签页执行，targetkey是被点击删除的那个标签页的key
            remove(targetKey) {
                // 如果只有一条了，则禁止删除
                if (this.panes.length === 1) {
                    this.$message.warn('只有最后一个了,无法再删了~~', 1);
                    return false
                }
                // 删除被点击的标签页，
                let newPanes = this.panes.filter(function (val) {
                    return val.key !== targetKey;
                });
                //更新标签页数组
                this.panes = newPanes;
            },
            // 内置的添加标签页方法。目前没用到。——现在使用的是methods中的handleClick
            add(targetKey) {
            },
            // return一个标签页，同时获取selectedKeys和openKeys
            setPane(){
                var route = this.$route;
                // 获取selectedKeys和openKeys
                var mySelect = route.query.mySelect;
                var selectedKeys = [];
                var opStr = '';
                var openKeys = [];
                // muSelect是一个使用- 分割的selectedKeys和用加号分割的openKeys
                // selectedKeys只有一个, openKeys可能是两个，所以做以下判断
                if (mySelect){
                    selectedKeys = [mySelect.substr(0,mySelect.indexOf('-'))];
                    opStr = mySelect.substr(mySelect.indexOf('-') + 1);
                    if (opStr.indexOf('+')>=0){
                        openKeys = [...opStr.split('+')];
                    } else {
                        openKeys = [opStr]
                    }
                }
                // 设置一个pane 标签
                let tab = {
                    path:route.fullPath,
                    title:route.meta.cname,
                    name:route.name,
                    key:route.path,
                    openKeys:openKeys,
                    selectedKeys:selectedKeys
                };
                return tab
            },
        },
        computed:{
            // 左侧Slider的内容数组
            list(){
                return this.$router.options.routes
            }
        },
        watch: {
            // 路由改动后执行——添加标签页或者——展开Slider并选中
            $route: {
                handler:function(oldValue,newValue){
                    var tab = this.setPane();
                    this.currentOpenKeys = tab.openKeys;
                    this.currentSelectedKeys = tab.selectedKeys;
                    //检测这个tab是否已经存在，用以确定是否将这个tab添加到标签页中
                    var key = tab.key;
                    var isPush = this.panes.every(function (value) {
                        return value.key != key
                    });
                    this.activeKey = key;//将刚添加的标签设置为选中状态
                    if (isPush){
                        this.panes.push(tab);
                    }
                },
                immediate: true
            },
        },
        // 页面加载时先添加一个tab标签
        created() { // D:\project\backups\src\views\layout\index.vue
            /*// 刷新前——缓存当前页面路径
            window.addEventListener("beforeunload",(ev)=>{
                var route = this.$route;
                var mySelect = route.query.mySelect;
                if (mySelect != 'undefined' && mySelect != null){
                    var tab = this.setPane();
                    if (tab){ // 判断是否存在。因为有时activeKey可能是空，或者panes的数组是空的。那就没必要添加了
                        window.sessionStorage.setItem('tab',JSON.stringify(tab));
                    }
                }
            });
            var currentRoute = window.sessionStorage.getItem('tab');
            /!* 如果session内有刷新前的标签页，则将其还原 *!/
            if (currentRoute != 'undefined' && currentRoute != null) {
                var tab = JSON.parse(currentRoute);

                var key = tab.key;
                // 判断是有重复的。
                var isPush = this.panes.every(function (value) {
                    return value.key != key
                });
                console.log(isPush,'isPush');
                this.activeKey = key;//将刚添加的标签设置为选中状态
                if (isPush){
                    this.panes.push(tab);
                }
                this.currentOpenKeys = tab.openKeys;
                this.currentSelectedKeys = tab.selectedKeys;
                this.activeKey = tab.key;
            }*/
        }
    }
</script>

<style>
    #components-layout-demo-side .logo {
        height: 32px;
        background: rgba(255, 255, 255, .2);
        margin: 16px;
    }

    .tabs a {
        text-decoration: none;
    }

    /*标签页的背景颜色*/
    .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
        background-color: #dadada;
    }

    /*当前被选中标签页的背景颜色*/
    .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
        background-color: #fff;
    }

    .header {
        background-color: #fcfcfc;
        height: 55px;
        line-height: 55px;
    }

    .header:after {
        content: '';
        display: block;
        clear: both;
    }

    .funDop {
        float: right;
    }

    .ant-menu-item {
        transition: background 120ms;
    }

    .ant-menu-submenu .ant-menu-sub {
        transition: background 120ms;
    }

    a {
        transition: color 50ms;
    }
</style>
