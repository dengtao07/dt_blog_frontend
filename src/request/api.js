import http from './http';

const testRequest = () => {
	return http.get(
		`https://www.fastmock.site/mock/6fd0b315e0eaf7a074ab82935eb55e02/test/test1`
	);
};

const getHomeArticleList = () => {
	return http.get(
		'https://www.fastmock.site/mock/6fd0b315e0eaf7a074ab82935eb55e02/test/article'
	);
};
const apis = {
	testRequest,
	getHomeArticleList
};

export default apis;
