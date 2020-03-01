<template>
	<div class="article">
		<div class="article-wrapper">
			<h1 class="article-header">{{ articleInfo.title }}</h1>
			<div class="article-meta">
				<el-tag
					v-for="(tag, index) of articleInfo.tags"
					type="success"
					:key="index"
					>{{ tag }}</el-tag
				>
				<span class="article-updatetime"
					>更新于{{ articleInfo.createTime }}</span
				>
				<router-link :to="`/article-edit/${articleId}`" v-if="role === '0'"
					>编辑
				</router-link>
				<router-link to="/article-edit/new" v-if="role === '0'"
					>新建文章
				</router-link>
			</div>
			<div
				v-html="articleInfo.contentHtml"
				class="article-container"
				ref="content"
			></div>
		</div>
		<catalog
			:catalogList="catalogList"
			:firstVisibleElemetHref="firstVisibleElemetHref"
			class="article-catalog"
		></catalog>
	</div>
</template>

<script>
import Catalog from './components/Catalog';
import { debounce, throttle, backToTopBtnShowable } from '@/utils/utils.js';
import { mapMutations, mapState } from 'vuex';
export default {
	name: 'ArticleDetail',
	data() {
		return {
			articleInfo: {},
			catalogList: [],
			firstVisibleElemetHref: '',
			articleId: 1
		};
	},
	components: {
		Catalog
	},
	methods: {
		handleClick() {
			console.log(this.$store.state.encodeedHtml);
		},
		watchPageScroll() {
			let contentElementRef = Array.from(
				this.$refs.content.querySelectorAll('h1,h2,h3,h4,h5,h6')
			);
			for (let index = 0; index < contentElementRef.length; index++) {
				const viewPortHeight =
					window.innerHeight ||
					document.documentElement.clientHeight ||
					document.body.clientHeight;
				const offsetTop = contentElementRef[index].offsetTop;
				const elementHeight = contentElementRef[index].clientHeight;
				const scrollTop = document.documentElement.scrollTop;
				const top = offsetTop - scrollTop + elementHeight;
				if (top <= viewPortHeight && top > 0) {
					this.firstVisibleElemetHref = this.catalogList[index].href;
					break;
				}
			}
			backToTopBtnShowable.call(this);
		},
		extractCatalog() {
			let contentElementRef = Array.from(
				this.$refs.content.querySelectorAll('h1,h2,h3,h4,h5,h6')
			);
			contentElementRef.forEach((item, index) => {
				item.id = item.localName + '-' + index;
				this.catalogList.push({
					tagName: item.localName,
					href: `#${item.localName}-${index}`,
					text: item.innerText
				});
			});
			if (this.catalogList.length > 0) {
				this.firstVisibleElemetHref = this.catalogList[0].href;
			}
			window.onscroll = debounce(this.watchPageScroll, 100);
		}
	},
	computed: {
		...mapState(['role'])
	},
	beforeRouteUpdate(to, from, next) {
		//不同参数之间跳转时，刷新页面
		//例如/article-detail/1跳转到/article-detail/2
		next();
	},
	async created() {
		this.articleId = +this.$route.params.id;
		let response = await this.$apis.getArticleDetail({
			articleId: this.articleId
		});
		let {
			title,
			tags,
			author,
			createTime,
			contentHtml,
			contentMd
		} = response.data.article;
		this.articleInfo = {
			title,
			tags: tags.split(','),
			author,
			createTime,
			contentHtml: decodeURI(contentHtml),
			contentMd: decodeURI(contentMd)
		};
		this.$nextTick(() => {
			this.extractCatalog();
		});
	},
	beforeDestroy() {
		window.onscroll = debounce(backToTopBtnShowable.bind(this));
	}
};
</script>

<style scoped lang="scss">
.article {
	width: 70%;
	.article-wrapper {
		width: 85%;
		.el-tag {
			margin-right: 10px;
		}
		.button-new-tag {
			margin-left: 10px;
			height: 32px;
			line-height: 30px;
			padding-top: 0;
			padding-bottom: 0;
		}
		.input-new-tag {
			width: 90px;
			margin-left: 10px;
			vertical-align: bottom;
		}
		.article-meta {
			.article-updatetime {
				font-size: 14px;
				color: #999;
			}
			a {
				font-size: 14px;
				&:first-of-type {
					margin-left: 10px;
				}
			}
		}
	}
	.article-catalog {
		position: fixed;
		right: 6%;
		bottom: 20%;
		z-index: 20000;
		font-size: 14px;
		max-width: 250px;
		max-height: 320px;
		overflow-y: auto;
		::v-deep {
			li {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>
