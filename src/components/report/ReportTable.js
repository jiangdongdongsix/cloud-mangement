
import React, {Component} from 'react';
import { Row, Col, Form,Card,Table } from 'antd';
import SearchForm from './../../containers/report/SearchFormContainers';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getShopInfo } from '../../axios';
import moment from 'moment';


const columns = [{
    title: '用户名',
    dataIndex: 'customerName',
    width: 50,
}, {
    title: '手机号',
    dataIndex: 'customerTel',
    width: 80
}, {
    title: '抽号时间',
    dataIndex: 'queueStartTime',
    width: 50
}, {
    title: '入座时间',
    dataIndex: 'queueEndTime',
    width: 50
},{
    title: '等待时间',
    dataIndex: 'queueTime',
    width: 50
},{
    title: '选桌类型',
    dataIndex: 'tableTypeDescribe',
    width: 50
},{
    title: '就餐人数',
    dataIndex: 'eatNumber',
    width: 50
},{
    title: '自选座位',
    dataIndex: 'seatFlag',
    width: 50,
    render: (text, record) => <div>{text ? "是" : "否"}</div>
},{
    title: '就餐位置',
    dataIndex: 'tableNumber',
    width: 50
}
];

class ReportTable extends React.Component {
    state = {
        data:[]
    };

    componentWillMount() {
        const { tableData } = this.props;
    }

    componentWillReceiveProps(nextProps) {
        const { tableData: nextAuth = {} } = nextProps;
        if (nextAuth.data && nextAuth.data.queueInfos) {   // 判断是否登陆
           this.setState({
               data:nextAuth.data.queueInfos
        })
        }
    }

    render(){
        return(
            <div className="gutter-example">
                <BreadcrumbCustom first="报表" second="单店报表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="单店报表" bordered={false} className="card-box">
                                <SearchForm name="tableData"/>
                                <Table columns={columns} dataSource={this.state.data} style={{marginTop:'10px'}}/>
                            </Card>
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default ReportTable;