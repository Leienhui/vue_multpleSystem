<template>
    <div class="cutpicwrap">
        <div class="leftpart">
            <div
                class="bigimgbox"
                ref="bigimgbox"
                :style="{ width: imgW + 'px', height: imgH + 'px' }"
            >
                <vue-draggable-resizable
                    v-if="imgW != 0 && imgH != 0"
                    class="fang"
                    :parent="true"
                    @resizing="onResize"
                    @dragging="onDrag"
                    :lock-aspect-ratio="true"
                    :w="50"
                    :h="50"
                    :style="{
                        backgroundImage: `url(http://127.0.0.1:3000/${picfilename})`,
                        backgroundSize: calcFangPicBackgroundSize(),
                        backgroundPosition: calcFangPicBackgroundPosition()
                    }"
                >
                </vue-draggable-resizable>
            </div>
        </div>
        <div class="rightpart">
            <div class="da">
                <img
                    :src="`http://127.0.0.1:3000/${picfilename}`"
                    :style="{
                        width: calcWidth(140),
                        height: calcHeight(140),
                        left: calcLeft(140),
                        top: calcTop(140)
                    }"
                />
            </div>

            <div class="zhong">
                <img
                    :src="`http://127.0.0.1:3000/${picfilename}`"
                    :style="{
                        width: calcWidth(100),
                        height: calcHeight(100),
                        left: calcLeft(100),
                        top: calcTop(100)
                    }"
                />
            </div>

            <div class="xiao">
                <img
                    :src="`http://127.0.0.1:3000/${picfilename}`"
                    :style="{
                        width: calcWidth(60),
                        height: calcHeight(60),
                        left: calcLeft(60),
                        top: calcTop(60)
                    }"
                />
            </div>
            <Button type="success" @click="caiqie">裁切</Button>

            {{ w }}、{{ h }}、{{ x }}、{{ y }}、{{ imgW }}、{{ imgH }}
        </div>
    </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import mediaHttp from "../../http/mediaHttp.js";

export default {
    // 当组件上树之后
    mounted() {
        const img = new Image();
        img.src = `http://127.0.0.1:3000/${this.picfilename}`;
        img.className = "bigimg";
        // 上树
        this.$refs.bigimgbox.appendChild(img);
        // 监听一下图片加载完毕
        img.onload = () => {
            console.log("图片原始尺寸", img.width, img.height);
            this.originW = img.width;
            this.originH = img.height;
            // 这里很鸡贼，就是得到原始宽高之后，再补一个CSS就是最大宽、最大高
            // 一定要在得到原始宽高之后，再补最大宽高的CSS，这样可以防止最大宽高的CSS让它冲突了。
            img.style.maxWidth = 500 + "px";
            img.style.maxHeight = 400 + "px";
            // 再把设置max尺寸的这个图片的宽高存一下，计算后的尺寸，样式不是在行内上
            this.imgW = parseFloat(getComputedStyle(img).width);
            this.imgH = parseFloat(getComputedStyle(img).height);
            console.log("图片显示尺寸", this.imgW, this.imgH);
        };
    },
    data() {
        return {
            // 图片的原始宽高
            originW: 0,
            originH: 0,
            imgW: 0,
            imgH: 0,
            // 裁切块的w、h、x、y。当然w一定等于h，因为裁切块被限制为正方形。
            w: 50,
            h: 50,
            x: 0,
            y: 0
        };
    },
    components: {
        VueDraggableResizable
    },
    props: ["picfilename"],
    methods: {
        onResize(x, y, width, height) {
            console.log(x, y, width, height);
            this.w = width;
            this.h = height;
            this.x = x;
            this.y = y;
        },
        onDrag(x, y) {
            this.x = x;
            this.y = y;
        },
        calcWidth(a) {
            return (this.imgW / this.w) * a + "px";
        },
        calcHeight(a) {
            return (this.imgH / this.h) * a + "px";
        },
        calcLeft(a) {
            return ((-1 * this.x) / this.w) * a + "px";
        },
        calcTop(a) {
            return ((-1 * this.y) / this.h) * a + "px";
        },
        calcFangPicBackgroundSize() {
            return this.imgW + "px " + this.imgH + "px";
        },
        calcFangPicBackgroundPosition() {
            return "-" + this.x + "px -" + this.y + "px";
        },
        caiqie() {
            mediaHttp
                .cutpic({
                    x: this.x,
                    y: this.y,
                    w: this.w,
                    h: this.h,
                    rate: this.originW / this.imgW,
                    filename: this.picfilename
                })
                .then(data => {
                    if (data.data == "ok") {
                        this.$Message.success("图片裁剪成功");
                        // 报告done
                        this.$emit("done");
                    }
                });
        }
    }
};
</script>

<style lang="less">
.cutpicwrap {
    width: 700px;
    height: 400px;
    border: 1px solid #000;
    box-sizing: content-box;
    .leftpart {
        float: left;
        width: 500px;
        height: 400px;
        position: relative;
        background: url(/images/hbg.png);
        background-size: 16px 16px;

        .bigimgbox {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-sizing: content-box;

            &::before {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(3, 3, 3, 0.781);
                z-index: 888;
            }
        }

        .bigimg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .fang {
            z-index: 99999 !important;
            border: 1px solid #000;
        }
    }
    .rightpart {
        float: left;
        width: 200px;
        height: 400px;
        padding-left: 10px;
        padding-top: 10px;
        .da {
            width: 140px;
            height: 140px;
            border: 1px solid #000;
            overflow: hidden;
            position: relative;
            margin-bottom: 10px;
            img {
                position: absolute;
            }
        }
        .zhong {
            width: 100px;
            height: 100px;
            border: 1px solid #000;
            overflow: hidden;
            position: relative;
            margin-bottom: 10px;
            img {
                position: absolute;
            }
        }
        .xiao {
            width: 60px;
            height: 60px;
            border: 1px solid #000;
            overflow: hidden;
            position: relative;
            img {
                position: absolute;
            }
        }
    }
}
</style>
