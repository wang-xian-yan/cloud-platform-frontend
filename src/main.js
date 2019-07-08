// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {getRequest, postRequest, deleteRequest, putRequest} from './util/api'
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest

Vue.config.productionTip = false

// router.beforeEach((to, from, next)=> {
//   if (to.name == 'Login') {
//     next();
//     return;
//   }
//   var name = window.localStorage.getItem("Username");
//   if (name == null) {
//     console.log(name)
//     if (to.meta.requireAuth || to.name == null) {
//       next({path: '/', query: {redirect: to.path}})
//     } else {
//       next();
//     }
//   } else {
//     console.log('已经登录')
//     next();
//   }
// })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
