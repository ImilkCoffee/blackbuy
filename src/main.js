import Vue from 'vue'
import App from './App.vue'
//导入样式
import './assets/statics/site/css/style.css'
//组件相关
import VueRouter from 'vue-router' 
Vue.use(VueRouter)
import index from './components/index.vue'
import cart from './components/cart.vue'
let routes=[{
path:'/',
component:index
},
{
path:'/index',
component:index
},
{
  path:'/cart',
  component:cart
  }]
let router=new VueRouter({
  routes
})


new Vue({
  render: h => h(App),
router
}).$mount('#app')
