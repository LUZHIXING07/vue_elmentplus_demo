<template>
  <!-- model 在校验以及重置输入的时候必填 -->
  <el-form label-width="120px" class="container">
    <el-form-item label="邮箱">
      <el-input type="email" v-model="email" placeholder="请输入邮箱..." />
    </el-form-item>
    <el-form-item>
      <!-- 提交前进行校验 -->
      <el-button
        @click="handleForgotPassword()"
        type="primary"
        class="submit-btn"
        >找回密码</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
let axios = inject("axios");
let router = useRouter();
const email = ref<string>("");
const handleForgotPassword = () => {
  // @ts-ignore
  axios
    .post("/api/v1/auth/forgotpassword", { email: email.value })
    .then((res: any): void => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
</script>

<style scoped>
.container {
  width: 800px;
  margin: 200px auto;
}

.submit-btn {
  width: 100%;
}
</style>
