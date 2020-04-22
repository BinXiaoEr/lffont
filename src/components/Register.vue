<template>
  <div class="login_container">
    <div class='htitle'>
        <h1 >湖南科技大学毕业设计-音乐推荐系统</h1>
      </div>
    <div class="login_box">
      
      <!-- 头像区域 -->
      <!-- <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div> -->
      <div class="h3title">
        <h3>{{title}}</h3>
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btncss">
          <el-button type="primary" @click="login">{{bttn1}}</el-button>
          <el-button type="info" @click="resetLoginForm">{{bttn2}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import qs from "qs";
import service from "../service/BaseDao";
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: ""
      },
      title:'用户注册',
      bttn1:'注册',
      bttn2:'前往登录',
      // 这是表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入注册密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetLoginForm() {
      // resetFields 重置表单 this.$refs.loginFormRef 获取表单对象  loginFormRef 是表单自定义的一个对象名称
       this.$router.push("/login")
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return; // 如果检验不成功则直接返回
        var rq_data = {
          password: this.loginForm.password,
          username: this.loginForm.username
        };
        var flag=-1
        service.post("/user/register/", rq_data).then(data => {
          let re_data = data.data;
          //console.log(data) data 是后台返回的json数据
          if (re_data.state==1){
            this.$router.push("/login")
          }
          else{
            this.$message({
              // this.$message 是自定义的全局的一个组件
              message: "用户名已存在",
              type: "error",
              duration:1000
            });
          }
        });
      });
    }
  }
};
</script>


<style lang="less" scoped>
.login_container {
  background-color: #EE7700;
  height: 100%;
}
.htitle{
  // width: 450px;
  // height: 300px;
  // background-color: #fff;
  // border-radius: 3px;
  font-size: 20px;
  // background-color:black;
  color: black;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
}
.h3title{
  font-size: 20px;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  /* 设置对应 position left top transform 设置 标志在最中间 */
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btncss {
  // 有对其
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>