<template>
    <div class="upwrap">
        <img class="tutu" :src="localBase64" alt="" />
    </div>
</template>

<script>
import mediaHttp from "../../http/mediaHttp.js";
export default {
    props: ["file"],
    data() {
        return {
            localBase64: ""
        };
    },
    created() {
        // 上传前预览
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = e => {
            this.localBase64 = e.currentTarget.result;
        };
        // 创建虚拟表单，要真正的提交这个图片给服务器
        const formData = new FormData();
        formData.append("pic", this.file);
        mediaHttp.up(formData).then(data => {
            console.log(data.data);
            // 向上层回调它的信息
            this.$emit("updone", data.data.name);
        });
    }
};
</script>

<style lang="less" scoped>
.upwrap {
    width: 100px;
    height: 100px;
    position: relative;
    .tutu {
        position: absolute;
        max-width: 100px;
        max-height: 100px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
