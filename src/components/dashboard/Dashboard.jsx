/**
 * Created by hao.cheng on 2017/5/3.
 */
import React,{PropTypes} from 'react';
import { Row, Col, Card, Timeline, Icon,Checkbox,DatePicker,Select,Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import ReactEcharts from 'echarts-for-react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,PieChart, Pie} from 'recharts';
import { getData } from '../../axios';


const Option = Select.Option;

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
        getData('/iqescloud/restaurant/simple').then(res => {
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
        getData('/iqescloud/queueInfo/manyRestaurants/chart/averageQueueTime?restaurantIds='+resId+'&date='+date).then(res => {
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

        getData('/iqescloud/queueInfo/manyRestaurants/chart/queues?restaurantIds='+resId+'&date='+date).then(res => {
            console.log(res.queuesContrast);
            this.setState({
                QuantityData:res.queuesContrast
            })
        });

        getData('/iqescloud/queueInfo/manyRestaurants/chart/churnRate?restaurantIds='+resId+'&date='+date).then(res =>{
            console.log(res);
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

        const RateData = [];


        const data02 = [
            {name: 'Group A', value: 2400},
            {name: 'Group B', value: 4567},
            {name: 'Group C', value: 1398},
            {name: 'Group D', value: 9800},
            {name: 'Group E', value: 3908},
            {name: 'Group F', value: 4800}
            ];

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
                                <PieChart width={400} height={300}>
                                    <Pie data={data02} cx={120} cy={100} innerRadius={50} outerRadius={100} fill="#82ca9d"/>
                                    <Tooltip/>
                                </PieChart>
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
                                        <XAxis dataKey="name" />
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