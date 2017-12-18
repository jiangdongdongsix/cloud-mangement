
import React,{Component} from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Row, Col, Form,Card,Table } from 'antd';
import EchartsQueueTime from './EchartsQueueTime';
import AdvancedSearchForm from './SearchForm';
import { getShopInfo } from '../../axios';
import moment from 'moment';
import RechartsRadialBarChart from '../charts/RechartsRadialBarChart';
import RechartsRadarChart from '../charts/RechartsRadarChart';
import TableTypleCountCharts from './TableTypleCountCharts';
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
class Analysis extends React.Component{

    state = {
        data: [],
        tableData:[]
    };
    componentDidMount() {
        this.start("1","2017-12-12");
    }

    start = (id,date) => {
        this.setState({ loading: true });
        getShopInfo("/iqescloud/queueInfo/oneRestaurant/chart/averageQueueTime?restaurantId="+id+"&date="+date).then(res => {
            console.log(res);
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
            this.setState({
                data: d
            });
        });

        getShopInfo("/iqescloud/queueInfo/oneRestaurant/chart/tableTypePercentage?restaurantId="+id).then(res => {
            console.log(res);
            let d = [];
            res.tableTypePercentageList.map((val,index) => {
                let info = {
                    key:index,
                    name:val.tableTypeDescribe,
                    value:val.number

                }
                d.push(info);
            })
            this.setState({
               tableData:d
            });
        });

    };

    getSearchInfo = (id,date) => {
        console.log(id);
        console.log(date);
        this.start(id,date);
    }
    render(){
        const dateFormat = 'YYYY-MM-DD';
        let date = moment("2017-12-12",dateFormat);
        return(
            <div className="gutter-example">
                <BreadcrumbCustom first="报表" second="单店数据分析" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="门店排队时间走势图" bordered={false} className="card-box">
                               <WrappedAdvancedSearchForm  getSearchInfo={this.getSearchInfo} id ="1" date={date}/>
                                <EchartsQueueTime data={this.state.data}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="桌型对比图" bordered={false}>
                                <TableTypleCountCharts data = {this.state.tableData}/>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="流失率走势图" bordered={false}>
                                <RechartsRadarChart />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default Analysis;