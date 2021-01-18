<template>
    <div>
        <h1 style="margin-bottom: 20px;">步骤条</h1>

        <Steps :current="current" style="margin-bottom: 20px;">
            <Step :title="getTitle(0)" content="看资料"></Step>
            <Step :title="getTitle(1)" content="找销售"></Step>
            <Step :title="getTitle(2)" content="付定金"></Step>
            <Step :title="getTitle(3)" content="付尾款"></Step>
            <Step :title="getTitle(4)" content="跑路了"></Step>
        </Steps>

        <div v-if="current == 0">
            <h1>我是步骤0</h1>
        </div>
        <div v-if="current == 1">
            <h1>我是步骤1</h1>
        </div>
        <div v-if="current == 2">
            <h1>我是步骤2</h1>
        </div>
        <div v-if="current == 3">
            <h1>我是步骤3</h1>
        </div>
        <div v-if="current == 4">
            <h1>我是步骤4</h1>
        </div>

        <Button @click="current++">下一步</Button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            current: 0
        };
    },
    methods: {
        getTitle(idx) {
            if (idx == this.current) return "进行中";
            if (idx > this.current) return "待进行";
            if (idx < this.current) return "已完成";
        }
    }
};
</script>

<style lang="scss" scoped></style>
