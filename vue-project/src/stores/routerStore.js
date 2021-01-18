export default {
    // 命名空间，在组件中使用它的state就是{{$store.state.routerStore.xxx}}
    namespaced: true,
    state: {
        belong: '',
        belongChinese: '',
        selfChinse: ''
    },
    mutations: {
        CHANGEROUTER(state, payloads) {
            state.belong = payloads.meta.belong;
            state.belongChinese = payloads.meta.belongChinese;
            state.selfChinse = payloads.meta.selfChinse;
        }
    }
};