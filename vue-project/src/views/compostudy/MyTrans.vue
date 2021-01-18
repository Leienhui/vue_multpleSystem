<template>
    <div>
        <h1>穿梭框</h1>
        <p>请选择中度风险地区</p>
        <Transfer
            :data="data1"
            :target-keys="targetKeys1"
            @on-change="handleChange1"
        ></Transfer>

        {{ targetKeys1 }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            data1: [
                {
                    key: 1,
                    label: "小明"
                },
                {
                    key: 2,
                    label: "小红"
                },
                {
                    key: 3,
                    label: "小强"
                }
            ],
            targetKeys1: [2, 3]
        };
    },
    methods: {
        handleChange1(newTargetKeys) {
            this.targetKeys1 = newTargetKeys;
        }
    }
};
</script>

<style lang="scss" scoped></style>
