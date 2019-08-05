<template>
	<div class="dashboard-container">
		<div class="dashboard-text">掌通家园管理系统模板</div>
		<div class="dashboard-text">\{{ '当前用户：' + username }}</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'dashboard',
	computed: {
		...mapGetters({
			username: 'User/getUserName'
		})
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
	&-text {
		text-align: left;
		font-size: 14px;
		line-height: 32px;
		color: #333333;
	}
}
</style>
