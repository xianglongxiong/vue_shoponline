<!--
 * @Author: your name
 * @Date: 2021-07-16 11:58:26
 * @LastEditTime: 2021-07-19 00:16:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_shoponline\src\components\Login.vue
-->
<template>
<div class="login">
    <div class="login_box">
      <el-form ref="loginFormRef" :rules="rules" :model="loginForm" label-width="60px" class="form">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" show-password prefix-icon="iconfont icon-3702mima"></el-input>
          </el-form-item>
          <el-form-item class="Btn">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
       </el-form>
    </div>
</div>

</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm: function () {
      this.$refs.loginFormRef.resetFields()
    },
    login: function () {
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return ''
        const { data: res } = await this.$http.post('/login', this.loginForm)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg); console.log(res.meta.msg)
        this.$message.success(res.meta.msg); console.log('sucess')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .login{
      height: 100%;
      background-color: rgb(17, 35, 68);
      .login_box{
        width: 450px;
        height: 300px;
        border-radius: 5px;
        background-color:#fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        padding-top: 110px;
      }
      .form{
        width: 80%;
      }
      .Btn{
            display: flex;
            justify-content: center;
      }
    }
</style>
