// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {deleteRequest, getRequest, postRequest, putRequest} from './util/api'

const baseURL = "http://49.234.133.55:8081";
// const baseURL = "http://localhost:8083";
axios.defaults.baseURL = baseURL;
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.prototype.baseUrl = baseURL;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
    let name = store.state.user.username;
    if (to.name === 'Login') {
      if (name !== '未登录' && name !== '' && name != null) {
        next('index');
        return;
      }
      console.log('login:' + name);
      next();
      return;
    }

    if (name === '未登录' || name == null) {
      next({path: '/', query: {redirect: to.path}});
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
