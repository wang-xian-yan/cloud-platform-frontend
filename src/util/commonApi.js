import {getRequest} from "./api";

export const getAllEnterprise = () => {
  let requestUrl = "/api/v1/enterprises";
  console.log('common get enterprise');
  getRequest(requestUrl).then(function (response) {
    return response.data.data;
  })
};
