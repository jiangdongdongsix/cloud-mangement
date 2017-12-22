/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get } from './tools';
import * as config from './config';

export const getPros = () => axios.get('/iqescloud/restaurant/summaryInfo').then(function (response) {
    return response;
}).catch(function (error) {
    console.log(error);
});


export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

const GIT_OAUTH = 'https://github.com/login/oauth';
export const gitOauthLogin = () => axios.get(`${GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`);
export const gitOauthToken = code => axios.post('https://cors-anywhere.herokuapp.com/' + GIT_OAUTH + '/access_token', {...{client_id: '792cdcd244e98dcd2dee',
    client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059', redirect_uri: 'http://localhost:3006/', state: 'reactAdmin'}, code: code}, {headers: {Accept: 'application/json'}})
    .then(res => res.data).catch(err => console.log(err));
export const gitOauthInfo = access_token => axios({
    method: 'get',
    url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({url: config.MOCK_AUTH_ADMIN});

// 访问权限获取
export const guest = () => get({url: config.MOCK_AUTH_VISITOR});

// 登录
export const login = (params) => axios.post('/iqescloud/login', {
    account: params.account,
    pwd: params.pwd,
}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

// 获取单店报表表格数据
export const getTableData = (params) => axios.get("/iqescloud/queueInfo/oneRestaurant/table?restaurantId="+params.id+"&date="+params.date).then(function (response) {
    let res = response.data;
    res.queueInfos.map((val,index) => {
        val.key = index;
        return val;
    });
    console.log(res);
    return res;

}).catch(function (error) {
    console.log(error);
    console.log("数据解析出错");
});

//获取平均时间
export const averageQueueTime = (params) => axios.get("/iqescloud/queueInfo/oneRestaurant/chart/averageQueueTime?restaurantId="+params.id+"&date="+params.date).then(function (response) {
    let res = response.data
    let d = [];
    res.averageQueueTime.map((val,index) => {
        let info = {
            key:index,
            name:val.date,
            "小桌":val.tableTypeQueueTimePOJOList[0].queueTime,
            "中桌":val.tableTypeQueueTimePOJOList[1].queueTime,
            "大桌":val.tableTypeQueueTimePOJOList[2].queueTime
        }
        d.push(info);
    })
    return d;
}).catch(function (error) {
    console.log(error);
});


//获取平均时间
export const tableTypePercentage = (params) => axios.get("/iqescloud/queueInfo/oneRestaurant/chart/tableTypePercentage?restaurantId="+params.id).then(function (response) {
    let res= response.data;
    let d = [];
    res.tableTypePercentageList.map((val,index) => {
        let info = {
            name:val.tableTypeDescribe,
            value:val.number

        }
        d.push(info);
    })
    return d;
}).catch(function (error) {
    console.log(error);
});

//获取流失率
export const churnRate = (params) => axios.get("/iqescloud/queueInfo/oneRestaurant/chart/churnRate?restaurantId="+params.id).then(function (response) {
    let res = response.data;
    let d = [];
    res.churnRateList.map((val,index) => {
        console.log(val.tableTypeChurnRatePOJOList);
        let info = {
            key:index,
            name:val.queueTime,
            "小桌":val.tableTypeChurnRatePOJOList[0].churnRate,
            "中桌":val.tableTypeChurnRatePOJOList[1].churnRate,
            "大桌":val.tableTypeChurnRatePOJOList[2].churnRate
        }
        d.push(info);
    })
    return d;
}).catch(function (error) {
    console.log(error);
});




export const getShopInfo = (url) => axios.get(url).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});


export const getData = (url) => axios.get(url).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

//门店基本信息
export const getBasicInfo = (params)=>axios.get('/iqescloud/restaurant/summaryInfo').then(function (response) {
    let res = response.data;
    let data = [];
    res.restaurantsSummaryInfo.map(val => {
            val.key = val.id;
            val.status = val.state === '1' ? '在线' : '离线';
            data.push(val);
        },
    );
    return data;
}).catch(function(err){
    console.log(err);
});

//门店详细信息
export const getDetailInfo = (params)=>axios.get('/iqescloud/restaurant/detailedInfo/id?id='+params).then(function (response) {
    let res = response.data;
    let data = {};
    data = res.restaurantDetailInfo;
    return data;
}).catch(function(err){
    console.log(err);
});

//等待时间
export const BarData = (params)=>axios.get('/iqescloud/queueInfo/manyRestaurants/chart/averageQueueTime?restaurantIds='+params.id+'&date='+params.date).then(function(response){
    let res = response.data;
    let data = res.queueTimeContrast.map(val =>{
        val.小桌 = val.tableTypeQueueTimes[0].queueTime;
        val.中桌 = val.tableTypeQueueTimes[1].queueTime;
        val.大桌 = val.tableTypeQueueTimes[2].queueTime;
        return val;
    });
    console.log(data);
    return data;
}).catch(function(err){
    console.log(err);
});

//排队人数
export const QuantityData = (params)=>axios.get('/iqescloud/queueInfo/manyRestaurants/chart/queues?restaurantIds='+params.id+'&date='+params.date).then(function(response){
    let res = response.data;
    let QuantityData = res.queuesContrast;
    return QuantityData;
}).catch(function(err){
    console.log(err);
});

//流失率
export const RateData = (params)=>axios.get('/iqescloud/queueInfo/manyRestaurants/chart/churnRate?restaurantIds='+params.id+'&date='+params.date).then(function(response){
    let res = response.data;
    let RateData = res.churnRateContrast;
    return RateData;
}).catch(function(err){
    console.log(err);
});




