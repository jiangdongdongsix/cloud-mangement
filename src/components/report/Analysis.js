
import React,{Component} from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Row, Col, Form,Card,Table } from 'antd';
import EchartsQueueTime from './EchartsQueueTime';
import SearchForm from './../../containers/report/SearchFormContainers';
import { getShopInfo } from '../../axios';
import moment from 'moment';

import TableTypleCountCharts from './TableTypleCountCharts';
class Analysis extends React.Component{

    state = {
        data: [],
        tableData:[],
        churnData:[]
    };

    componentWillReceiveProps(nextProps) {
        const { timeData: nextAuth = {} } = nextProps;
        console.log(nextAuth.data);
        if (nextAuth.data ) {// 判断是否登陆
            this.setState({
                data:nextAuth.data,
                tableData:nextProps.tableTypeData.data,
                churnData:nextProps.churnData.data
            })
        }
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
                                <SearchForm name="chartData"/>
                                <EchartsQueueTime data={this.state.data} style={{marginTop:'10px'}}/>
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
                                <EchartsQueueTime data={this.state.churnData}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default Analysis;