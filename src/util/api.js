import axios from 'axios'
import router from '../router'
import store from '../store'

import {Message} from 'element-ui'

axios.interceptors.request.use(config => {
  let token = window.localStorage.getItem('Authorization');
  if (token != null) {
    config.headers['Authorization'] = token;
  }
  config.headers['Content-Type'] = "application/json;charset=utf-8";
  return config
}, err => {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err)
});

axios.interceptors.response.use(response => {
  console.log('成功调用response:', response);
  if (response.data.code === '200') {
    return Promise.resolve(response)
  } else if (response.data.code !== '200') {
    const message = response.data.message;
    console.log('message:' + message);
    if (message === 'token过期') {
      store.commit('logout');
      router.replace('/');
      return Promise.reject(response);
    }
  }
  Message.error({message: response.data.message});
  return Promise.resolve(response)

}, err => {
  console.log('error 服务器错误', err.response);
  if (err.response === undefined) {
    Message.error({message: '未知异常', showClose: true})
  }
  if (err.response.status === 504) {
    Message.error({message: '连接超时', showClose: true})
  } else if (err.response.data.code !== '200') {
    const message = err.response.data.message;
    if (message === 'token过期') {
      store.commit('logout');
      router.replace("/");
      return Promise.reject(err)
    }
    Message.error({message: message})
  } else {
    Message.error({message: '未知异常', showClose: true})
  }
  return Promise.reject(err)
});

export const postRequest = (url, data, header) => {
  return axios({
    method: 'post',
    url: url,
    data: data,
    headers: header
  })
};

export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: url
  })
};

export const getRequest = (url, headers) => {
  return axios({
    method: 'get',
    headers: headers,
    url: url
  })
};
