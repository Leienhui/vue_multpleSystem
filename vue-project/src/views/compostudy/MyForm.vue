<template>
    <div>
        <h1>带有验证功能的表单</h1>

        <Form style="margin-top: 20px" ref="myform" :model="myform" :rules="myRules" :label-width="220">
            <FormItem label="中文姓名" prop="name">
                <i-input
                    style="width: 300px;"
                    v-model="myform.name"
                    placeholder="请输入身份证上的姓名"
                ></i-input>
            </FormItem>
            <FormItem label="身份证号码" prop="idcard">
                <i-input
                    style="width: 300px;"
                    v-model="myform.idcard"
                    placeholder="请输入身份证号码"
                ></i-input>
            </FormItem>
            <FormItem label="输入一个大于5000的数" prop="a1">
                <i-input
                    style="width: 300px;"
                    v-model="myform.a1"
                    placeholder="服务端校验演示"
                ></i-input>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            myform: {
                name: ""
            },
            myRules: {
                name: [
                    {
                        required: true,
                        message: "姓名必须填写",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
                        message: "姓名不符合规范",
                        trigger: "blur"
                    }
                ],
                idcard: [
                    {
                        required: true,
                        message: "身份证号码必须填写",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                        message: "身份证号码不符合规范",
                        trigger: "blur"
                    }
                ],
                a1: [
                    {
                        required: true,
                        message: "数字必须填写",
                        trigger: "blur"
                    },
                    {
                        validator: (rule, value, callback) => {
                            // 请求服务器
                            axios.get("/api/checknum?a=" + value).then(data => {
                                if (data.data == "ok") {
                                    // 如果调用callback没有参数，表示成功了
                                    callback();
                                } else {
                                    // 如果callback中有错误对象，说明是错误的
                                    callback(new Error("服务端拒绝了这个数字"));
                                }
                            });
                        },
                        trigger: "blur"
                    }
                ]
            }
        };
    }
};
</script>

<style lang="scss" scoped></style>
