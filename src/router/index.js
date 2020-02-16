import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/Home.vue';
import MarkDownEditor from '../components/Editor/MarkDownEditor.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/articlemd',
		name: 'Articlemd',
		component: MarkDownEditor
	},
	{
		path: '/article-detail/:id',
		name: 'ArticleDetail',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '../views/ArticleDetail/ArticleDetail.vue'
			)
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
