import http from './http.js';
import base from './config.js';

const testRequest = () => {
	return http.get(
		`https://www.fastmock.site/mock/6fd0b315e0eaf7a074ab82935eb55e02/test/test1`
	);
};

const getHomeArticleList = async () => {
	const response = await http.get(`${base.dev}/article-list`);
	return (response && response.data) || {};
};

const saveArticle = async (params) => {
	const response = await http.post(`${base.dev}/save-article`, params);
	return (response && response.data) || {};
};

const getArticleDetail = async (params) => {
	const response = await http.get(`${base.dev}/article-detail`, {
		params: params
	});
	return (response && response.data) || {};
};

const getMarkdownSource = () => {
	return http.get('http://rap2api.taobao.org/app/mock/244591/html');
};

const apis = {
	testRequest,
	getHomeArticleList,
	getMarkdownSource,
	saveArticle,
	getArticleDetail
};

export default apis;
