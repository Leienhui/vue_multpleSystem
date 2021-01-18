import axios from 'axios';
import querystring from 'querystring';

const carHttpInstance = axios.create({
    baseURL: 'http://www.aiqianduan.com:56506/',
    timeout: 1000
});

export default {
    // 加载汽车
    loadCar({ page, pagesize, color, exhaust, fuel, engine, brand, series }) {
        return carHttpInstance.get('/cars?' + querystring.stringify({
            page, pagesize, color, exhaust, fuel, engine, brand, series
        }));
    },
    loadAllBS() {
        return carHttpInstance.get('/allbs');
    },
    loadInfo(id) {
        return carHttpInstance.get('/car/' + id);
    }
};