<template>
  <!-- model 在校验以及重置输入的时候必填 -->
  <el-form label-width="120px" class="container">
    <el-form-item label="密码">
      <el-input
        type="password"
        v-model="password"
        placeholder="请输入密码..."
      />
    </el-form-item>
    <el-form-item>
      <!-- 提交前进行校验 -->
      <el-button
        @click="handleResetPassword()"
        type="primary"
        class="submit-btn"
        >重置密码</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, inject } from "vue";
import type { FormInstance } from "element-plus";
import { useRouter, useRoute } from "vue-router";

let axios = inject("axios");
let router = useRouter();
const route = useRoute();

const resetPassForm = ref<FormInstance>();
const passForm = reactive({
  newPass: "",
  confirmPass: "",
});

// ? 确认密码校验回调函数
const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== passForm.newPass) {
    callback(new Error("请输入相同的密码"));
  } else {
    callback();
  }
};

const passRules = reactive({
  newPass: [
    // ! 键名必须与 template 中的 prop 属性保持一致
    {
      message: "密码不能为空",
      required: true,
      trigger: "blur",
    },
    {
      min: 6,
      max: 18,
      message: "密码长度范围必须在 6~18 字符内",
      trigger: "blur",
    },
  ],
  confirmPass: [
    // ! 键名必须与 template 中的 prop 属性保持一致
    {
      validator: validatePass2,
      trigger: "blur",
    },
  ],
});

const password = ref<string>("");
const handleResetPassword = (formEl: FormInstance | undefined) => {
  // 校验密码
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // @ts-ignore
      axios
        .put("/api/v1/auth/handleResetPassword/" + route.params.id, {
          // 提交新的密码
          password: passForm.newPass,
        })
        .then((res: any): void => {
          console.log("密码修改成功!");
          if (res.data.success) {
            router.push("/");
          }
        });
    } else {
      console.log("出现错误,请重试");
      return false;
    }
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
