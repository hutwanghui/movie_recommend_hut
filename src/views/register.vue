<template>
  <section>
    <el-row style="padding-top: 100px">
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <h3 class="login-title">注册页面</h3>
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
                   @keyup.enter.native="dataFormSubmit()"
                   status-icon>
            <el-form-item prop="username">
              <el-input v-model="dataForm.username" placeholder="帐号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <el-input v-model="dataForm.repassword" type="password" placeholder="二次确认密码"></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
              <el-input v-model="dataForm.mobile" placeholder="手机号码"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">注册
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

  export default {
    data() {
      var repasswordAcquaintance = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.dataForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
          return callback(new Error('电话号码不能为空'))
        }
        setTimeout(() => {
          // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
          // 所以我就在前面加了一个+实现隐式转换
          if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error('电话号码格式不正确'));
            }
          }
        }, 100)
      };
      var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'));
          }
        }, 100)
      };
      return {
        dataForm: {
          username: '',
          password: '',
          repassword: '',
          mobile: '',
          email: ''
        },
        dataRule: {
          username: [
            {required: true, message: '帐号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          repassword: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {
              validator: repasswordAcquaintance, // 自定义验证
              trigger: 'blur'
            }
          ],
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {
              validator: checkEmail, // 自定义验证
              trigger: 'blur'
            }
          ],
          mobile: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {
              validator: checkPhone, // 自定义验证
              trigger: 'blur'
            }
          ],
        },
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
              "username": this.dataForm.username,
              "password": this.dataForm.password,
              "mobile": this.dataForm.mobile,
              "email": this.dataForm.email
            };
            API.movie.register(params).then(({data}) => {
              // TODO 如果用户是新注册的，也就是冷启动，那么给与一个帮助用户了解自己喜好的页面
              if (data.code == 500) {
                this.$message.error(data.msg)
              } else {
                var params_2 = {
                  "username": this.dataForm.username,
                  "password": this.dataForm.password,
                };
                API.movie.login_simple(params_2).then(({data}) => {
                  if (data && data.code === 0) {
                    console.debug(data);
                    localStorage.setItem('user_id', this.dataForm.username)
                    localStorage.setItem('session_id', this.dataForm.username);
                    this.$root.eventHub.$emit('setUserStatus')
                    this.userLoggedIn = true
                    // TODO 如果用户是新注册的，也就是冷启动，那么给与一个帮助用户了解自己喜好的页面
                    this.$router.replace({name: 'recommend'})
                  } else {
                    console.debug(data);
                    this.$message.error(data.msg)
                  }
                })
              }

            });
          }
        })
      },
    },
    name: 'register'
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
      width: 470px;
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
</style>
