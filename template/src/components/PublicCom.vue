<template>
	<div class="component-container">
		\{{msg}}
	</div>
</template>
<script>
export default {
	name: 'PublicCom',
	data () {
		return {
			msg: '公共组件'
		}
	}
}
</script>
<style lang="scss" scoped>
.component-container {
	font-size: 30px;
}
</style>
