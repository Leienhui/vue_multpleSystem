import goodsHttp from '../http/goodsHttp.js';

export default {
    // 命名空间，在组件中使用它的state就是{{$store.state.carStore.xxx}}
    namespaced: true,
    state: {
        products: {},
        shipList: [
            {
                'name': '每日坚果',
                'factory': [
                    { 'factory_name': 'A', 'count': 8 }
                ]
            },
            {
                'name': '混合果仁小包装零食大礼包送礼',
                'factory': [
                    { 'factory_name': 'B', 'count': 3 },
                    { 'factory_name': 'C', 'count': 43 },
                    { 'factory_name': 'F', 'count': 5 },
                    { 'factory_name': 'G', 'count': 2 }
                ]
            }
        ]
    },
    mutations: {
        CHANGEPRODUCTS(state, payloads) {
            state.products = payloads.products;
        },
        // 增加一个货物
        ZENG(state, payloads) {
            state.shipList.push({
                name: payloads.name,
                factory: payloads.factory
            });
        },
        // 修改一个货物
        GAI(state, payloads) {
            // 删fitler改map
            state.shipList = state.shipList.map(item => item.name == payloads.name ? ({
                name: payloads.name,
                factory: payloads.factory
            }) : item);
        }
    },
    actions: {
        async LOADDATA({ commit }) {
            const { products } = await goodsHttp.loadProducts().then(data => data.data);
            console.log(products);
            commit('CHANGEPRODUCTS', { products });
        },
        CHANGELIST({ commit, state }, payloads) {
            // 判断有没有已经存在
            const arr = state.shipList.filter(
                item => item.name == payloads.name
            );

            // 如果没有就是增，有就是改
            if (arr.length == 0) {
                commit('ZENG', {
                    name: payloads.name,
                    factory: payloads.factory
                });
            } else {
                commit('GAI', {
                    name: payloads.name,
                    factory: payloads.factory
                });
            }
        }
    }
};