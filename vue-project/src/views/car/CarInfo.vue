<template>
    <div>
        <h1>汽车信息{{id}}</h1>
        <div>
            <h4>外观照片：</h4>
            <img v-for="item in info.images.view" :key="item" :src="`http://aiqianduan.com:56506/images/carimages_small/${id}/view/${item}`" alt="">
        </div>
        <div>
            <h4>内饰照片：</h4>
            <img v-for="item in info.images.inner" :key="item" :src="`http://aiqianduan.com:56506/images/carimages_small/${id}/inner/${item}`" alt="">
        </div>
        <div>
            <h4>发动机照片：</h4>
            <img v-for="item in info.images.engine" :key="item" :src="`http://aiqianduan.com:56506/images/carimages_small/${id}/engine/${item}`" alt="">
        </div>
        <div>
            <h4>更多照片：</h4>
            <img v-for="item in info.images.more" :key="item" :src="`http://aiqianduan.com:56506/images/carimages_small/${id}/more/${item}`" alt="">
        </div>
    </div>
</template>

<script>
import carHttp from '../../http/carHttp.js';
export default {
    async created() {
        const id = this.$route.params.id;
        const data = await carHttp.loadInfo(id).then(data => data.data);
        this.id = id;
        this.info = data.result;
    },
    data() {
        return {
            id: 0,
            info: {
                images: {
                    view: [],
                    inner: [],
                    engine: [],
                    more: []
                }
            }
        };
    }
};
</script>

<style lang="scss" scoped>

</style>