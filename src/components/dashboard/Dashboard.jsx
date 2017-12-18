/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Timeline, Icon,Checkbox,DatePicker,Select,Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import ReactEcharts from 'echarts-for-react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { getAllData,getQueueData,getQuantityData } from '../../axios';

const Option = Select.Option;
const optionPie = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};
class Dashboard extends React.Component {

    state = {
        options:[],
        resId:[],
        date:'',
        barData:[],
        QuantityData:[]
    };

    componentDidMount() {
        this.start();
    };

    start = () => {
        getAllData().then(res => {
            console.log(res.simpleRestaurantList);
            this.setState({
                options:res.simpleRestaurantList
            });
            console.log(this.state.options);
        });
    };


    handleChange = (value)=>{
        console.log(value);
        this.setState({
            resId:value
        });
        console.log(this.state.resId);
    };

    handleTime = (date, dateString)=>{
        console.log(dateString);
        this.setState({
            date:dateString
        })
    };

    handleSure = ()=>{
        console.log(this.state.resId.toString());
        const resId = this.state.resId.toString();
        const date = this.state.date;
        getQueueData(resId,date).then(res => {
            console.log(res.queueTimeContrast);
            this.setState({
                barData: [...res.queueTimeContrast.map(val => {
                    val.小桌 = val.tableTypeQueueTimes[0].queueTime;
                    val.中桌 = val.tableTypeQueueTimes[1].queueTime;
                    val.大桌 = val.tableTypeQueueTimes[2].queueTime;
                    return val;
                })],
            });
            console.log(this.state.barData);
        });

        getQuantityData(resId,date).then(res => {
            console.log(res.queuesContrast);
            this.setState({
                QuantityData:res.queuesContrast
            })
        })
    };

    render() {
        const options = [];
        for (let i = 0; i < this.state.options.length; i++) {
            options.push(<Option style={{'zIndex':'9999'}} key={this.state.options[i].restaurantId}>{this.state.options[i].restaurantName}</Option>);
        }
        const data = [];
        let len = this.state.barData.length;
        for(let i=0;i<len;i++){
            data.push({
                name:this.state.barData[i].restaurantName,
                小桌:this.state.barData[i].小桌,
                中桌:this.state.barData[i].中桌,
                大桌:this.state.barData[i].大桌,
            })
        }

        const QuantityData = [];
        let len1 = this.state.QuantityData.length;
        for(let i=0;i<len1;i++){
            QuantityData.push({
                name:this.state.QuantityData[i].restaurantName,
                排队人数:this.state.QuantityData[i].queueQuantity
            })
        }

        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="跨店排队信息对比" />
                <Card bordered={false}>
                    <Row>
                        <Col className="gutter-row" md={10}>
                            <div className="gutter-box">
                                选择门店
                                <Select mode="tags" placeholder="请选择对比门店" style={{'width':'300px','marginLeft':'10px'}} onChange={this.handleChange}>
                                    {options}
                                </Select>
                            </div>
                        </Col>
                        <Col></Col>
                        <Col className="gutter-row" md={7}>
                            <div className="gutter-box">
                                <div>
                                    选择时间
                                    <DatePicker style={{'marginLeft':'10px'}} onChange={this.handleTime}/>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <Button className="editable-add-btn mb-s" style={{'marginTop':'5px'}} onClick={this.handleSure}>确定</Button>
                        </Col>
                    </Row>
                <Row style={{'marginTop':'20px'}}>
                    <Col className="gutter-row">
                        <div className="gutter-box">
                            <Card bordered>
                                <div className="pb-m">
                                    <h4>顾客排队平均等待时间</h4>
                                </div>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={data}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                                    >
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="小桌" fill="#8884d8" />
                                        <Bar dataKey="中桌" fill="#82ca9d" />
                                        <Bar dataKey="大桌" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered>
                                <div className="pb-m">
                                    <h4>流失率</h4>
                                </div>
                                <ReactEcharts
                                    option={optionPie}
                                    style={{height: '300px', width: '100%'}}
                                    className={'react_for_echarts'}
                                />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={16} style={{'paddingLeft':'8px'}}>
                        <div className="gutter-box">
                            <Card bordered>
                                <div className="pb-m">
                                    <h4>排队人数对比</h4>
                                </div>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={QuantityData}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                                    >
                                        <XAxis />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="1 1" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="排队人数" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </div>
                    </Col>
                </Row>
                </Card>
            </div>
        )
    }
}

export default Dashboard;