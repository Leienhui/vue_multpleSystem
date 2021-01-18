<template>
    <div style="overflow:hidden;">
        <input
            type="file"
            hidden
            ref="fileInput"
            multiple
            @change="fileChangeHandler"
        />
        <div style="overflow:hidden;">
            <div class="upbox" v-for="(item, index) in files" :key="index">
                <Up :file="item" @updone="updoneHandler"/>
            </div>
        </div>
        <div>
            将这些图片都存放到文件夹：
            <Select style="width:200px" v-model="chooseDirectory">
                <Option v-for="item in allDirectoryNameArr" :key="item" :value="item">
                    {{item}}
                </Option>
            </Select>
        </div>
    </div>
</template>

<script>
import Up from "./Up.vue";
import axios from 'axios';
export default {
    async created() {
        const arr = await axios.get('/api/get-all-directory-name').then(data => data.data);
        this.allDirectoryNameArr = arr;
    },
    components: {
        Up
    },
    data() {
        return {
            files: [],
            allDirectoryNameArr: [],
            chooseDirectory: '未分类图片',
            // 已经上传好的图片数量
            n: 0,
            // 收集的服务端返回的图片文件名
            serverFileNameArr:[]
        };
    },
    // 上树之后，不能是created，因为created的时候还没有input框。
    mounted() {
        // 得到input框
        const fileInput = this.$refs.fileInput;
        // 创建一个模拟点击。MouseEvents表示鼠标事件
        const e = document.createEvent("MouseEvents");
        // 初始化为点击事件
        e.initEvent("click", true, true);
        // 让这个框发出模拟点击
        fileInput.dispatchEvent(e);
    },
    methods: {
        fileChangeHandler(e) {
            console.log(e.target.files);
            this.files = e.target.files;
        },
        // 当任何一张图片上传完毕的时候，都会触发这个函数，可以技术
        updoneHandler(filename) {
            // 没上传完一张，都往serverFileNameArr中推入这个文件名
            this.serverFileNameArr.push(filename);
            // 计数
            this.n ++;
            if (this.n == this.files.length) {
                // 全都上传完毕了
                this.$emit('alldone');
            }
        }
    }
};
</script>

<style lang="less" scoped>
.upbox {
    float: left;
    width: 100px;
    height: 100px;
    border: 1px solid rgb(219, 218, 218);
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>
