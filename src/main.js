import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apis from '@/request/api';
import ElementUI from 'element-ui';
import VueQuillEditor from 'vue-quill-editor';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/reset.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(VueQuillEditor);
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$apis = apis;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
