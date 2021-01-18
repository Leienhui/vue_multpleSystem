import axios from 'axios';
import querystring from 'querystring';

const mediaHttpInstance = axios.create({
    baseURL: '/api/',
    timeout: 1000
});

export default {
    // 加载汽车
    up(formData) {
        return mediaHttpInstance.post('/up', formData);
    },
    addToDb({ filenamearr, directory }) {
        return mediaHttpInstance.post('/add-to-db', {
            filenamearr,
            directory
        });
    },
    cutpic({ x, y, w, h, rate, filename }) {
        return mediaHttpInstance.get('/cutpic?' + querystring.stringify({
            x, y, w, h, rate, filename
        }));
    }
};