<template>
    <div>
        <button @click="isShowModal=true">添加图片</button>
        
        <Uppic :isShowModal="isShowModal" @choose-pic-done="choosePicDoneHan" :choosedFileNameArr="arr" @cancel="cancelHan" />

        <draggable v-model="arr" @start="drag=true" @end="drag=false">
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                <img width="80" v-for="item in arr" :key="item" :src="`http://127.0.0.1:3000/${item}`" alt="">
            </transition-group>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable';
import Uppic from '../../components/uppic/Uppic.vue';
export default {
    components: {
        Uppic,
        draggable
    },
    data() {
        return {
            isShowModal: true,
            arr: [],
            drag: false
        };
    },
    methods: {
        choosePicDoneHan(arr) {
            this.arr = arr;
            this.isShowModal = false;
        },
        cancelHan() {
            this.isShowModal = false;
        }
    }
};
</script>

<style lang="less" scoped>
.flip-list-move {
    transition: transform 0.5s;
}
.no-move {
    transition: transform 0s;
}
</style>