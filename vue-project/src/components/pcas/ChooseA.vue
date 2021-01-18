<template>
    <div>
        <div class="panel">
            <a href="javascript:;" v-for="(v,k) in pcasObj[P][C]" :key="k" @click="$emit('done', k)">
                {{k}}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['P', 'C', 'pcasObj']
};
</script>

<style lang="less" scoped>

</style>