<template>
	<div class="app-wrapper" :class="{'hide-sidebar':!sidebar.opened}">
		<div class="app-header" :class="{'shrink-padding':!sidebar.opened}">
			<div class="app-header-left" :class="{'shrink-width':!sidebar.opened}">
				<img class="user-avatar" src="../../assets/images/avatar_default_text.png" v-show="sidebar.opened">
				<img class="hamburger" src="../../assets/images/layout/hamburger.svg" :class="{'is-active':sidebar.opened}" @click="toggleClick">
			</div>
			<div class="app-header-right">
				<span class="main-title">掌通家园管理系统模板</span>
				<a class="btn-logout" @click="logoutHandler">退出</a>
			</div>
		</div>
		<div class="app-content">
			<sidebar class="sidebar-container"></sidebar>
			<div class="main-container">
				<navbar class="main-tags"></navbar>
				<app-main></app-main>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from '@/views/layout/components/Navbar.vue'
import Sidebar from '@/views/layout/components/Sidebar/index.vue'
import AppMain from '@/views/layout/components/AppMain.vue'
import { SYSTEM } from '@/api/modules/userApi'

export default {
	name: 'layout',
	components: {
		Navbar,
		Sidebar,
		AppMain
	},
	computed: {
		...mapGetters({
			sidebar: 'SideBar/getSidebar',
			userName: 'User/getUserName'
		})
	},
	methods: {
		...mapActions({
			logout: 'User/logout',
			toggleSideBar: 'SideBar/toggleSideBar'
		}),
		logoutHandler () {
			this.logout().then(() => {
				window.location.href = SYSTEM.USER.LOGINJUMP
			})
		},
		toggleClick () {
			this.toggleSideBar()
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
	position: relative;
	height: 100%;
	width: 100%;
	&:after {
		content: "";
		display: table;
		clear: both;
	}
	.app-header{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		font-size: 24px;
		text-align: left;
		color: #fff;
		background: #324057;
		height: 60px;
		line-height: 60px;
		z-index: 99;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.btn-logout{
			display: block;
			height: 60px;
			line-height: 60px;
			width: 80px;
			text-align: center;
			font-size: 14px;
			&:hover{
				background: #6b96ff;
			}
		}
	}
}
.hamburger.is-active {
	transform: rotate(0deg) !important;
}
.shrink-width{
	width: 36px !important;
	padding: 0 2px !important;
}
.shrink-padding{
	padding-left: 40px !important;
}
</style>
