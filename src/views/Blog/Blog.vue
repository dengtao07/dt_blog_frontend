<template>
	<div class="article-wrapper">
		<div class="loading-tip" v-loading="loading" v-if="loading"></div>
		<transition name="fade">
			<ul class="article-list">
				<li
					v-for="article of articleList"
					:key="article.id"
					class="article-item"
				>
					<router-link :to="`/blog/${article.id}`" class="article-content">
						<div>
							<h2 class="article-header">
								{{ article.title }}
								<span class="article-tag">
									<el-tag
										v-for="(tag, index) of articleTags(article)"
										type="success"
										:key="index"
										>{{ tag }}</el-tag
									>
								</span>
							</h2>
							<p class="article-abstract">{{ article.abstract }}</p>
							<p class="article-time">{{ article.createTime }}</p>
						</div>
					</router-link>
				</li>
			</ul>
		</transition>
		<div
			class="loading-more-tip"
			v-loading="loadingMore"
			v-if="loadingMore"
		></div>
		<div class="nomore-tip" v-if="nomoreTipShowable">---到底咯---</div>
		<div class="nodata-tip" v-if="articleList.length === 0 && !loading">
			---暂无数据---
		</div>
	</div>
</template>

<script>
import {
	debounce,
	backToTopBtnShowable,
	getScrollTop,
	getDocumentHeight,
	getWindowHeight
} from '../../utils/utils';
export default {
	name: 'Blog',
	data() {
		return {
			articleList: [],
			loading: true,
			pageIndex: 1,
			nomore: false,
			nomoreTipShowable: false,
			loadingMore: false,
			pageScrollDistance: 0,
			scrollToGetNewArticle: debounce(this.scrollToGetNewArticleFunc)
		};
	},
	computed: {},
	methods: {
		async getHomeArticleList(pageIndex) {
			const response = await this.$apis.getHomeArticleList({
				pageIndex: pageIndex
			});
			this.loading = false;
			this.loadingMore = false;
			if (response.code === '1') {
				this.articleList = this.articleList.concat(response.data.articleList);
				this.nomore = response.data.nomore;
				this.nomoreTipShowable = response.data.nomore;
			} else {
				this.articleList = [];
			}
		},
		loadMoreArticle() {
			this.getHomeArticleList(++this.pageIndex);
		},
		articleTags(article) {
			return article.tags.split(',').slice(0, 3);
		},
		scrollToGetNewArticleFunc() {
			let needLoadMore =
				getScrollTop() + getWindowHeight() + 50 > getDocumentHeight();
			if (needLoadMore && !this.nomore) {
				this.loadingMore = true;
				//暂时不能再滚动加载数据
				this.nomore = true;
				this.loadMoreArticle();
			}
			this.pageScrollDistance = getScrollTop();
		}
	},
	created() {
		this.getHomeArticleList(this.pageIndex);
	},
	activated() {
		document.documentElement.scrollTop = this.pageScrollDistance;
		document.body.scrollTop = this.pageScrollDistance;
		window.addEventListener('scroll', this.scrollToGetNewArticle);
	},
	deactivated() {
		window.removeEventListener('scroll', this.scrollToGetNewArticle);
	}
};
</script>

<style scoped lang="scss">
.article-wrapper {
	width: 60%;
	.article-list {
		padding: 0;
		list-style: none;
		.article-item {
			display: flex;
			justify-content: center;
			margin-bottom: 20px;
			box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.06);
			&:hover {
				box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.12);
			}
			.article-content {
				display: block;
				width: 90%;
				padding: 20px;
				.article-header {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: black;
					font-weight: 500;
					display: flex;
					justify-content: space-between;
					.article-tag {
						span:not(:last-child) {
							margin-right: 10px;
						}
					}
				}
				.article-abstract {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
					color: #666;
					line-height: 26px;
				}
				.article-time {
					color: #999;
				}
			}
		}
	}
	.loading-more-tip {
		margin-top: 40px;
	}
	.nomore-tip {
		text-align: center;
		color: #666;
		font-size: 15px;
	}
	.nodata-tip {
		text-align: center;
		color: #666;
		font-size: 15px;
	}
}
.fade-enter-active {
	transition: all 1s;
}
.fade-enter {
	opacity: 0;
}
</style>
