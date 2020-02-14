<template>
	<div class="article-container">
		<div
			v-for="article of articleList"
			:key="article.id"
			class="article-card"
			@click="handleClick"
		>
			<div>{{ article.title }}</div>
			<div>{{ article.abstract }}</div>
			<div>{{ article.time }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ArticleList',
	props: {
		articleList: Array
	},
	methods: {
		handleClick() {
			this.$router.push('article');
		}
	}
};
</script>

<style scoped lang="scss">
.article-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 50px;
	.article-card {
		width: 70%;
		height: 100px;
		border: 1px solid black;
		margin-bottom: 10px;
		padding: 20px;
	}
}
</style>
