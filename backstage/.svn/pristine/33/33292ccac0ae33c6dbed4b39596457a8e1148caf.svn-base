<template>
  <div
      class="login_page"
      style="width: 100%;height: 100%;">
    <div class="logo"><img
        src="./img/logo.png"
        :alt="systemName"></div>
    <transition
        name="form-fade"
        mode="in-out">
      <section
          :class="['form_contianer']"
          v-show="showLogin">
        <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm">
          <el-form-item prop="username">
            <!--icon定义字符串，：icon定义方法-->
            <el-input
                v-model="loginForm.username"
                auto-complete="off"
                placeholder="用户名"
                @keyup.enter.native="submitForm('loginForm')"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                type="password"
                placeholder="密码"
                v-model="loginForm.password"
                @keyup.enter.native="submitForm('loginForm')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                :loading="loading"
                @click="submitForm('loginForm')"
                class="submit_btn">登录
            </el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        systemName: "曹家滩矿井管控平台",
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        showLogin: false,
        loading: false
      }
    },
    created() {
      this.showLogin = true
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj = {...this.loginForm}
            console.log(obj)
            this.loading = true
            if (obj.username === 'admin' && obj.password === 'yt123456') {
              this.loading = false
              this.$message({type: 'success', message: '登录成功'})
              this.$router.push('main')
            } else {
              this.loading = false
              this.$message.error('用户或密码错误，请重新输入！')
            }
          } else {
            this.$message.error('请输入用户和密码')
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    mounted() {

    }
  }
</script>

<style
    lang="less"
    scoped>
  .login_page {
    background: url('./img/login_bg.jpg');
    background-size: cover;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .quit-unity {
      cursor: pointer;
      font-size: 30px;
      color: #d82826;
      position: absolute;
      right: 10px;
      top: 10px;
    }

    .logo {
      text-align: center;
      padding: 30px 0;
      font-size: 30px;

      span {
        display: block;
        font-size: 40px;
        color: #07ccef;
        margin-top: 20px;
      }
    }

    .form_contianer {
      width: 389px;
      height: 300px;
      text-align: center;
      background: url(./img/form-container.png);
      margin: 0 auto;

      form {
        margin: 67px 42px;
      }

      .submit_btn {
        width: 100%;
        font-size: 16px;
        background-color: #d82826;
        border: 1px solid #d82826;
        color: #ffffff;
      }
    }

    .form-fade-enter-active, .form-fade-leave-active {
      transition: all 1s;
    }

    .form-fade-enter, .form-fade-leave-active {
      transform: translate3d(0, -50px, 0);
      opacity: 0;
    }

    /* 更改element原有的样式 */

    .el-input--prefix .el-input__inner {
      background: #b5c7d5;
      border-color: #202d3d;
      padding-left: 55px;
    }

    // placeholder样式
    input.el-input__inner::-webkit-input-placeholder {
      color: #595d61;
    }

    .iconfont {
      display: inline-block;
    }

    .input_captcha {
      width: 215px;
      vertical-align: top;
    }

    // 验证码样式
    img.captchaImg {
      width: 100px;
    }

    .el-form-item__error {
      color: #e04f78;
      padding-top: 8px;
    }

    // 图标样式重写
    .el-input__icon {
      left: 0;
      color: #7e8b95;
      font-size: 17px;
      font-weight: bold;
      width: 40px;
      border-right: 1px solid #909faa;
      height: 30px;
      margin-top: 5px;
      line-height: 100%;
    }

    .el-input__icon + .el-input__inner {
      padding-left: 40px;
    }

    // 验证失败样式重写
    .el-form-item.is-error .el-input__inner {
      border: 0;
      border-radius: 0;
    }
  }
</style>
