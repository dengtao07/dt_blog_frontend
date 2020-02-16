import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		encodeedHtml: '111'
	},
	mutations: {
		saveEcodeedHtml(state, encodeedHtml) {
			state.encodeedHtml = encodeedHtml;
		}
	},
	actions: {},
	modules: {}
});
