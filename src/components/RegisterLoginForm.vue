<template>
  <el-form
    :label-position="labelPosition"
    label-width="80px"
    :model="registerForm"
    :rules="registerRules"
    :status-icon="loginOrRegister === '1'"
    ref="registerFormRef"
  >
    <template v-if="loginOrRegister === '1'">
      <el-form-item label="用户名" prop="registerUsername">
        <el-input
          type="text"
          v-model="registerForm.registerUsername"
          placeholder="请输入用户名"
          maxlength="10"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="registerContact">
        <el-input
          type="text"
          v-model="registerForm.registerContact"
          placeholder="邮箱/微信/QQ"
          maxlength="30"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="registerPassword">
        <el-input
          type="password"
          v-model="registerForm.registerPassword"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input
          type="password"
          v-model="registerForm.checkPassword"
          autocomplete="off"
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>
      <div class="register-btn">
        <el-button type="primary" @click="submitRegister" :loading="registering">注 册</el-button>
      </div>
    </template>
    <template v-else>
      <el-form-item label="用户名" prop="loginUsername">
        <el-input v-model="registerForm.loginUsername" placeholder="请输入用户名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="loginPassword">
        <el-input
          type="password"
          v-model="registerForm.loginPassword"
          autocomplete="off"
          placeholder="请输入密码"
          @keyup.enter.native="submitLogin"
        ></el-input>
      </el-form-item>
      <div class="register-btn">
        <el-button type="primary" @click="submitLogin" :loading="loging">登 录</el-button>
      </div>
    </template>
  </el-form>
</template>

<script>
import { debounce, showMessage } from "../utils/utils.js";
import { setItem } from "../utils/userprofile";
import { mapMutations } from "vuex";
export default {
  name: "RegisterLoginForm",
  props: ["loginOrRegister"],
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    let validateContact = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入联系方式"));
      } else {
        callback();
      }
    };
    let useAble = debounce(async (rule, value, callback) => {
      const response = await this.$apis.usernameUseable({
        username: this.registerForm.registerUsername
      });
      if (response.data.result.length > 0) {
        callback(new Error("该用户名不可用"));
      } else {
        callback();
      }
    }, 500);
    let validatePass = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入密码"));
      } else {
        if (
          this.loginOrRegister === "0" &&
          this.registerForm.checkPassword !== ""
        ) {
          this.$refs.registerForm.validateField("checkPassword");
        }
        callback();
      }
    };
    let recheckPass = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.registerPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      registerForm: {
        registerUsername: "",
        registerPassword: "",
        registerContact: "",
        checkPassword: "",
        loginUsername: "",
        loginPassword: ""
      },
      registerRules: {
        registerUsername: [
          { validator: validateUsername, trigger: "blur" },
          { validator: useAble, trigger: ["change", "blur"] }
        ],
        registerContact: [{ validator: validateContact, trigger: "blur" }],
        registerPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: recheckPass, trigger: "blur" }],
        loginUsername: [{ validator: validateUsername, trigger: "blur" }],
        loginPassword: [{ validator: validatePass, trigger: "blur" }]
      },
      registering: false,
      loging: false
    };
  },
  methods: {
    ...mapMutations(["saveUserProfile"]),
    submitLogin() {
      this.loging = true;
      this.$refs.registerFormRef.validate(async valid => {
        if (valid) {
          let response = await this.$apis.userLogin({
            username: this.registerForm.loginUsername,
            password: this.registerForm.loginPassword
          });
          if (response && response.data && response.data.result) {
            this.$emit("closeDialog");
            showMessage("登录成功", "success");
            this.saveUserProfile({
              role: response.data.result.role,
              isLogined: true,
              username: response.data.result.username
            });
          } else {
            showMessage(response.msg, "error");
          }
        } else {
          showMessage("请检查填写是否正确", "error");
        }
        this.loging = false;
      });
    },
    submitRegister() {
      this.registering = true;
      this.$refs.registerFormRef.validate(async valid => {
        if (valid) {
          let response = await this.$apis.userRegister({
            username: this.registerForm.registerUsername,
            password: this.registerForm.registerPassword,
            contact: this.registerForm.registerContact
          });
          if (response && response.data && response.data.userId) {
            this.$emit("closeDialog");
            showMessage("注册成功", "success");
          } else {
            showMessage("注册失败", "error");
          }
        } else {
          showMessage("请检查填写是否正确", "error");
        }
        this.registering = false;
      });
    }
  },
  beforeDestroy() {
    this.$refs.registerFormRef.resetFields();
  }
};
</script>

<style scoped lang="scss">
.register-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
