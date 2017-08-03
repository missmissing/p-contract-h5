import axios from 'axios';
import {WebConfig} from './config.js';

//let base = WebConfig.AppSetting.ApiUrl;
let base = "";

//export const requestLogin = params => { return axios.post(`${base}/sso/validate`, params).then(res => res.data); };
export const requestLogin = params => {
  return axios.get(`${base}/sso/validate`, {params: params});
};
export const getUserList = params => {
  return axios.get(`${base}/user/list`, {params: params});
};

export const getUserListPage = params => {
  return axios.get(`${base}/user/listpage`, {params: params});
};

export const removeUser = params => {
  return axios.get(`${base}/user/remove`, {params: params});
};

export const editUser = params => {
  return axios.get(`${base}/user/edit`, {params: params});
};

export const addUser = params => {
  return axios.get(`${base}/user/add`, {params: params});
};

export const test = params => {
  return axios.get(`${base}/test`, {params: params});
};

export const getTemplateModuleList = params => {
  return axios.get(`${base}/template/module/list`, {params: params});
};

export const getPR = params => {
  return axios.get(`${base}/pr/query`, {params: params});
};
