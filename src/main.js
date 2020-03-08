import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apis from '@/request/api';
import {
	Button,
	Tag,
	Input,
	Icon,
	Form,
	Dialog,
	Dropdown,
	DropdownMenu,
	FormItem,
	DropdownItem,
	Loading,
	Popover
} from 'element-ui';
import VueQuillEditor from 'vue-quill-editor';
import mavonEditor from 'mavon-editor';
import animated from 'animate.css';
import 'mavon-editor/dist/css/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/hljs.scss';
import './assets/styles/reset.scss';
import './assets/styles/globalStyle.scss';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(Button);
Vue.use(Tag);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Form);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(FormItem);
Vue.use(Loading);
Vue.use(DropdownItem);
Vue.use(Popover);
Vue.use(VueQuillEditor);
Vue.use(mavonEditor);
Vue.use(animated);

Vue.config.productionTip = false;
Vue.prototype.$apis = apis;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
