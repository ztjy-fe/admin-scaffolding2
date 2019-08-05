<template>
	<div class="scroll-container">
		<div class="scroll-wrapper">
			<div class="sidebar-info" :class="{'closed': !sidebar.opened}">
				<div class="sidebar-info-name" v-show="sidebar.opened">
					<p>\{{ userName }}</p>
					<p>高级运营</p>
				</div>
			</div>
			<el-menu mode="vertical" unique-opened :default-active="$route.path" background-color="#eef1f6" text-color="#48576a" active-text-color="#20a0ff" :collapse="!sidebar.opened">
				<sidebar-item :routes="routes"></sidebar-item>
			</el-menu>
		</div>
	</div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'

export default {
	data () {
		return {}
	},
	components: {
		SidebarItem
	},
	computed: {
		routes () {
			return this.$router.options.routes
		},
		...mapGetters({
			sidebar: 'SideBar/getSidebar',
			userName: 'User/getUserName'

		})
	},
	mounted () {
		console.log(this.routes)
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: #eff2f7;
	.scroll-wrapper {
		position: absolute;
		width: 100%!important;
	}
	.sidebar-info{
		height: 60px;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: solid 1px #ebebeb;
		border-right: solid 1px #ebebeb;
		overflow: hidden;
		.user-avator{
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 40px;
			margin-left: 20px;
			overflow: hidden;
			img{
				width: 100%;
			}
		}
		.sidebar-info-name{
			font-size: 12px;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			p{
				white-space: nowrap;
				color: #333;
				&:nth-child(2){
					color: #999999;
				}
			}
		}
		&.closed{
			.sidebar-info-name{
				display: none;
			}
			.user-avator{
				width: 30px;
				height: 30px;
				border-radius: 30px;
				margin-left: 3px;
			}
		}
	}
}
</style>
