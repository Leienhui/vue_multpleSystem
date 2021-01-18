import axios from 'axios';

const goodsHttpInstance = axios.create({
    baseURL: 'http://www.aiqianduan.com:56506/',
    timeout: 1000
});

export default {
    // 加载汽车
    loadProducts() {
        return goodsHttpInstance.get('/product');
    }
};