
import React, {Component} from 'react';
import { Row, Col, Form,Card,Table } from 'antd';
import AdvancedSearchForm from './SearchForm';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getShopInfo } from '../../axios';
import moment from 'moment';
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

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
        selectedRowKeys: [],  // Check here to configure the default column
        data: []
    };

    componentDidMount() {
        this.start("1",moment().format("YYYY-MM-DD"));
    }
    start = (id,date) => {
        this.setState({ loading: true });
        getShopInfo("/iqescloud/queueInfo/oneRestaurant/table?restaurantId="+id+"&date="+date).then(res => {
            console.log("6666");
            console.log(res);
            this.setState({
                data: [...res.queueInfos.map((val,index) => {
                    val.key = index;
                    return val;
                })],
                loading: false
            });
        });
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    getSearchInfo = (id,date) => {
        console.log(id);
        console.log(date);
        this.start(id,date);
    }

    render(){
        const { selectedRowKeys } = this.state;
        const dateFormat = 'YYYY-MM-DD';
        let date = moment(new Date(),dateFormat);
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <div className="gutter-example">
                <BreadcrumbCustom first="报表" second="单店报表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="单店报表" bordered={false} className="card-box">
                                <WrappedAdvancedSearchForm  getSearchInfo={this.getSearchInfo} id ="1" date={date}/>
                                <Table columns={columns} dataSource={this.state.data} />
                            </Card>
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default ReportTable;