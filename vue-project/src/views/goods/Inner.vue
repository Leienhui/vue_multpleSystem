<template>
    <div>
        <h3>{{ nowItem.name }}</h3>
        <Row :gutter="16">
            <i-col :span="6">
                <img
                    class="myNowItemImg"
                    :src="
                        `http://www.aiqianduan.com:56506/images/productpics/${nowItem.pic}`
                    "
                    alt=""
                />
            </i-col>
            <i-col :span="18">
                <div v-for="item in factoryArr" :key="item.factory_name" class="bar">
                    {{ item.factory_name }}工厂：
                    <i-input
                        type="number"
                        style="margin-bottom: 10px;"
                        v-model.number="item.count"
                    />
                </div>
            </i-col>
        </Row>
        <p>{{ factoryArr }}</p>
    </div>
</template>

<script>
import * as _ from "lodash";
export default {
    props: ["nowItem"],
    data() {
        return {
            // 工厂的数据
            factoryArr: []
        };
    },
    created() {
        // 读取store，看看是否有同名的东西，要根据同名东西决定自己的factoryArr中的值。
        const arr = this.$store.state.shipStore.shipList.filter(
            item => item.name == this.nowItem.name
        );

        if (arr.length == 0) {
            // store中没有，每个商品都是0
            this.factoryArr = this.nowItem.factory.map(item => ({
                factory_name: item,
                count: 0
            }));
        } else {
            // 为什么要深克隆？？？如果不深克隆，那么此时$store中的factory就被更改了，你的取消按钮就没用了
            this.factoryArr = _.cloneDeep(arr[0].factory);
        }
    }
};
</script>

<style lang="less" scoped>
.myNowItemImg {
    width: 100%;
}
</style>
