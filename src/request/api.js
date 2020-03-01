import http from './http.js';
import base from './config.js';

//博文相关接口
const getHomeArticleList = async () => {
	const response = await http.get(`${base.dev}/blog/article-list`);
	return (response && response.data) || {};
};

const newArticle = async (params) => {
	const response = await http.post(`${base.dev}/blog/new-article`, params);
	return (response && response.data) || {};
};

const updateArticle = async (params) => {
	const response = await http.post(`${base.dev}/blog/update-article`, params);
	return (response && response.data) || {};
};

const getArticleDetail = async (params) => {
	const response = await http.get(`${base.dev}/blog/article-detail`, {
		params: params
	});
	return (response && response.data) || {};
};

//用户相关接口
const userRegister = async (params) => {
	const response = await http.post(`${base.dev}/user/register`, params);
	return (response && response.data) || {};
};

const usernameUseable = async (params) => {
	const response = await http.post(`${base.dev}/user/username-useable`, params);
	return (response && response.data) || {};
};

const userLogin = async (params) => {
	const response = await http.post(`${base.dev}/user/login`, params);
	return (response && response.data) || {};
};

const userLogout = async (params) => {
	const response = await http.post(`${base.dev}/user/logout`, params);
	return (response && response.data) || {};
};

const checkLogin = async () => {
	const response = await http.get(`${base.dev}/user/check-login`);
	return (response && response.data) || {};
};

const apis = {
	getHomeArticleList,
	newArticle,
	updateArticle,
	getArticleDetail,
	userRegister,
	usernameUseable,
	userLogin,
	userLogout,
	checkLogin
};

export default apis;
