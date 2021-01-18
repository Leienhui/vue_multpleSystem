<template>
    <div>
        <Row>
            <i-col :span="2"> {{ c }}： </i-col>
            <i-col :span="22">
                <CheckboxGroup
                    :value="$store.state.carStore[k]"
                    @on-change="changeFilterHandler(k, $event)"
                >
                    <Checkbox v-for="item in choices" :key="item" :label="item">
                        <span>{{ item }}</span>
                    </Checkbox>
                </CheckboxGroup>
            </i-col>
        </Row>
    </div>
</template>

<script>
export default {
    props: ["choices", "k", "c"],
    methods: {
        // 改变过滤器
        changeFilterHandler(k, v) {
            // k是你要改变哪个过滤器？？？
            // v是你要改变成什么值？？？
            this.$store.dispatch("carStore/CHANGEFILTER", { k, v });
        }
    }
};
</script>

<style lang="less" scoped></style>
