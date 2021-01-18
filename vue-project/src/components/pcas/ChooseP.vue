<template>
    <div>
        <div class="panel">
            <a v-for="(v, k) in pcasObj" :key="k" @click="$emit('done', k)">
                {{k}}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['pcasObj']
};
</script>

<style lang="less" scoped>
</style>