<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    \{{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)" v-show="tagsList.length > 1"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box"  v-show="tagsList.length > 1">
            <el-dropdown @command="handleTags">
                <el-button size="mini">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
	data () {
		return {
			tagsList: []
		}
	},
	methods: {
		isActive (path) {
			return this.$route.fullPath.includes(path.split('?')[0])
		},
		// 关闭单个标签
		closeTags (index) {
			const delItem = this.tagsList.splice(index, 1)[0]
			const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
			if (item) {
				delItem.path === this.$route.fullPath && this.$router.push(item.path)
			} else {
				this.$router.push('/')
			}
		},
		// 关闭全部标签
		closeAll () {
			this.tagsList = []
			this.$router.push('/')
			sessionStorage.setItem('tagList', JSON.stringify(this.tagsList))
		},
		// 关闭其他标签
		closeOther () {
			const curItem = this.tagsList.filter(item => {
				return item.path === this.$route.fullPath
			})
			this.tagsList = curItem
			sessionStorage.setItem('tagList', JSON.stringify(this.tagsList))
		},
		// 设置标签
		setTags (route) {
			const isExist = this.tagsList.some(item => {
				return route.fullPath.includes(item.path.split('?')[0])
			})
			if (!isExist) {
				if (this.tagsList.length >= 8) {
					this.tagsList.shift()
				}
				this.tagsList.push({
					title: route.meta.title,
					path: route.fullPath,
					name: route.matched[1].components.default.name
				})
				sessionStorage.setItem('tagList', JSON.stringify(this.tagsList))
			}
		},
		handleTags (command) {
			command === 'other' ? this.closeOther() : this.closeAll()
		}
	},
	computed: {
		showTags () {
			return true // 标签栏始终显示，隐藏了会有点不协调
		}
	},
	watch: {
		$route (newValue, oldValue) {
			this.setTags(newValue)
		}
	},
	created () {
		let tagList = JSON.parse(sessionStorage.getItem('tagList'))
		if (tagList === null) {
			tagList = []
		}
		if (tagList.length === 0) {
			tagList.push({
				path: '/dashboard/index',
				title: '首页'
			})
		}
		this.tagsList = tagList
		this.setTags(this.$route)
	}
}

</script>

<style>
    .tags {
        position: relative;
        height: 60px;
        overflow: hidden;
        background: #fff;
		box-sizing: border-box;
		border-bottom: solid 1px #ebebeb;
		box-shadow: 0 1px 8px rgba(0, 0, 0, .1);
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 20px;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 35px;
        line-height: 35px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
		color: #5a8cff;
		border-color: #5a8cff;
		background-color: #ffffff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #5a8cff;
    }

    .tags-close-box {
		padding-right: 20px;
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
		z-index: 10;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
    }

</style>
