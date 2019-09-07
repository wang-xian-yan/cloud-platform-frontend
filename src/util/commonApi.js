import {getRequest} from "./api";

export const initMenu = (store) => {
  if (store.state.menus.length > 0) {
    return;
  }
  getRequest("/api/v1/menus/generate").then(resp => {
    let data = resp.data.data;
    if (data === null) {
      data = [];
    }
    store.commit('initMenu', data);
  })
};
