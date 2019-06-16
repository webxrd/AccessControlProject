<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import {testC,testB} from "./api/loginAndRegisterApi";

    export default {
        name: 'App',
        created() {
            testC().then((response)=>{
                console.log(response,'App_response');
            }).catch((err)=>{
                console.log(err);
            })
        },
        methods : {
        },
    }
</script>

<style>
    #components-layout-demo-side .logo {
        height: 32px;
        background: rgba(255, 255, 255, .2);
        margin: 16px;
    }
</style>
