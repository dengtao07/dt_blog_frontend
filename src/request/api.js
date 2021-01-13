import http from './http.js';
import base from './config.js';

let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
	baseUrl = base.dev;
} else if (process.env.NODE_ENV === 'production') {
	baseUrl = base.prd;
}

//博文相关接口
const getDevArticleList = async (params) => {
	const response = await http.get(`${baseUrl}/blog/dev-article-list`, {
		params: params,
	});
	return (response && response.data) || {};
};

const getEssayArticleList = async (params) => {
	const response = await http.get(`${baseUrl}/blog/essay-article-list`, {
		params: params,
	});
	return (response && response.data) || {};
};

const newDevArticle = async (params) => {
	const response = await http.post(`${baseUrl}/blog/new-dev-article`, params);
	return (response && response.data) || {};
};

const newEssayArticle = async (params) => {
	const response = await http.post(`${baseUrl}/blog/new-essay-article`, params);
	return (response && response.data) || {};
};

const updateDevArticle = async (params) => {
	const response = await http.post(
		`${baseUrl}/blog/update-dev-article`,
		params
	);
	return (response && response.data) || {};
};

const updateEssayArticle = async (params) => {
	const response = await http.post(
		`${baseUrl}/blog/update-essay-article`,
		params
	);
	return (response && response.data) || {};
};

const getDevArticleDetail = async (params) => {
	const response = await http.get(`${baseUrl}/blog/dev-article-detail`, {
		params: params,
	});
	return (response && response.data) || {};
};

const getEssayArticleDetail = async (params) => {
	const response = await http.get(`${baseUrl}/blog/essay-article-detail`, {
		params: params,
	});
	return (response && response.data) || {};
};

const saveDevComment = async (params) => {
	const response = await http.post(`${baseUrl}/blog/save-dev-comment`, params);
	return (response && response.data) || {};
};

const saveEssayComment = async (params) => {
	const response = await http.post(
		`${baseUrl}/blog/save-essay-comment`,
		params
	);
	return (response && response.data) || {};
};

const deleteDevComment = async (params) => {
	const response = await http.post(
		`${baseUrl}/blog/delete-dev-comment`,
		params
	);
	return (response && response.data) || {};
};

const deleteEssayComment = async (params) => {
	const response = await http.post(
		`${baseUrl}/blog/delete-essay-comment`,
		params
	);
	return (response && response.data) || {};
};

const likeDevArticleApi = async (params) => {
	const response = await http.post(`${baseUrl}/blog/like-dev-article`, params);
	return (response && response.data) || {};
};

const likeEssayArticleApi = async (params) => {
	const response = await http.post(
		`${baseUrl}/blog/like-essay-article`,
		params
	);
	return (response && response.data) || {};
};

const checkDevUserLikeStatus = async (params) => {
	const response = await http.post(`${baseUrl}/blog/check-dev-like`, params);
	return (response && response.data) || {};
};

const checkEssayUserLikeStatus = async (params) => {
	const response = await http.post(`${baseUrl}/blog/check-essay-like`, params);
	return (response && response.data) || {};
};

//用户相关接口
const userRegister = async (params) => {
	const response = await http.post(`${baseUrl}/user/register`, params);
	return (response && response.data) || {};
};

const usernameUseable = async (params) => {
	const response = await http.post(`${baseUrl}/user/username-useable`, params);
	return (response && response.data) || {};
};

const userLogin = async (params) => {
	const response = await http.post(`${baseUrl}/user/login`, params);
	return (response && response.data) || {};
};

const userLogout = async (params) => {
	const response = await http.post(`${baseUrl}/user/logout`, params);
	return (response && response.data) || {};
};

const checkLogin = async () => {
	const response = await http.get(`${baseUrl}/user/check-login`);
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
	likeEssayArticleApi,
	checkDevUserLikeStatus,
	checkEssayUserLikeStatus,
	deleteDevComment,
	deleteEssayComment,
};

export default apis;
