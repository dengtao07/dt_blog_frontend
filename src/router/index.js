import Vue from 'vue';
import VueRouter from 'vue-router';
import Blog from '../views/Blog/Blog.vue';
import vuex from '../store/index';

Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch((error) => error);
};
const state = vuex.state;

const editPermission = (next) => {
	if (state.username === 'admin' && state.role === '0') {
		next();
	} else {
		next('/');
	}
};

const routes = [
	{
		path: '/',
		name: 'Blog',
		component: Blog
	},
	{
		path: '/essay',
		name: 'Essay',
		component: () => import('../views/Essay/Essay.vue')
	},
	{
		path: '/essay/:id',
		name: 'EssayBlog',
		component: () => import('../views/DevBlogDetail/DevBlogDetail.vue')
	},
	{
		path: '/photo',
		name: 'Photo',
		component: () => import('../views/Photo/Photo.vue')
	},
	{
		path: '/blog/:id',
		name: 'DevBlog',
		component: () => import('../views/DevBlogDetail/DevBlogDetail.vue')
	},
	{
		path: '/article-edit/:id',
		name: 'ArticleEdit',
		component: () => import('../views/ArticleEdit/MarkDownEditor.vue'),
		beforeEnter: (to, from, next) => {
			editPermission(next);
		}
	},
	{
		path: '/article-edit/new',
		name: 'newArticle',
		component: () => import('../views/ArticleEdit/MarkDownEditor.vue'),
		beforeEnter: (to, from, next) => {
			editPermission(next);
		}
	},
	{
		path: '*',
		name: '404',
		redirect: '/'
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
