import BuyCar from './views/car/BuyCar.vue';
import SaleCar from './views/car/SaleCar.vue';
import Compare from './views/car/Compare.vue';
import CarInfo from './views/car/CarInfo.vue';
import Shipments from './views/goods/Shipments.vue';
import AddNew from './views/goods/AddNew.vue';
import MediaManage from './views/manage/MediaManage.vue';
import MyTree from './views/compostudy/MyTree.vue';
import MyForm from './views/compostudy/MyForm.vue';
import MyStep from './views/compostudy/MyStep.vue';
import MyTrans from './views/compostudy/MyTrans.vue';
import MyPCAS from './views/compostudy/MyPCAS.vue';
import Index from './views/index/Index.vue';

export default {
    routes: [
        {
            path: '/index',
            component: Index,
            // meta是额外信息的意思
            meta: {
                belong: 'index',
                belongChinese: '首页',
                selfChinse: '首页'
            }
        },
        {
            path: '/car/buycar',
            component: BuyCar,
            // meta是额外信息的意思
            meta: {
                belong: 'car',
                belongChinese: '汽车买卖',
                selfChinse: '买车'
            }
        },
        {
            path: '/car/salecar',
            component: SaleCar,
            // meta是额外信息的意思
            meta: {
                belong: 'car',
                belongChinese: '汽车买卖',
                selfChinse: '卖车'
            }
        },
        {
            path: '/car/compare',
            component: Compare,
            // meta是额外信息的意思
            meta: {
                belong: 'car',
                belongChinese: '汽车对比',
                selfChinse: '买车'
            }
        },
        {
            path: '/car/carinfo/:id',
            component: CarInfo,
            // meta是额外信息的意思
            meta: {
                belong: 'car',
                belongChinese: '卖车',
                selfChinse: '汽车信息'
            }
        },
        {
            path: '/goods/shipments',
            component: Shipments,
            // meta是额外信息的意思
            meta: {
                belong: 'goods',
                belongChinese: '货物管理',
                selfChinse: '发货'
            }
        },
        {
            path: '/goods/addnew',
            component: AddNew,
            // meta是额外信息的意思
            meta: {
                belong: 'goods',
                belongChinese: '货物管理',
                selfChinse: '添加新货品'
            }
        },
        {
            path: '/manage/mediamanage',
            component: MediaManage,
            meta: {
                belong: 'manage',
                belongChinese: '系统管理',
                selfChinse: '媒体库管理'
            }
        },
        {
            path: '/compostudy/tree',
            component: MyTree,
            meta: {
                belong: 'compostudy',
                belongChinese: '组件',
                selfChinse: 'Tree组件'
            }
        },
        {
            path: '/compostudy/form',
            component: MyForm,
            meta: {
                belong: 'compostudy',
                belongChinese: '组件',
                selfChinse: '带有验证功能的表单'
            }
        },
        {
            path: '/compostudy/step',
            component: MyStep,
            meta: {
                belong: 'compostudy',
                belongChinese: '组件',
                selfChinse: '步骤条'
            }
        },
        {
            path: '/compostudy/trans',
            component: MyTrans,
            meta: {
                belong: 'compostudy',
                belongChinese: '组件',
                selfChinse: '穿梭框'
            }
        },
        {
            path: '/compostudy/pcas',
            component: MyPCAS,
            meta: {
                belong: 'compostudy',
                belongChinese: '组件',
                selfChinse: '省市县镇组件'
            }
        },
        {
            path: '*',
            redirect: '/index'
        }
    ]
};
