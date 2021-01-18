import carHttp from '../http/carHttp.js';
export default {
    // 命名空间，在组件中使用它的state就是{{$store.state.carStore.xxx}}
    namespaced: true,
    state: {
        // 当前页
        page: 1,
        // 当前每页几条
        pagesize: 10,
        // 总数
        total: 0,
        // 结果数组
        results: [],
        // 当前的筛选条件
        color: [],
        exhaust: [],
        fuel: [],
        engine: [],
        // 所有品牌和车系
        allbs: [],
        // 当前筛选的品牌、车系
        brand: '',
        series: '',
        // 当前正在对比的车辆
        nowCompared: []
    },
    mutations: {
        // 改变results
        CHANGERESULTS(state, payloads) {
            state.results = payloads.results;
        },
        // 改变page
        CHANGEPAGE(state, payloads) {
            state.page = payloads.page;
        },
        // 改变total
        CHANGETOTAL(state, payloads) {
            state.total = payloads.total;
        },
        // 改变pagesize
        CHANGEPAGESIZE(state, payloads) {
            state.pagesize = payloads.pagesize;
        },
        // 改变过滤器
        CHANGEFILTER(state, payloads) {
            state[payloads.k] = payloads.v;
        },
        // 改变allbs
        CHANGEALLBS(state, payloads) {
            state.allbs = payloads.allbs;
        },
        // 改变brand
        CHANGEBRAND(state, payloads) {
            state.brand = payloads.brand;
        },
        // 改变series车系
        CHANGESERIES(state, payloads) {
            state.series = payloads.series;
        },
        // 增加对比
        ADDCOMPARE(state, payloads) {
            state.nowCompared.push(payloads.carinfo);
        },
        // 移除对比
        REMOVECOMPARE(state, payloads) {
            state.nowCompared = state.nowCompared.filter(item => item.id != payloads.id);
        },
        // 清空对比
        CLEARCOMPARE(state) {
            state.nowCompared = [];
        }
    },
    actions: {
        // 拉取数据
        async LOADDATA({ commit, state }) {
            // 发出Ajax
            const { results, total } = await carHttp.loadCar({
                page: state.page,
                pagesize: state.pagesize,
                color: state.color.join('v'),
                exhaust: state.exhaust.join('v'),
                fuel: state.fuel.join('v'),
                engine: state.engine.join('v'),
                brand: state.brand,
                series: state.series
            }).then(data => data.data);
            // 上跳。就是说，只有mutations中能够改变state
            commit('CHANGERESULTS', { results });
            commit('CHANGETOTAL', { total });
        },
        // 拉取数据
        async LOADALLBS({ commit }) {
            // 发出Ajax
            const allbs = await carHttp.loadAllBS().then(data => data.data);
            // 上跳。就是说，只有mutations中能够改变state
            commit('CHANGEALLBS', { allbs });
        },
        // 改变页码
        CHANGEPAGE({ commit, dispatch }, payloads) {
            // 真正的改state中的page属性
            commit('CHANGEPAGE', { page: payloads.page });
            // 发出Ajax
            dispatch('LOADDATA');
        },
        // 改变每页几条
        CHANGEPAGESIZE({ commit, dispatch }, payloads) {
            // 当改变pagesize的时候，page要归1
            commit('CHANGEPAGE', { page: 1 });
            // 真正的改变pagesize
            commit('CHANGEPAGESIZE', { pagesize: payloads.pagesize });
            // 发出Ajax
            dispatch('LOADDATA');
        },
        CHANGEFILTER({ commit, dispatch }, payloads) {
            // 当改变过滤器的时候，page要归1
            commit('CHANGEPAGE', { page: 1 });
            // 真正的改变过滤器
            commit('CHANGEFILTER', { k: payloads.k, v: payloads.v });
            // 发出Ajax
            dispatch('LOADDATA');
        },
        // 改变品牌
        CHANGEBRAND({ commit, dispatch }, payloads) {
            // 当改变过滤器的时候，page要归1
            commit('CHANGEPAGE', { page: 1 });
            // 当更改品牌的时候，车系一定要变为空
            commit('CHANGESERIES', { series: '' });
            // 真正的改变过滤器
            commit('CHANGEBRAND', { brand: payloads.brand });
            // 发出Ajax
            dispatch('LOADDATA');
        },
        // 改变车系
        CHANGESERIES({ commit, dispatch }, payloads) {
            // 当改变过滤器的时候，page要归1
            commit('CHANGEPAGE', { page: 1 });
            // 真正的改变过滤器
            commit('CHANGESERIES', { series: payloads.series });
            // 发出Ajax
            dispatch('LOADDATA');
        }
    }
};