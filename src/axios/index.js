/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get } from './tools';
import * as config from './config';

export const getPros = () => axios.get('/iqescloud/restaurant/summaryInfo').then(function (response) {
    return response;
    console.log('1111');
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

//门店基本信息
export const getData = () => axios.get('/iqescloud/restaurant/summaryInfo').then(function (response) {
    console.log(response.data);
    return response.data;
}).catch(function (error) {
    console.log(error);
});

//门店详细信息
export const getDataId = (id) => axios.get('/iqescloud/restaurant/detailedInfo/id?id=4').then(function (response) {
    console.log(response.data);
    return response.data;
}).catch(function (error) {
    console.log(error);
});


export const getShopInfo = (url) => axios.get(url).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});


//多店对比获得所有门店
export const getAllData = () => axios.get('/iqescloud/restaurant/simple').then(function (response) {
    console.log(response.data);
    return response.data;
}).catch(function (error) {
    console.log(error);
});

//多店对比
export const getQueueData = (restaurantIds,date) => axios.get('/iqescloud/queueInfo/manyRestaurants/chart/averageQueueTime?restaurantIds='+restaurantIds+'&date='+date).then(function (response) {
    console.log(response.data);
    return response.data;
}).catch(function (error) {
    console.log(error);
});


export const getQuantityData = (restaurantIds,date) => axios.get('/iqescloud/queueInfo/manyRestaurants/chart/queues?restaurantIds='+restaurantIds+'&date='+date).then(function (response) {
    console.log(response.data);
    return response.data;
}).catch(function (error) {
    console.log(error);
});