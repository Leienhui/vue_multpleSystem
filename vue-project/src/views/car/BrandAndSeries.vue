<template>
    <div class="brandandseries">
        <Row>
            <i-col :span="2"> 品牌： </i-col>
            <i-col :span="22">
                <Tabs value="A">
                    <TabPane
                        v-for="(v, k) in allbs"
                        :key="k"
                        :label="k"
                        :name="k"
                    >
                        <a
                            :class="['choice_a', {'cur': $store.state.carStore.brand == kk}]"
                            v-for="(vv, kk) in allbs[k]"
                            :key="kk"
                            href="javascript:;"
                            @click="changeBrand(kk)"
                        >
                            {{ kk }}
                        </a>
                    </TabPane>
                </Tabs>
            </i-col>
        </Row>
        <Row style="margin-top: 20px;">
            <i-col :span="2"> 车系： </i-col>
            <i-col :span="22">
                <a :class="['choice_a', {'cur': $store.state.carStore.series == ''}]" @click="changeSeries('')">
                    不限
                </a>
                <a
                    :class="['choice_a', {'cur': $store.state.carStore.series == item}]"
                    v-for="item in seriesObj[$store.state.carStore.brand]"
                    :key="item"
                    @click="changeSeries(item)"
                >
                    {{ item }}
                </a>
            </i-col>
        </Row>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch("carStore/LOADALLBS");
    },
    computed: {
        // computed还有一个功能，就是可以将一个长的变量表示，重新改为一个短的变量名
        allbs() {
            return this.$store.state.carStore.allbs;
        },
        seriesObj() {
            // 脱层的对象，{A:{}, B: {}, C: {}, D: {},……}
            // 变为{奥迪：[], 奔驰：[]}
            let obj = {};
            // 下面的小算法要自己盘盘清除
            for (let k in this.allbs) {
                let v = this.allbs[k];
                for (let kk in v) {
                    obj[kk] = v[kk];
                }
            }
            return obj;
        }
    },
    methods: {
        changeBrand(brand) {
            this.$store.dispatch("carStore/CHANGEBRAND", { brand });
        },
        changeSeries(series) {
            this.$store.dispatch("carStore/CHANGESERIES", { series });
        }
    }
};
</script>

<style lang="less">
.brandandseries .ivu-tabs-nav .ivu-tabs-tab {
    padding-top: 0;
}
.choice_a {
    padding: 3px 5px;
    text-align: center;
    margin-right: 10px;
    &.cur {
        background: orange;
        color: white;
    }
}
</style>
