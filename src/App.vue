<template>
	<div id="app">
		<nav-bar></nav-bar>
		<div class="main">
			<router-view />
		</div>
		<back-to-top class="to-top-button"></back-to-top>
	</div>
</template>

<script>
import BackToTop from '@/components/BackToTop.vue';
import NavBar from '@/components/NavBar.vue';
import { mapMutations } from 'vuex';
export default {
	components: {
		BackToTop,
		NavBar
	},
	methods: {
		...mapMutations(['saveUserProfile'])
	},
	async created() {
		let response = await this.$apis.checkLogin();
		if (response && response.data && response.data.login) {
			this.saveUserProfile({
				role: response.data.profile.role,
				isLogined: response.data.login,
				username: response.data.profile.username
			});
		}
	}
};
</script>

<style lang="scss">
#app {
	width: 100%;
	.main {
		width: 90%;
		margin: 60px auto;
		padding-top: 30px;
		display: flex;
		justify-content: center;
	}
	.to-top-button {
		position: fixed;
		bottom: 30px;
		right: 30px;
		z-index: 3000;
	}
}
</style>
