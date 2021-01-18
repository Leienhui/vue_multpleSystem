<template>
    <div>
        <Row>
            <i-col :span="4">
                <ul class="directory-list">
                    <li
                        v-for="(item, index) in directoryNameArr"
                        :key="index"
                        @click="nowOpenDirectory = item"
                        :class="{
                            cur: nowOpenDirectory == item
                        }"
                    >
                        {{ item }}
                    </li>
                </ul>
            </i-col>
            <i-col :span="20">
                <Button
                    icon="ios-cloud-upload-outline"
                    type="primary"
                    @click="$emit('gotoStep2')"
                >
                    上传新的图片到媒体库
                </Button>
                <div class="grid-all-box">
                    <div
                        class="grid"
                        v-for="item in allmediaarr"
                        :key="item.filename"
                    >
                        <Checkbox
                            class="mycheckbox"
                            @on-change="changeHan($event, item.filename)"
                            :value="checkedFilenameArr.includes(item.filename)"
                        ></Checkbox>
                        <img :src="baseURL + item.filename" alt="" />
                        <span>{{ item.title }}</span>
                    </div>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: ["choosedFileNameArr"],
    data() {
        return {
            allmediaarr: [],
            baseURL: "http://127.0.0.1:3000/",
            checkedFilenameArr: [],
            directoryNameArr: [],
            nowOpenDirectory: "未分类图片"
        };
    },
    async created() {
        const allmediaarr = await axios
            .get(
                "/api/get-pic-from-the-directory?directory=" +
                    this.nowOpenDirectory
            )
            .then(data => data.data);
        this.allmediaarr = allmediaarr;
        // 将props传入的choosedFileNameArr当做checkedFilenameArr默认值
        this.checkedFilenameArr = [...this.choosedFileNameArr];
        const directoryNameArr = await axios
            .get("/api/get-all-directory-name")
            .then(data => data.data);
        this.directoryNameArr = directoryNameArr;
    },
    methods: {
        changeHan(event, filename) {
            console.log(event, filename);
            // 如果打上勾
            if (event) {
                // 推入数组
                this.checkedFilenameArr.push(filename);
            } else {
                // 如果取消勾
                this.checkedFilenameArr = this.checkedFilenameArr.filter(
                    item => item != filename
                );
            }
        }
    },
    watch: {
        async nowOpenDirectory(v) {
            const allmediaarr = await axios
                .get("/api/get-pic-from-the-directory?directory=" + v)
                .then(data => data.data);
            this.allmediaarr = allmediaarr;
        }
    }
};
</script>

<style lang="less" scoped>
.directory-list {
    list-style: none;
    li {
        cursor: pointer;
        padding-left: 24px;
        position: relative;
        line-height: 24px;
        &.cur {
            color: red;
        }
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 4px;
            width: 18px;
            height: 18px;
            background-image: url(/images/directory.png);
            background-size: 100% 100%;
        }
        &.cur::before {
            background-image: url(/images/directory-open.png);
        }
    }
}
.grid-all-box {
    overflow: scroll;
    padding-top: 10px;
    padding-bottom: 20px;
    height: 300px;
    @a: 100px;
    .grid {
        float: left;
        width: @a;
        height: @a;
        border: 1px solid rgb(189, 186, 186);
        margin-right: 10px;
        margin-bottom: 20px;
        position: relative;
        img {
            position: absolute;
            max-width: @a;
            max-height: @a;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        span {
            position: absolute;
            bottom: -42px;
            left: 0;
            width: 100%;
            height: 40px;
            text-align: center;
            font-size: 12px;
        }
        .mycheckbox {
            position: absolute;
            right: -6px;
            top: 0;
        }
    }
}
</style>
