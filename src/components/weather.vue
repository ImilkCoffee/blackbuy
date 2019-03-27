<template>
     <div id="weather">
      <h2>天气查查查--{{ city }}</h2>
      <input
        type="text"
        @keyup.enter="search"
        v-model.trim="city"
        placeholder="请输入查询的城市"
      />
      <transition-group name="list" tag="p">
        <li
          :style="{transitionDelay:index*300+'ms'}"
          v-for="(it,index) in weatherList"
          :key="index"
        >
          <span v-if="it.type.indexOf('云')!=-1">🌥️</span>
          <span v-else-if="it.type.indexOf('雨')!=-1">🌧️</span>
          <span v-else-if="it.type.indexOf('雪')!=-1">❄️</span>
          <span v-else>🌞</span>
          <!-- {{}}之间的是占位 可以使用任意的内容 -->
          {{ it.date }}-{{ it.high }}-{{ it.low }}-{{ it.type }}
        </li>
      </transition-group>
    </div>
</template>


<script>
export default {
data() {
      return {
        // 查询的城市
      city: '',
      // 天气数组
      weatherList: []
      }
    },
    methods: {
      search() {
        // 调用接口
        this.weatherList = []
        this.$axios
          .get(`http://wthrcdn.etouch.cn/weather_mini?city=${this.city}`)
          .then(
            response => {
              // 请求成功的回调
              // console.log(response);
              // 网速太好了 ^_^ 延迟一下
              setTimeout(() => {
                this.weatherList = response.data.data.forecast
              }, 1000)
            },
            errResponse => {}
          )
      }
    }
}
</script>

<style>
#app {
  width: 400px;
  margin: 10px auto;
}
#app h2 {
  font-size: 40px;
}
#app input {
  height: 40px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 2px gray;
  outline: none;
  font-size: 25px;
  padding-left: 10px;
  width: 400px;
}
#app li {
  list-style: none;
  font-size: 20px;
}
/* 列表动画 */
#app .list-item {
  display: inline-block;
  margin-right: 10px;
}
#app .list-enter-active,
#app .list-leave-active {
  transition: all 1s;
}
#app .list-enter,#app .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}

</style>
