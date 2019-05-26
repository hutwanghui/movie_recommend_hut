<template>
  <section>
    <el-row style="padding-top: 100px">
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
                   @keyup.enter.native="dataFormSubmit()"
                   status-icon>
            <h3 class="login-title">登录</h3>
            <el-form-item prop="username">
              <el-input v-model="dataForm.username" placeholder="帐号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="dataForm.password"  type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录
              </el-button>
              <el-button class="login-btn-submit" type="primary" @click="register()">注册
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import API from '../api'
  import {getUUID} from '../utils'

  export default {
    data() {
      return {
        dataForm: {
          username: '',
          password: '',
          uuid: ''
        },
        dataRule: {
          username: [
            {required: true, message: '帐号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        },
        captchaPath: ''
      }
    },
    created() {

    },
    methods: {
      // 提交表单
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var params = {
              'username': this.dataForm.username,
              'password': this.dataForm.password
            }
            API.movie.login_simple(params).then(({data}) => {
              if (data && data.code === 0) {
                console.debug(data);
                localStorage.setItem('user_id', this.dataForm.username)
                localStorage.setItem('session_id', this.dataForm.username);
                this.$root.eventHub.$emit('setUserStatus')
                this.userLoggedIn = true
                // TODO 如果用户是新注册的，也就是冷启动，那么给与一个帮助用户了解自己喜好的页面
                this.$router.replace({name: 'profile'})
              } else {
                console.debug(data);
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      register() {
        this.$router.push({ name: 'register' })
      }
    },
    name: 'login_simple'
  }
</script>

<style lang="scss">
  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(38, 50, 56, .6);
    overflow: hidden;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-size: cover;
    }
    .site-content__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .site-content {
      min-height: 100%;
      padding: 30px 500px 30px 30px;
    }
    .brand-info {
      margin: 220px 100px 0 90px;
      color: #fff;
    }
    .brand-info__text {
      margin: 0 0 22px 0;
      font-size: 48px;
      font-weight: 400;
      text-transform: uppercase;
    }
    .brand-info__intro {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: .6;
    }
    .login-main {
      position: absolute;
      top: 0;
      right: 0;
      padding: 150px 60px 180px;
      margin: 0 auto;
      width: 200px;
      min-height: 100%;
      background-color: #fff;
    }
    .login-title {
      font-size: 16px;
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 100%;
      margin-top: 38px;
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
