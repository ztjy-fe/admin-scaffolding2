<template>
    <div class="login-container">
        <h1 class="login-title">请登录</h1>
        <p class="login-info">开发环境专用，线上环境会跳转统一登录页</p>
        <el-form ref="loginform" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="form.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { USER_NAME, USER_TOKEN } from '@/maps/constants'
import Common from '@/utils/common'
import { UserApi } from '@/api/index'
export default {
	data () {
		return {
			form: {
				name: '',
				pwd: ''
			},
			rules: {
				name: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				pwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		onSubmit () {
			this.$refs['loginform'].validate((valid) => {
				if (valid) {
					UserApi.login({
						username: this.form.name,
						password: this.form.pwd
					}).then(response => {
						Common.setCookie(USER_NAME, response.name, { expires: 1000 * 60 * 60 * 24 * 2 })
						Common.setCookie(USER_TOKEN, response.token, { expires: 1000 * 60 * 60 * 24 * 2 })
						this.$store.commit('User/SET_TOKEN', response.token)
						this.$store.commit('User/SET_USER_NAME', response.name)
						this.$router.push('/dashboard/index')
					}).catch(error => {
						console.log('<ERROR>', error)
					})
				} else {
					return false
				}
			})
		}
	}
}
</script>

<style scoped lang="scss">
    .login-container {
        width: 360px;
        margin: 0 auto;
        padding: 30px 20px;
    }
    .login-title {
        text-align: center;
        font-size: 18px;
        margin-bottom: 15px;
    }
    .login-info {
        text-align: center;
        margin-bottom: 20px;
        color: #999999;
    }
</style>
