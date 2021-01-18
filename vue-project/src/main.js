import Vue from "vue";
import VueRouter from "vue-router";
import vuex from "vuex";
import iviewui from "view-design";
import App from "./App.vue";
import routesConfig from "./routes.js";
import storeConfig from "./stores/store.js";
import PCAS from './components/pcas/PCAS.vue';

Vue.use(VueRouter);
Vue.use(vuex);
Vue.use(iviewui);
Vue.config.productionTip = false;

const router = new VueRouter(routesConfig);
const store = new vuex.Store(storeConfig);

// 定义路由守卫
router.afterEach((to) => {
    // 它不是一个“守门”的作用，就是一个通知组件路由变化的作用
    console.log(to);
    // 因为我们把store拆分掉了，所以这里多了一个斜杠，就是命名空间
    store.commit("routerStore/CHANGEROUTER", { "meta": to.meta });
});

Vue.component('PCAS', PCAS);

new Vue({
    render: h => h(App),
    router,
    store
}).$mount("#app");
