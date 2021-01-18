<template>
    <div class="myimgbox">
        <img v-if="localBase64 != ''" :src="localBase64" alt="">
    </div>
</template>

<script>
export default {
    props: ['file'],
    data() {
        return {
            localBase64: ''
        };
    },
    created() {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = e => {
            this.localBase64 = e.currentTarget.result;
        };
    }
};
</script>

<style lang="less" scoped>
    .myimgbox{
        border: 1px solid rgb(218, 216, 216);
        width: 140px;
        height: 140px;
        position: relative;
    }
    img {
        max-height: 140px;
        max-width: 140px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
    }
</style>