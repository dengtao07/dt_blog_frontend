import store from '../store/index';
import { Message } from 'element-ui';

const debounce = function(fn, threshold = 100) {
	let timeout = null;
	return function() {
		clearTimeout(timeout);
		let context = this;
		let args = arguments;
		timeout = setTimeout(() => {
			fn.apply(context, args);
		}, threshold);
	};
};

const throttle = function(fn, threshold = 100) {
	let start = Date.now();
	let timer = null;
	return function() {
		clearTimeout(timer);
		let end = Date.now();
		let contex = this;
		let args = arguments;
		if (end - start >= threshold) {
			fn.apply(contex, args);
			start = end;
		} else {
			timer = setTimeout(() => {
				fn.apply(contex, args);
			}, threshold);
		}
	};
};

const backToTopBtnShowable = function() {
	if (
		window.document.body.scrollTop > 100 ||
		window.document.documentElement.scrollTop > 100
	) {
		store.commit('changeBackToTopShowable', { show: true });
	} else {
		store.commit('changeBackToTopShowable', { show: false });
	}
};

const formatedDate = () => {
	let dateFormat = 'yyyy-mm-dd HH:MM';
	let date = new Date();
	const opt = {
		'y+': date.getFullYear().toString(), // 年
		'm+': (date.getMonth() + 1).toString(), // 月
		'd+': date.getDate().toString(), // 日
		'H+': date.getHours().toString(), // 时
		'M+': date.getMinutes().toString(), // 分
		'S+': date.getSeconds().toString() // 秒
	};
	for (let key in opt) {
		var result = new RegExp(key).exec(dateFormat);
		if (result !== null) {
			dateFormat = dateFormat.replace(
				result[0],
				opt[key].padStart(result[0].length, '0')
			);
		}
	}
	return dateFormat;
};

const showMessage = function(message, type = '') {
	//四种，success，error，warning，不传的时候是普通信息
	if (!type) {
		Message({
			showClose: true,
			message: message
		});
		return;
	}
	Message({
		showClose: true,
		message: message,
		type: type
	});
};

//获取页面顶部被卷起来的高度
const getScrollTop = () => {
	return Math.max(document.body.scrollTop, document.documentElement.scrollTop);
};

//获取页面文档的总高度
const getDocumentHeight = () => {
	//现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
	return Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight
	);
};
//页面浏览器视口的高度
const getWindowHeight = () => {
	return document.compatMode === 'CSS1Compat'
		? document.documentElement.clientHeight
		: document.body.clientHeight;
};

export {
	debounce,
	throttle,
	backToTopBtnShowable,
	formatedDate,
	showMessage,
	getScrollTop,
	getDocumentHeight,
	getWindowHeight
};
