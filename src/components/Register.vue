<!-- loading页面 -->
<template>
  <div class="register-page" :class="!IsPC()?'phone-style':''">
    <div :class="IsPC()?'pw-inner':''">
      <div class="top-bar" style>
        <p>欢迎注册使用湖南科技大学毕业设计-音乐推荐系统</p>
      </div>
      <div class="content-box" v-show="!successShow">
        <div class="change-block">
          <el-form ref="form" :model="form" :rules="rules" label-width="105px">
            <el-form-item prop="realname" label="真实姓名：">
              <el-input v-model="form.realname" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱：">
              <el-input v-model="form.email" placeholder="请邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="phonenum" label="联系手机：">
              <el-input v-model.number="form.phonenum" placeholder="请输入联系手机"></el-input>
              <div class="el-form-item__error">{{errorInfo}}</div>
            </el-form-item>

            <el-form-item prop="username" label="登录用户名：">
              <el-input v-model="form.username" placeholder="登录用户名："></el-input>
            </el-form-item>
            <el-form-item prop="password" label="登录密码：">
              <el-input v-model="form.password" placeholder="登录密码"></el-input>
            </el-form-item>
            <el-form-item prop="confir_password" label="请确认密码">
              <el-input v-model="form.confir_password" placeholder="请确认密码"></el-input>
            </el-form-item>
          </el-form>
          <div class="btn-group">
            <el-button type="text" class="light-btn" @click="resetBtn('form')">重置</el-button>
            <el-button type="primary" :class="!IsPC()?'phone-btn':''" @click="register">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import service from "../service/BaseDao";
export default {
  name: "c-type",
  data() {
    return {
      form: {
        realname: "",
        email: "",
        phonenum: "",
        username: "",
        password: "",
        confir_password: ""
      },
      rules: {
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入单位邮箱", trigger: "change" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenum: [
          { required: true, message: "请输入联系手机", trigger: "blur" },
          {
            type: "number",
            message: "手机号输入有误，请重新输入！",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "change" }
        ],
        confir_password: [
          { required: true, message: "请确认登录密码", trigger: "change" }
        ],
        username: [
          { required: true, message: "请输入登录用户名", trigger: "change" }
        ]
      },
      errorInfo: "",
      successShow: false
    };
  },
  methods: {
    register() {
      this.$refs.form.validate(valid => {
        if (!valid) return; // 如果检验不成功则直接返回
        if (this.form.password != this.form.confir_password) {
          this.$message({
            message: "两次密码不一样,请重新确认",
            type: "error",
            duration: 1000
          });
          this.form.password = "";
          this.form.confir_password = "";
        } else {
          let rq_data = {
            password: this.form.password,
            username: this.form.username,
            email: this.form.email,
            phone: this.form.phonenum,
            realname: this.form.realname
          };
          // console.log(rq_data);
          service.post("/user/register/", rq_data).then(data => {
            let re_data = data.data;

            // console.log(data);
            if (re_data.state == 1) {
              this.$message({
                message: "注册成功,请前往登录",
                type: "success",
                duration: 1000
              });
              this.$router.push("/login");
            } else {
              this.$message({
                // this.$message 是自定义的全局的一个组件
                message: "用户名|电话号码已存在",
                type: "error",
                duration: 1000
              });
              this.$refs[this.form].resetFields();
            }
          });
        }
      });
    },
    open(str, type) {
      this.$message({
        message: str,
        type: type,
        duration: 3000
      });
    },
    resetBtn(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.doRegister();
        } else {
          return false;
        }
      });
    },
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    backTo() {
      this.successShow = false;
      this.resetBtn("form");
    }
  },
  created() {},
  mounted() {}
};
</script>

<style  lang="less" >
@import "../../static/less/element.less";
@import "../../static/less/login.less";
</style>
