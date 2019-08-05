<template>
	<div class="menu-wrapper">
		<!-- 目录 -->
		<template v-for="item in routes">
			<template v-if="!item.hidden && item.children">
				<router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children && !item.alwaysShow" :to="item.path + '/' + item.children[0].path" :key="item.children[0].name">
					<el-menu-item :index="item.path + '/' + item.children[0].path" :class="{'submenu-title-no-ropdown':!isNest}">
						<i v-if="item.icon" :class="item.icon"></i>
						<span class="text" v-if="item.children[0].meta && item.children[0].meta.title">\{{item.children[0].meta.title}}</span>
					</el-menu-item>
				</router-link>

				<el-submenu v-else :index="item.name || item.path" :key="item.name">
					<template slot="title">
						<i v-if="item.icon" :class="item.icon"></i>
						<span v-if="item.meta && item.meta.title" class="text">\{{item.meta.title}}</span>
					</template>
					<template v-for="child in item.children">
						<template  v-if="!child.hidden">
							<sidebar-item class="nest-menu" v-if="child.children && child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
							<router-link v-else :to="item.path + '/' + child.path" :key="child.name">
								<el-menu-item :index="item.path + '/' + child.path">
									<i v-if="child.meta && child.meta.icon" :class="child.meta.icon"></i>
									<span v-if="child.meta && child.meta.title">\{{child.meta.title}}</span>
								</el-menu-item>
							</router-link>
						</template>
					</template>
				</el-submenu>
			</template>
			<!-- 菜单 -->
			<template v-else>
				<router-link :to="item.path" :key="item.name" v-if="!item.hidden">
					<el-menu-item :index="item.path" :class="{'submenu-title-no-ropdown':!isNest}">
						<i v-if="item.icon" :class="item.icon"></i>
						<span class="text" v-if="item.meta && item.meta.title">\{{item.meta.title}}</span>
					</el-menu-item>
				</router-link>
			</template>
		</template>
	</div>
</template>

<script>
export default {
	name: 'SidebarItem',
	props: {
		routes: {
			type: Array
		},
		isNest: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		hasOneShowingChildren (children) {
			const showingChildren = children.filter(item => {
				return !item.hidden
			})
			if (showingChildren.length === 1) {
				return true
			}
			return false
		}
	}
}
</script>

<style lang="scss" scoped>
.hide-sidebar .menu-indent{
	display: block;
	text-indent: 10px;
}
.text{
	margin-left: 18px;
}
.el-menu-item{
	text-align: center;
}
</style>
