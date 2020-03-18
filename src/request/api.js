import http from './http.js';
import base from './config.js';

//博文相关接口
const getDevArticleList = async (params) => {
	const response = await http.get(`${base.dev}/blog/dev-article-list`, {
		params: params
	});
	return (response && response.data) || {};
};

const getEssayArticleList = async (params) => {
	const response = await http.get(`${base.dev}/blog/essay-article-list`, {
		params: params
	});
	return (response && response.data) || {};
};

const newDevArticle = async (params) => {
	const response = await http.post(`${base.dev}/blog/new-dev-article`, params);
	return (response && response.data) || {};
};

const newEssayArticle = async (params) => {
	const response = await http.post(
		`${base.dev}/blog/new-essay-article`,
		params
	);
	return (response && response.data) || {};
};

const updateDevArticle = async (params) => {
	const response = await http.post(
		`${base.dev}/blog/update-dev-article`,
		params
	);
	return (response && response.data) || {};
};

const updateEssayArticle = async (params) => {
	const response = await http.post(
		`${base.dev}/blog/update-essay-article`,
		params
	);
	return (response && response.data) || {};
};

const getDevArticleDetail = async (params) => {
	const response = await http.get(`${base.dev}/blog/dev-article-detail`, {
		params: params
	});
	return (response && response.data) || {};
};

const getEssayArticleDetail = async (params) => {
	const response = await http.get(`${base.dev}/blog/essay-article-detail`, {
		params: params
	});
	return (response && response.data) || {};
};

const saveDevComment = async (params) => {
	const response = await http.post(`${base.dev}/blog/save-dev-comment`, params);
	return (response && response.data) || {};
};

const saveEssayComment = async (params) => {
	const response = await http.post(
		`${base.dev}/blog/save-essay-comment`,
		params
	);
	return (response && response.data) || {};
};

const likeDevArticleApi = async (params) => {
	const response = await http.post(`${base.dev}/blog/like-dev-article`, params);
	return (response && response.data) || {};
};

const likeEssayArticleApi = async (params) => {
	const response = await http.post(
		`${base.dev}/blog/like-essay-article`,
		params
	);
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
	getDevArticleList,
	getEssayArticleList,
	newDevArticle,
	newEssayArticle,
	updateDevArticle,
	updateEssayArticle,
	getDevArticleDetail,
	getEssayArticleDetail,
	userRegister,
	usernameUseable,
	userLogin,
	userLogout,
	checkLogin,
	saveDevComment,
	saveEssayComment,
	likeDevArticleApi,
	likeEssayArticleApi
};

export default apis;
