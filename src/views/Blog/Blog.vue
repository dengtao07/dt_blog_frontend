<template>
	<div class="article-wrapper">
		<div class="loading-tip" v-loading="loading" v-if="loading"></div>
		<transition name="fade">
			<ul class="article-list" v-if="articleList.length > 0 && !loading">
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
										>{{ tag }}
									</el-tag>
								</span>
							</h2>
							<p class="article-abstract">{{ article.abstract }}</p>
							<p class="article-time">{{ article.createTime }}</p>
						</div>
					</router-link>
				</li>
			</ul>
		</transition>
		<div v-if="articleList.length === 0 && !loading"></div>
	</div>
</template>

<script>
export default {
	name: 'Blog',
	data() {
		return {
			articleList: [],
			loading: true
		};
	},
	methods: {
		async getHomeArticleList() {
			const response = await this.$apis.getHomeArticleList();
			this.loading = false;
			if (response.code === '1') {
				this.articleList = response.data.articleList;
			} else {
				this.articleList = [];
			}
		},
		handleClick() {
			this.$router.push('/articlemd');
		},
		articleTags(article) {
			return article.tags.split(',').slice(0, 3);
		}
	},
	created() {
		this.getHomeArticleList();
	}
};
</script>

<style scoped lang="scss">
.article-wrapper {
	width: 60%;
	.loading-tip {
		margin-top: 100px;
	}
	.fade-enter-active {
		transition: all 1s;
	}
	.fade-enter {
		opacity: 0;
	}
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
}
</style>
