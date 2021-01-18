<template>
    <div>
        <Tabs>
            <TabPane v-for="(v, k) in products" :key="k" :label="k" :name="k">
                <Row :gutter="16">
                    <i-col :span="4" v-for="item in v" :key="item.name">
                        <Badge :count="calcSomeThing(item.name)">
                            <Card class="mycard">
                                <img
                                    @click="clickCardHandler(item)"
                                    class="pimg"
                                    :src="
                                        `http://www.aiqianduan.com:56506/images/productpics/${item.pic}`
                                    "
                                    alt=""
                                />
                                {{ item.name }}
                            </Card>
                        </Badge>
                    </i-col>
                </Row>
            </TabPane>
        </Tabs>
        <Modal
            :value="isShowModal"
            :mask-closable="false"
            title="进货"
            @on-cancel="modalCancelHandler"
        >
            <Inner ref="inner" v-if="isShowModal" :nowItem="nowItem" />
            <div slot="footer">
                <Button>取消</Button>
                <Button type="primary" @click="modalOKHandler">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Inner from "./Inner.vue";
export default {
    components: {
        Inner
    },
    data() {
        return {
            isShowModal: false,
            nowItem: {}
        };
    },
    created() {
        this.$store.dispatch("shipStore/LOADDATA");
    },
    computed: {
        products() {
            return this.$store.state.shipStore.products;
        }
    },
    methods: {
        clickCardHandler(item) {
            this.isShowModal = true;
            // 这句话很关键，可以让弹出层知道点谁弹出来的。
            this.nowItem = item;
        },
        modalOKHandler() {
            // this.isShowModal = false;
            // 得到inner的值
            const factoryArr = this.$refs.inner.factoryArr;
            console.log(factoryArr);
            this.$store.dispatch("shipStore/CHANGELIST", {
                name: this.nowItem.name,
                factory: factoryArr
            });
            this.isShowModal = false;
        },
        modalCancelHandler() {
            this.isShowModal = false;
        },
        // 计算store中存储的这个东西的总数
        calcSomeThing(name) {
            const arr = this.$store.state.shipStore.shipList.filter(
                item => item.name == name
            );
            let sum = 0;
            if (arr.length != 0) {
                const thingObj = arr[0];
                for (let i = 0; i < thingObj.factory.length; i++) {
                    sum += thingObj.factory[i].count;
                }
            }
            return sum;
        }
    }
};
</script>

<style lang="less" scoped>
.mycard {
    height: 220px;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
        border: 2px solid orange;
    }
}
.pimg {
    width: 100%;
}
</style>
