<!-- loading页面 -->
<template>
  <div class="login-box">
    <div class="login-inner">
      <p class="logo-bar">
        <!-- <img src="../../static/img/logo.png" alt=""> -->
        <img src="../../static/img/logo.jpg" alt="">
        <span>
          湖南科大学毕业设计-音乐推荐系统
        </span>
      </p>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" @keyup.native.enter="login"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login" class="loginBtn">登录</el-button>
      <el-button type="text" @click="doRegister" class="registerBtn">没有账号，立即注册</el-button>
    </div>
  </div>
</template>

<script>
import service from "../service/BaseDao";
export default {
  name: "c-type",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      checked: "",
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 60, message: "长度在 2 到 60 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    open(str, type) {
      this.$message({
        message: str,
        type: type,
        duration: 800
      });
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return; // 如果检验不成功则直接返回
        var rq_data = {
          password: this.loginForm.password,
          username: this.loginForm.username
        };
        
        service.post("/user/login/", rq_data).then(data => {
          let re_data = data.data;
          
          //console.log(data) data 是后台返回的json数据
          if (re_data.state == 1) {
            let _id = re_data.data.id;
            let _name = re_data.data.name;
            // console.log(re_data.token)
            this.$cookie.set("userid", _id);
            this.$cookie.set("username", _name);
            window.sessionStorage.setItem("token", re_data.token); // 添加token 字段
            this.$message({
              // this.$message 是自定义的全局的一个组件
              message: "登录成功",
              type: "success",
              duration: 1000
            });

            this.$router.push("/homepage");
          }

          if (re_data.state == 2) {
            this.$message({
              // this.$message 是自定义的全局的一个组件
              message: "账号|密码错误,请重试",
              type: "error",
              duration: 1000
            });
            this.loginForm.username = "";
            this.loginForm.password = "";
          }
        });
      });
    },
    doRegister() {
      this.$router.push({ path: "/register" });
    }
  },
  created() {},
  mounted() {

  }
};
</script>

<style lang='less' scoped>
@import "../../static/less/login.less";
</style>
