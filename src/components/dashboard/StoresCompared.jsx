import React from 'react';
import { Row, Col, Card,DatePicker,Select,Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getData } from '../../axios';
import  RechartsBar from './RechartsBar';
import RechartsPie from './RechartsPie';
import RechartsBarSingle from './RechartsBarSingle';
import {fetchData} from "../../action/index";
import {BarData,QuantityData,RateData} from "../../axios/index";


const Option = Select.Option;

class ComparedInfo extends React.Component {
    state = {
        options:[],
        resId:[],
        date:'',
        BarData:[],
        QuantityData:[],
        RateData:[]
    };

    componentDidMount() {
        this.start();
    };

    start = () => {
        getData('/iqescloud/restaurant/simple').then(res => {
            this.setState({
                options:res.simpleRestaurantList
            });
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
        this.setState({
            date:dateString
        })
    };

    handleSure = ()=>{
        const resId = this.state.resId.toString();
        const date = this.state.date;
        const { dispatch } = this.props;
        dispatch(fetchData({funcName: 'BarData',params:{id:resId,date:date},stateName:'BarData'}));
        dispatch(fetchData({funcName: 'QuantityData',params:{id:resId,date:date},stateName:'QuantityData'}));
        dispatch(fetchData({funcName: 'RateData',params:{id:resId,date:date},stateName:'RateData'}));
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(this.state.resId && this.state.date){
            this.setState({
                BarData:nextProps.BarData.data,
                QuantityData:nextProps.QuantityData.data,
                RateData:nextProps.RateData.data
            })
        }

    }

    render() {
        const options = [];
        for (let i = 0; i < this.state.options.length; i++) {
            options.push(<Option style={{'zIndex':'9999'}} key={this.state.options[i].restaurantId}>{this.state.options[i].restaurantName}</Option>);
        }
        const data = [];
        if(this.state.BarData){
            let len = this.state.BarData.length;
            for(let i=0;i<len;i++){
                data.push({
                    name:this.state.BarData[i].restaurantName,
                    小桌:this.state.BarData[i].小桌,
                    中桌:this.state.BarData[i].中桌,
                    大桌:this.state.BarData[i].大桌,
                })
            }
        }


        const QuantityData = [];
        if(this.state.QuantityData){
            let len1 = this.state.QuantityData.length;
            for(let i=0;i<len1;i++){
                QuantityData.push({
                    name:this.state.QuantityData[i].restaurantName,
                    排队人数:this.state.QuantityData[i].queueQuantity
                })
            }
        }


        const RateData = [];
        if(this.state.RateData){
            let len2 = this.state.RateData.length;
            for(let i=0;i<len2;i++){
                RateData.push({
                    name:this.state.RateData[i].restaurantName,
                    value:this.state.RateData[i].rate
                })
            }
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
                                    <DatePicker style={{'marginLeft':'10px'}} onChange={this.handleTime} required/>
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
                                <RechartsBar data={data} />
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
                                <RechartsPie data={RateData} />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={16} style={{'paddingLeft':'8px'}}>
                        <div className="gutter-box">
                            <Card bordered>
                                <div className="pb-m">
                                    <h4>排队人数对比</h4>
                                </div>
                                <RechartsBarSingle data={QuantityData}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
                </Card>
            </div>
        )
    }
}

export default ComparedInfo;