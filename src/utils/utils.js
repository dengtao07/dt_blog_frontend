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

export { debounce, throttle };
