<template>
    <div>
        <div class="shaixuan-bar">
            <BrandAndSeries />
        </div>
        <div class="shaixuan-bar">
            <CheckBoxBar
                k="color"
                c="颜色"
                :choices="[
                    '红',
                    '橙',
                    '黄',
                    '绿',
                    '蓝',
                    '黑',
                    '白',
                    '灰',
                    '银灰',
                    '咖啡'
                ]"
            />
        </div>
        <div class="shaixuan-bar">
            <CheckBoxBar
                k="exhaust"
                c="排放"
                :choices="['国一', '国二', '国三', '国四', '国五']"
            />
        </div>
        <div class="shaixuan-bar">
            <CheckBoxBar
                k="fuel"
                c="燃料"
                :choices="['汽油', '柴油', '油电混合', '纯电动']"
            />
        </div>
        <div class="shaixuan-bar">
            <CheckBoxBar
                k="engine"
                c="排量"
                :choices="[
                    '1.0L',
                    '1.2L',
                    '1.4L',
                    '1.4T',
                    '1.6L',
                    '1.6T',
                    '1.8L',
                    '1.8T',
                    '2.0L',
                    '2.0T',
                    '3.0L',
                    '3.0T'
                ]"
            />
        </div>

        <h4>共{{ $store.state.carStore.total }}辆车符合条件</h4>
        <Table :data="$store.state.carStore.results" :columns="columns" />
        <Page
            style="margin-top: 20px;"
            :total="$store.state.carStore.total"
            show-sizer
            :current="$store.state.carStore.page"
            @on-change="changePageHandler"
            :page-size="$store.state.carStore.pagesize"
            @on-page-size-change="changePageSizeHandler"
        />

        <div class="compareTag" @click.stop="isShowDrawer = true">
            对比{{ $store.state.carStore.nowCompared.length }}辆车
        </div>

        <div :class="['mydrawer', { cur: isShowDrawer }]" @click.stop="">
            <Row>
                <i-col
                    :span="5"
                    v-for="item in nowCompared"
                    :key="item.id"
                    style="padding: 10px; position: relative;"
                >
                    <div style="float: left; position: relative;">
                        <img
                            :src="
                                `http://aiqianduan.com:56506/images/carimages_small/${item.id}/view/${item.img}`
                            "
                            alt=""
                        />
                        <div class="cha" @click="chaHan(item.id)">
                            <Icon type="ios-close" />
                        </div>
                    </div>
                    <p style="clear: both;">
                        {{ item.brand }}{{ item.series }}[{{ item.id }}]
                    </p>
                    <p>{{ item.price }}万元</p>
                </i-col>
                <i-col style="padding: 10px;">
                    <p style="margin-bottom: 10px;">
                        <Button
                            type="success"
                            @click="gotoCompare"
                            :disabled="nowCompared.length == 1"
                            >对比它们</Button
                        >
                    </p>
                    <p>
                        <Button type="warning">清空对比</Button>
                    </p>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
import CheckBoxBar from "./CheckBoxBar.vue";
import BrandAndSeries from "./BrandAndSeries.vue";
export default {
    components: {
        CheckBoxBar,
        BrandAndSeries
    },
    mounted() {
        document.addEventListener(
            "click",
            () => {
                this.isShowDrawer = false;
            },
            false
        );
    },
    data() {
        const self = this;
        return {
            isShowDrawer: false,
            columns: [
                {
                    width: 30,
                    title: "对比",
                    render(h, rowData) {
                        const nowCompared =
                            self.$store.state.carStore.nowCompared;
                        const filterCompared = nowCompared.filter(
                            item => item.id == rowData.row.id
                        );
                        return h("div", [
                            h("Checkbox", {
                                attrs: {
                                    value: filterCompared.length != 0,
                                    disabled:
                                        nowCompared.length >= 4 &&
                                        filterCompared.length == 0
                                },
                                on: {
                                    "on-change": function(v) {
                                        console.log(v, rowData.row);
                                        // 判断是true还是false，true就是推入数组，false就是从数组中删除
                                        if (v) {
                                            self.$store.commit(
                                                "carStore/ADDCOMPARE",
                                                { carinfo: rowData.row }
                                            );
                                        } else {
                                            self.$store.commit(
                                                "carStore/REMOVECOMPARE",
                                                { id: rowData.row.id }
                                            );
                                        }
                                    }
                                }
                            })
                        ]);
                    }
                },
                {
                    title: "图片",
                    render(h, rowData) {
                        return h("img", {
                            attrs: {
                                src: `http://aiqianduan.com:56506/images/carimages_small/${rowData.row.id}/view/${rowData.row.img}`,
                                height: 50
                            },
                            on: {
                                click() {
                                    self.$router.push('/car/carinfo/' + rowData.row.id);
                                }
                            }
                        });
                    }
                },
                { title: "编号", key: "id" },
                { title: "品牌", key: "brand" },
                { title: "车系", key: "series" },
                { title: "颜色", key: "color" },
                { title: "价格", key: "price" },
                { title: "尾气标准", key: "exhaust" },
                { title: "燃料", key: "fuel" },
                { title: "排量", key: "engine" }
            ]
        };
    },
    created() {
        // 组件创建之后，发出LOADDATA请求
        this.$store.dispatch("carStore/LOADDATA");
    },
    methods: {
        // 当用户点击的页码条的时候，要通知vuex进行改变page
        changePageHandler(page) {
            // 让store进行dispatch
            this.$store.dispatch("carStore/CHANGEPAGE", { page });
        },
        // 当用户点击的页码条的每页容量的时候，要通知vuex进行改变pagesize
        changePageSizeHandler(pagesize) {
            this.$store.dispatch("carStore/CHANGEPAGESIZE", { pagesize });
        },
        gotoCompare() {
            this.$router.push("/car/compare");
        },
        chaHan(id) {
            console.log(id);
            this.$store.commit("carStore/REMOVECOMPARE", { id: id });
        }
    },
    computed: {
        nowCompared() {
            return this.$store.state.carStore.nowCompared;
        }
    }
};
</script>

<style lang="less">
.ivu-table-row td {
    padding: 2px;
}
.shaixuan-bar {
    padding: 10px 0;
}
h4 {
    margin: 10px 0;
}
.compareTag {
    position: fixed;
    bottom: 140px;
    right: 0px;
    width: 80px;
    height: 40px;
    color: white;
    background: orange;
    border-radius: 10px 0 0 10px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
}
.mydrawer {
    position: fixed;
    bottom: -100%;
    left: 0;
    width: 100%;
    height: 180px;
    background: white;
    box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.5);
    z-index: 99999;
    transition: all 0.4s ease 0s;
    &.cur {
        bottom: 0 !important;
    }
}
.cha {
    position: absolute;
    right: -6px;
    top: -6px;
    width: 18px;
    height: 18px;
    background-color: red;
    border-radius: 50%;
    z-index: 99999999;
}
</style>
