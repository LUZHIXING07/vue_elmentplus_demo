import { reactive } from "vue";

interface User {
  email: string;
  password: string;
}

export const loginUser = reactive<User>({
  email: "",
  password: "",
});

interface Rules {
  email: {
    type: string;
    message: string;
    required: boolean;
    trigger: string;
  }[];
  password: ({
    required: boolean;
    message: string;
    trigger: string;
    min?: undefined;
    max?: undefined;
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
    required?: undefined;
  })[];
}

// 校验规则
export const rules = reactive<Rules>({
  email: [
    {
      type: "email",
      message: "邮箱格式不正确",
      required: true,
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "输入的密码不能为空", trigger: "blur" },
    {
      min: 6,
      max: 18,
      message: "请输入6-18位的密码",
      trigger: "blur",
    },
  ],
});