import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: window.localStorage.getItem('UserId' || '[]') === '' ? '未登录' : window.localStorage.getItem('UserId' || '[]'),
      username: window.localStorage.getItem('Username' || '[]') === '' ? '未登录' : window.localStorage.getItem('Username' || '[]'),
      userFace: window.localStorage.getItem('UserFace' || '[]') === '' ? '未登录' : window.localStorage.getItem('UserFace' || '[]'),
      token: window.localStorage.getItem('Authorization' || '[]') === '' ? '未登录' : window.localStorage.getItem('Authorization' || '[]')
    }
  },
  mutations: {
    login(state, user) {
      console.log(user);
      window.localStorage.setItem('Authorization', user.data.token);
      window.localStorage.setItem("Username", user.data.username);
      window.localStorage.setItem('UserId', user.data.id);
      state.user.id = user.data.id;
      state.user.username = user.data.username;
      state.user.token = user.data.token;

    },
    logout(state) {
      console.log("logout state:" + state);
      window.localStorage.removeItem('Authorization');
      window.localStorage.removeItem('Username');
      window.localStorage.removeItem('UserId');
      state.user.username = '';
      state.user.id = '';
      state.user.token = '';
    }
  }
});
