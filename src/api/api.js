import Http from '../core/commonModel';

let base = "";

export const requestLogin = params => {
  return Http.get(`${base}/sso/validate`, {params: params});
};

export const getUserList = params => {
  return Http.get(`${base}/user/list`, {params: params});
};

export const getUserListPage = params => {
  return Http.get(`${base}/user/listpage`, {params: params});
};

export const removeUser = params => {
  return Http.get(`${base}/user/remove`, {params: params});
};

export const editUser = params => {
  return Http.get(`${base}/user/edit`, {params: params});
};

export const addUser = params => {
  return Http.get(`${base}/user/add`, {params: params});
};

export const test = params => {
  return Http.get(`${base}/test`, {params: params});
};

export const getTemplateModuleList = params => {
  return Http.get(`${base}/template/module/list`, {params: params});
};

export const getPR = params => {
  return Http.get(`${base}/pr/query`, {params: params});
};
