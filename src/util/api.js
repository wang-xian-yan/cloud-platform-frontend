import axios from 'axios'
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
  console.log('response:', response);
  if (response.data.code === '200') {
    return Promise.resolve(response)

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
    Message.error({message: err.response.data.message})
  } else {
    Message.error({message: '未知异常', showClose: true})
  }
  return Promise.resolve(err)
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

export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: url
  })
};
