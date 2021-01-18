<template>
    <div class="mytree">
        <h1>Tree组件</h1>

        <p style="margin: 10px 0; font-weight: bold;">您要将这个公告发给谁？</p>

        <Tag
            closable
            v-for="item in tagList"
            :key="item.nodeKey"
            @on-close="closeTag(item.nodeKey)"
        >
            {{ item.info }}
        </Tag>

        <Tree
            :data="treeData"
            :load-data="loadData"
            show-checkbox
            @on-check-change="selectHan"
        ></Tree>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            alreadyChoosedItems: [],
            treeData: [
                {
                    title: "北京总部",
                    loading: false,
                    children: [],
                    lev: 1
                },
                {
                    title: "上海分公司",
                    loading: false,
                    children: [],
                    lev: 1
                },
                {
                    title: "广州分公司",
                    lev: 1
                }
            ]
        };
    },
    methods: {
        loadData(item, callback) {
            console.log("loadData触发了", item);
            // 根据点击的lev决定如何发送请求
            if (item.lev == 1) {
                axios.get("/api/tree?n=" + item.title).then(data => {
                    const arr = data.data.info;
                    callback(
                        arr.map(_item => ({
                            title: _item,
                            children: [],
                            loading: false,
                            // 补充一个额外属性
                            belong: item.title,
                            lev: 2
                        }))
                    );
                });
            } else if (item.lev == 2) {
                axios
                    .get("/api/tree?n=" + item.belong + item.title)
                    .then(data => {
                        const arr = data.data.info;
                        callback(
                            arr.map(_item => ({
                                title: _item,
                                // 补充一个额外属性
                                belong: item.belong + item.title,
                                lev: 3
                            }))
                        );
                    });
            }
        },
        selectHan(alreadyChoosedItems) {
            this.alreadyChoosedItems = alreadyChoosedItems;
        },
        closeTag(v) {
            const theNode = this.DFSfind(v, this.treeData);
            // 引用类型值，可以直接改，是内存中的同一个东西
            theNode.checked = false;
            console.log(theNode);

            this.alreadyChoosedItems = this.alreadyChoosedItems.filter(
                item => item.nodeKey != v
            );
        },
        // 使用深度优先，寻找指定nodeKey
        DFSfind(nodeKey, nodes) {
            // console.log(nodeKey, nodes);
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].nodeKey == nodeKey) return nodes[i];

                if (nodes[i].children && nodes[i].children.length) {
                    return this.DFSfind(nodeKey, nodes[i].children);
                }
            }
        }
    },
    computed: {
        tagList() {
            return this.alreadyChoosedItems.map(item => {
                if (item.lev == 1) {
                    return {
                        info: item.title + "全体",
                        nodeKey: item.nodeKey
                    };
                } else if (item.lev == 2) {
                    return {
                        info: item.belong + item.title,
                        nodeKey: item.nodeKey
                    };
                } else if (item.lev == 3) {
                    return {
                        info: item.title + "（" + item.belong + "）",
                        nodeKey: item.nodeKey
                    };
                }
            });
        }
    }
};
</script>

<style lang="less">
.mytree .ivu-tag {
    background-color: rgb(238, 222, 133);
}
</style>
