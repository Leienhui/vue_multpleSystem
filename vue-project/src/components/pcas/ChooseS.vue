<template>
    <div>
        <div class="panel">
            <a href="javascript:;" v-for="item in pcasObj[P][C][A]" :key="item" @click="$emit('done', item)">
                {{item}}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['P', 'C', 'A', 'pcasObj']
};
</script>

<style lang="less" scoped>
</style>