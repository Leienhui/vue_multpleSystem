<template>
    <div>
        <div class="wrap">
            <div class="toplevel" v-if="nowInDirectory == ''">
                <h1>图片媒体库</h1>
                <div
                    class="grid"
                    v-show="item != '未分类图片'"
                    v-for="item in directoryNameArr"
                    :key="item"
                    @click="nowInDirectory = item"
                >
                    <img class="bigdirectory" src="/images/bigdirectory.png" />
                    <span>{{ item }}</span>
                    <div style="overflow:hidden;">
                        <b class="b1" @click.stop="">重命名</b>
                        <b class="b2" @click.stop="">删除</b>
                    </div>
                </div>
                <div
                    class="grid"
                    v-for="item in wflimages"
                    :key="item.filename"
                >
                    <div class="tutu">
                        <img
                            :src="`http://127.0.0.1:3000/${item.filename}`"
                            alt=""
                        />
                    </div>
                    <span>{{ item.title }}</span>
                    <div style="overflow:hidden;">
                        <b
                            class="b1"
                            @click.stop="cmmHandler(item.filename, item.title)"
                            >重命名</b
                        >
                        <b
                            class="b2"
                            @click.stop="cmmHandler(item.filename, item.title)"
                            >移动</b
                        >
                        <b class="b3" @click.stop="">删除</b>
                        <b class="b4" @click.stop="jiancai(item.filename)">剪裁</b>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1>
                    {{ nowInDirectory }}文件夹
                    <a
                        class="mya"
                        href="javascript:;"
                        @click="nowInDirectory = ''"
                        >返回上层</a
                    >
                </h1>
            </div>
        </div>

        <Modal
            title="重命名图片"
            :value="isShowCMMModal"
            @on-cancel="cmmCancelHandler"
            @on-ok="cmmOkHandler"
        >
            <i-input :value="nowCMMtitle" ref="cmmKuang"></i-input>
        </Modal>

        <Modal :value="isShowJianCaiModal" @on-cancel="jcCancelHandler" width="800">
            <CutPic v-if="isShowJianCaiModal" :picfilename="nowCutPicfilename" @done="cutPicDoneHan"/>
            <div slot="footer"></div>
        </Modal>
        
    </div>
</template>

<script>
import axios from "axios";
import CutPic from "../../components/cutpic/CutPic.vue";
export default {
    components: {
        CutPic
    },
    data() {
        return {
            directoryNameArr: [],
            wflimages: [],
            nowInDirectory: "",
            isShowCMMModal: false,
            nowCMMfilename: "",
            nowCMMtitle: "",
            nowCutPicfilename: "",
            isShowJianCaiModal: false
        };
    },
    created() {
        this.load();
    },
    methods: {
        async load() {
            const wflimages = await axios
                .get("/api/get-pic-from-the-directory?directory=未分类图片")
                .then(data => data.data);
            this.wflimages = wflimages;
            const directoryNameArr = await axios
                .get("/api/get-all-directory-name")
                .then(data => data.data);
            this.directoryNameArr = directoryNameArr;
        },
        cmmHandler(filename, title) {
            this.isShowCMMModal = true;
            this.nowCMMfilename = filename;
            this.nowCMMtitle = title;
        },
        cmmCancelHandler() {
            this.isShowCMMModal = false;
        },
        cmmOkHandler() {
            console.log(this.$refs.cmmKuang);
            axios.post("/api/cmmtupian", {
                title: this.$refs.cmmKuang.currentValue,
                filename: this.nowCMMfilename
            });
        },
        jiancai(filename) {
            this.isShowJianCaiModal = true;
            this.nowCutPicfilename = filename;
        },
        jcCancelHandler() {
            this.isShowJianCaiModal = false;
        },
        cutPicDoneHan() {
            this.isShowJianCaiModal = false;
            window.location.reload();
        }
    }
};
</script>

<style lang="less" scoped>
.wrap {
    overflow: hidden;
}
.grid {
    float: left;
    width: 130px;
    height: 180px;
    // border: 1px solid rgb(170, 169, 169);
    box-sizing: content-box;
    margin-right: 10px;
    text-align: center;
    position: relative;
    cursor: pointer;
    .bigdirectory {
        width: 130px;
        height: 130px;
    }
    .tutu {
        width: 130px;
        height: 130px;
        position: relative;
        img {
            position: absolute;
            max-width: 130px;
            max-height: 130px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
    &:hover b {
        display: block;
    }
    b {
        display: none;
        font-weight: normal;
        text-align: center;
        text-decoration: underline;
        position: absolute;
        bottom: 0;
        width: 33.33%;
    }
    .b1 {
        left: 0;
        color: green;
    }
    .b2 {
        left: 33.33%;
        color: rgb(22, 106, 175);
    }
    .b3 {
        left: 66.666%;
        color: red;
    }
    .b4 {
        bottom: 20px;
        left: 0%;
        color: red;
    }
}
.mya {
    font-size: 14px;
    text-decoration: underline;
}
</style>
