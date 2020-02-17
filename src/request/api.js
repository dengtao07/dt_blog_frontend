import http from './http';

const testRequest = () => {
	return http.get(
		`https://www.fastmock.site/mock/6fd0b315e0eaf7a074ab82935eb55e02/test/test1`
	);
};

const getHomeArticleList = () => {
	return http.get('http://rap2api.taobao.org/app/mock/244591/article');
};

const getMarkdownSource = () => {
	return http.get('http://rap2api.taobao.org/app/mock/244591/html');
};

const apis = {
	testRequest,
	getHomeArticleList,
	getMarkdownSource
};

export default apis;
