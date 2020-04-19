<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
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
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
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
        username: "张三",
        password: "密码是123"
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetLoginForm() {
      // resetFields 重置表单 this.$refs.loginFormRef 获取表单对象  loginFormRef 是表单自定义的一个对象名称
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return; // 如果检验不成功则直接返回
        var rq_data = {
          password: this.loginForm.password,
          username: this.loginForm.username
        };
        service.post("/user/login/", rq_data).then(data => {
          //console.log(data) data 是后台返回的json数据
          if (data.state == 1) {
            // console.log(data.message);
            window.sessionStorage.setItem("token", JSON.stringify(data.token)); // 添加token 字段 
            this.$message({
              // this.$message 是自定义的全局的一个组件
              message: "登录成功",
              type: "success"
            });
            this.$router.push("/home");
          }
        });
      });
    }
  }
};
</script>


<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
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