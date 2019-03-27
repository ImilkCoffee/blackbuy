<template>
  <div id="app">
    <router-link to='/input'>计数器</router-link>
   <router-link to='/play'>音乐播放器</router-link> 
    <router-link to='/weather'>天气查询</router-link>  
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  
}
</script>

<style>

</style>
