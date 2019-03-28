import Vue from 'vue'
import App from './App.vue'
//导入样式
import './assets/statics/site/css/style.css'
//组件相关,将axios给vue原型
import axios from 'axios'
Vue.prototype.$axios=axios;
//设置基地址
axios.defaults.baseURL="http://111.230.232.110:8899"
//全局过滤器
import moment from 'moment'
Vue.filter('glformatTime',function(value,modle){
if(modle){
  return moment(value).format(modle)
}else{
  return moment(value).format('YYYY-MM-DD')
}
})
import VueRouter from 'vue-router' 
Vue.use(VueRouter)
import index from './components/index.vue'
import cart from './components/cart.vue'
import detail from './components/detail'
//导入elmui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
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
  },
  {
    path:'/detail/:id',
    component:detail
    }]
let router=new VueRouter({
  routes
})


new Vue({
  render: h => h(App),
router
}).$mount('#app')
