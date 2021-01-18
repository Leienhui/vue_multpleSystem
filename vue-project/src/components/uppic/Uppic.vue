<template>
    <div>
        <Modal
            :width="800"
            :value="isShowModal"
            @on-cancel="
                $emit('cancel');
                step = 1;
            "
            :mask-closable="false"
        >
            <div slot="header">
                <b v-show="step == 1">从媒体库中选择图片</b>
                <router-link
                    v-show="step == 1"
                    to="/manage/mediamanage"
                    class="glmtk"
                >
                    管理媒体库
                </router-link>
                <b v-show="step == 2">上传新的图片</b>
            </div>
            <div v-if="isShowModal">
                <Step1
                    v-if="step == 1"
                    @gotoStep2="step = 2"
                    ref="step1"
                    :choosedFileNameArr="choosedFileNameArr"
                />
                <Step2
                    v-if="step == 2"
                    ref="step2"
                    @alldone="isAlldone = true"
                />
            </div>
            <div slot="footer">
                <div v-if="step == 1">
                    <Button @click="$emit('cancel')">取消</Button>
                    <Button type="success" @click="step1OkHandler">确定</Button>
                </div>
                <div v-if="step == 2">
                    <Button @click="step = 1">返回</Button>
                    <Button
                        type="primary"
                        :disabled="!isAlldone"
                        @click="step2OkHandler"
                        >确定</Button
                    >
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import Step1 from "./Step1.vue";
import Step2 from "./Step2.vue";
import mediaHttp from "../../http/mediaHttp.js";
export default {
    props: ["isShowModal", "choosedFileNameArr"],
    data() {
        return {
            // 步骤，1表示查看媒体库，2表示上传图片
            step: 1,
            isAlldone: false
        };
    },
    components: {
        Step1,
        Step2
    },
    methods: {
        step1OkHandler() {
            // 得到数据
            const checkedFilenameArr = this.$refs.step1.checkedFilenameArr;
            // 传出去
            this.$emit("choose-pic-done", checkedFilenameArr);
        },
        step2OkHandler() {
            mediaHttp
                .addToDb({
                    filenamearr: this.$refs.step2.serverFileNameArr,
                    directory: this.$refs.step2.chooseDirectory
                })
                .then(data => {
                    if (data.data == "ok") {
                        // 把step设置为1了，那么我们的<Step v-if="step == 2" />它就消亡了
                        // 为什么消亡了？？因为是v-if指令。
                        // 消亡了是好事儿，这样它的n就重置为0了。
                        this.step = 1;
                    }
                });
        }
    }
};
</script>

<style lang="less" scoped>
.glmtk {
    margin-left: 30px;
    font-size: 12px;
    color: #333;
    text-decoration: underline;
}
</style>
