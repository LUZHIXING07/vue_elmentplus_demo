import { reactive } from "vue";

// 定义 TS 对象格式
interface RegisterUser {
    name: string;
    email: string;
    password: string;
    Password2: string;
    role: string;
}

// 获取注册的信息
export const registerUser = reactive<RegisterUser>({
    name: "",
    email: "",
    password: "",
    Password2: "",
    role: "",
});

// 表单的校验规则
interface RegisterRules {
    name: ({
        message: string;
        required: boolean;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
    })[];
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
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    })[];
    password2: ({
        required: boolean;
        message: string;
        trigger: string;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
    } | {
        validator: (rule: RegisterRules, value: string, callback: any) => void;
        trigger: string;
    })[];
}

// 确认密码校验回调函数
const validatePass2 = (rule: RegisterRules, value: string, callback: any) => {
    if (value === "") {
        callback(new Error("请再次输入密码"));
    } else if (value !== registerUser.password) {
        callback(new Error("两次输入密码不一致！"));
    } else {
        callback();
    }
};

export const registerRules = reactive<RegisterRules>({
    name: [
        {
            message: "用户名不能为空...",
            required: true,
            trigger: "blur",
        },
        {
            min: 3,
            max: 12,
            message: "长度在3到12个字符之间",
            trigger: "blur",
        },
    ],
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
    password2: [
        {
            required: true,
            message: "两次输入密码不一致！",
            trigger: "blur",
        },
        {
            min: 6,
            max: 18,
            message: "请输入6-18位的密码",
            trigger: "blur",
        },
        { validator: validatePass2, trigger: "blur" },
    ],
});
