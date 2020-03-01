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

const throttle = function(fn, threshold = 200) {
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
		this.$store.commit('changeBackToTopShowable', { show: true });
	} else {
		this.$store.commit('changeBackToTopShowable', { show: false });
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
		this.$message({
			showClose: true,
			message: message
		});
		return;
	}
	this.$message({
		showClose: true,
		message: message,
		type: type
	});
};

export { debounce, throttle, backToTopBtnShowable, formatedDate, showMessage };
