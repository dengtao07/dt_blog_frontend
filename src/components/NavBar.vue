<template>
	<div class="nav-bar">
		<ul class="nav-menu">
			<li
				v-for="(item, index) of menuList"
				:key="index"
				:class="{ 'nav-menu-active': isMenuActive(item.type) }"
				@click="$router.push(`/${item.url}`)"
			>
				{{ item.name }}
			</li>
		</ul>
		<div class="nav-login">
			<div v-if="!this.isLogined" class="login-btn">
				<span @click="handleLogin">登录</span>
				<span @click="handleRegister">注册</span>
			</div>
			<el-dropdown v-else trigger="click">
				<span class="user-profile">
					<img src="../assets/images/logined-logo.svg" class="user-avatar" />
					{{ this.username }}
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu>
					<el-dropdown-item @click.native="logout">登出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<el-dialog
			:visible.sync="centerDialogVisible"
			:append-to-body="true"
			:modal-append-to-body="true"
			:lock-scroll="false"
			width="30%"
			:destroy-on-close="true"
			center
		>
			<register-login-form
				:login-or-register="loginOrRegister"
				@closeDialog="handleCloseDialog"
			></register-login-form>
		</el-dialog>
	</div>
</template>

<script>
import { debounce, showMessage } from '../utils/utils.js';
import RegisterLoginForm from './RegisterLoginForm';
import { mapState, mapMutations } from 'vuex';
export default {
	name: 'NavBar',
	components: {
		RegisterLoginForm
	},
	data() {
		return {
			centerDialogVisible: false,
			loginOrRegister: '',
			menuList: [
				{ name: '开发', url: '', type: 'blog' },
				{ name: '瞎写', url: 'essay', type: 'essay' },
				{ name: '瞎拍', url: 'photo', type: 'photo' }
			]
		};
	},
	computed: {
		...mapState(['role', 'isLogined', 'username'])
	},
	methods: {
		...mapMutations(['saveUserProfile']),
		handleLogin() {
			this.loginOrRegister = '0';
			this.centerDialogVisible = true;
		},
		handleRegister() {
			this.loginOrRegister = '1';
			this.centerDialogVisible = true;
		},
		handleCloseDialog() {
			this.centerDialogVisible = false;
		},
		async logout() {
			let response = await this.$apis.userLogout();
			if (response.data && !response.data.login) {
				this.saveUserProfile({
					role: '1',
					username: '',
					isLogined: false
				});
				showMessage.call(this, '登出成功', 'success');
			}
		},
		isMenuActive(type) {
			const curPath = this.$route.path;
			let inRootPage = type === 'blog' && curPath === '/';
			return curPath.indexOf(type) > 0 || inRootPage;
		}
	}
};
</script>

<style scoped lang="scss">
.nav-bar {
	height: 60px;
	width: 100%;
	box-shadow: 0 2px 12px hsla(0, 0%, 69.4%, 0.2);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1501;
	background-color: #eee;
	display: flex;
	justify-content: space-between;
	&:hover {
		box-shadow: 0 2px 12px hsla(0, 0%, 69.4%, 0.4);
	}
	.nav-menu {
		height: 100%;
		flex-basis: 30%;
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		align-items: center;
		padding: 0 30px;
		li {
			flex-basis: 100px;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #999;
			cursor: pointer;
			&:hover:not(.nav-menu-active) {
				color: #666;
			}
		}
		.nav-menu-active {
			transition: all 0.25s ease-in-out;
			background-color: #51defe;
			background-image: linear-gradient(126deg, #51defe 0%, #1170f5 79%);
			color: #ffffff;
		}
	}
	.nav-login {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 30px;
		.login-btn {
			color: #999;
			font-size: 14px;
			cursor: pointer;
			span:first-child {
				margin-right: 10px;
			}
			span:hover {
				color: #666;
			}
		}
		.user-profile {
			display: flex;
			align-items: center;
			cursor: pointer;
			.user-avatar {
				width: 25px;
				margin-right: 10px;
			}
			i {
				margin-top: 4px;
			}
		}
	}
}
::v-deep {
	.el-dialog--center {
		width: 400px !important;
	}
}
</style>
