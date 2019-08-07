// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {deleteRequest, getRequest, postRequest, putRequest} from './util/api'

const baseURL = "http://49.234.133.55:8081";
axios.defaults.baseURL = baseURL;
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.prototype.baseUrl = baseURL;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
    if (to.name === 'Login') {
      next();
      return;
    }
    let name = store.state.user.username;
    if (name === '未登录') {
      if (to.meta.requireAuth || to.name == null) {
        next({path: '/', query: {redirect: to.path}})
      } else {
        next();
      }
    } else {
      next();
    }
  }
);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
