<template>
    <div class="layout" @click="clickWrapHandler">
        <Layout :style="{ minHeight: '100vh' }">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu
                    :active-name="$store.state.routerStore.belong"
                    theme="dark"
                    width="auto"
                    :class="menuitemClasses"
                    @on-select="selectMenu"
                >
                    <MenuItem name="car">
                        <span>汽车买卖</span>
                    </MenuItem>
                    <MenuItem name="goods">
                        <span>货物管理</span>
                    </MenuItem>
                    <MenuItem name="manage">
                        <span>系统管理</span>
                    </MenuItem>
                    <MenuItem name="compostudy">
                        <span>组件管理</span>
                    </MenuItem>
                </Menu>
                <div class="menu_box" v-show="isShowMenu" @click.stop="">
                    <ul>
                        <li
                            v-for="item in menus[nowShowMenuName]"
                            :key="item.title"
                            @click="navigateTo(item.link)"
                        >
                            {{ item.title }}
                        </li>
                    </ul>
                </div>
            </Sider>
            <Layout>
                <Header
                    :style="{
                        background: '#fff',
                        boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'
                    }"
                ></Header>
                <Content :style="{ padding: '0 16px 16px' }">
                    <Breadcrumb :style="{ margin: '16px 0' }">
                        <BreadcrumbItem>
                            <router-link to="/index">首页</router-link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            {{ $store.state.routerStore.belongChinese }}
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            {{ $store.state.routerStore.selfChinse }}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <div>
                            <router-view />
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapsed: false,
            isShowMenu: false,
            nowShowMenuName: "",
            menus: {
                car: [
                    {
                        title: "卖车",
                        link: "/car/salecar"
                    },
                    {
                        title: "买车",
                        link: "/car/buycar"
                    }
                ],
                goods: [
                    {
                        title: "发货",
                        link: "/goods/shipments"
                    },
                    {
                        title: "添加新货品",
                        link: "/goods/addnew"
                    }
                ],
                manage: [
                    {
                        title: "媒体库管理",
                        link: "/manage/mediamanage"
                    }
                ],
                compostudy: [
                    {
                        title: "Tree",
                        link: "/compostudy/tree"
                    },
                    {
                        title: "带有验证功能的表单",
                        link: "/compostudy/form"
                    },
                    {
                        title: "步骤条",
                        link: "/compostudy/step"
                    },
                    {
                        title: "穿梭框",
                        link: "/compostudy/trans"
                    },
                    {
                        title: "省市县镇组件",
                        link: "/compostudy/pcas"
                    }
                ]
            }
        };
    },
    computed: {
        menuitemClasses: function() {
            return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
        }
    },
    methods: {
        selectMenu(name) {
            console.log(name);
            // 显示菜单
            this.isShowMenu = true;
            // 当前正在显示的菜单的name
            this.nowShowMenuName = name;
        },
        clickWrapHandler() {
            this.isShowMenu = false;
        },
        navigateTo(link) {
            // 命令路由进行跳转
            this.$router.push(link);
            // 关闭菜单
            this.isShowMenu = false;
        }
    }
};
</script>

<style lang="less" scoped>
.layout-con {
    height: 100%;
    width: 100%;
}
.menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
}
.menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 13px;
}
.collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
}
.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 16px;
}
.ivu-menu-item span {
    font-size: 16px;
}
.menu_box {
    position: fixed;
    left: 200px;
    top: 55px;
    width: 240px;
    height: 100%;
    background-color: rgb(248, 247, 244);
    z-index: 999999;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
    ul {
        @lh: 40px;
        list-style: none;
        li {
            height: @lh;
            line-height: @lh;
            padding-left: 30px;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                color: orange;
            }
        }
    }
}
</style>
