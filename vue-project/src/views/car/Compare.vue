<template>
    <div>
        <h1>对比页面</h1>
        <div>
            {{nowCompared}}
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        nowCompared() {
            return this.$store.state.carStore.nowCompared;
        }
    }
};
</script>

<style lang="scss" scoped>

</style>