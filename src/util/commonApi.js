import {getRequest} from "./api";

export const getAllEnterprise = () => {
  let requestUrl = "/api/v1/enterprises";
  console.log('common get enterprise');
  getRequest(requestUrl).then(function (response) {
    return response.data.data;
  })
};
export const initMenu = (store) => {
  if (store.state.menus.length > 0) {
    return;
  }
  getRequest("/api/v1/menus/generate").then(resp => {
    const data = resp.data.data;
    store.commit('initMenu', data);
  })
};
