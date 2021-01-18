<template>
    <div @click.stop="">
        <Dropdown trigger="custom" :visible="isShowMenu" placement="bottom-start">
            <div class="pcas_kuang" @click="isShowMenu=true">
                <span v-if="S!=''">{{P}}/{{C}}/{{A}}/{{S}}</span>
                <span v-else>请选择省市县镇</span>
            </div>
            <DropdownMenu slot="list" style="width: 500px; height: 200px;padding: 10px;">
                <div class="hd">
                    <span :class="{'cur': P == ''}" @click="pspanHandler">
                        {{P=='' ? '请选择省' : P}}
                    </span>
                    <span v-if="P!=''" :class="{'cur': C == ''}"  @click="cspanHandler">
                        {{C=='' ? '请选择市' : C}}
                    </span>
                    <span v-if="C!=''" :class="{'cur': A == ''}"  @click="aspanHandler">
                        {{A=='' ? '请选择县' : A}}
                    </span>
                    <span v-if="A!=''" :class="{'cur': S == ''}"  @click="sspanHandler">
                        {{S=='' ? '请选择镇' : S}}
                    </span>
                </div>
                <ChooseP v-if="P==''" :pcasObj="pcasObj" @done="P=$event" />
                <ChooseC v-else-if="C==''" :pcasObj="pcasObj" :P="P" @done="C=$event"/>
                <ChooseA v-else-if="A==''" :pcasObj="pcasObj" :P="P" :C="C" @done="A=$event"/>
                <ChooseS v-else-if="S==''" :pcasObj="pcasObj" :P="P" :C="C" :A= "A" @done="S=$event;isShowMenu=false"/>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import axios from "axios";
import ChooseP from "./ChooseP.vue";
import ChooseC from "./ChooseC.vue";
import ChooseA from "./ChooseA.vue";
import ChooseS from "./ChooseS.vue";
export default {
    data() {
        return {
            pcasObj: {},
            P: '',
            C: '',
            A: '',
            S: '',
            isShowMenu: false
        };
    },
    async created() {
        const pcasObj = await axios
            .get("http://www.aiqianduan.com:56506/pcas")
            .then(data => data.data);
        console.log(pcasObj);
        this.pcasObj = pcasObj;
    },
    components: {
        ChooseP,
        ChooseC,
        ChooseA,
        ChooseS
    },
    methods: {
        pspanHandler() {
            this.P = '';
            this.C = '';
            this.A = '';
            this.S = '';
        },
        cspanHandler() {
            this.C = '';
            this.A = '';
            this.S = '';
        },
        aspanHandler() {
            this.A = '';
            this.S = '';
        },
        sspanHandler() {
            this.S = '';
        }
    },
    mounted() {
        // 给document添加一个点击事件，不能写onclick，必须写addEventListener()。
        // 这是因为onclick只能写一个，后写的会覆盖先写的。addEventListener()表示添加事件监听，不会产生覆盖。
        document.addEventListener('click', () => {
            this.isShowMenu = false;
        }, false);
    }
};
</script>

<style lang="less">
.pcas_kuang {
    border: 1px solid rgb(214, 213, 213);
    width: 300px;
    height: 30px;
    border-radius: 6px;
    cursor: pointer;
    line-height: 30px;
    padding-left: 10px;
}
.hd {
    overflow: hidden;
    @border-setting: 1px solid rgb(199, 196, 196);
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(199, 196, 196);
    span {
        float: left;
        padding: 4px 10px;
        border: @border-setting;
        border-right: none;
        border-bottom: none;
        cursor: pointer;
        &:last-child {
            border-right: @border-setting;
        }
        &.cur {
            color: red;
        }
    }
}
.panel{
    height: 130px;
    overflow-y: scroll;
    a {
        margin-right: 20px;
        float: left;
    }
}
</style>
