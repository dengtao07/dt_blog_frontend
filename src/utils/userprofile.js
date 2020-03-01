const storage = window.sessionStorage;

const setItem = (key, val) => {
	storage.setItem(key, val);
};

const getItem = (key, val) => {
	storage.setItem(key, val);
};

const removeItem = (key) => {
	storage.removeItem(key);
};

export { setItem, getItem, removeItem };
