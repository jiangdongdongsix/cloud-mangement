/**
 * Created by hao.cheng on 2017/5/8.
 */
import React from 'react';
import { getData } from '../../axios';
import { Row, Col, Card, Table, Popconfirm, Button,Icon } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Link, withRouter } from 'react-router-dom';
import hashHistory from './../../history.js'


class ExampleAnimations extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '门店状态',
            dataIndex: 'status',
            width: '10%'
        }, {
            title: '门店名称',
            dataIndex: 'name',
            width: '25%'
        }, {
            title: '门店详细地址',
            dataIndex: 'detailAddress',
            width: '25%'
        }, {
            title: '门店营业时间',
            dataIndex: 'businessHours'
        }, {
            title: '门店详情查看',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    <div>
                        <Button onClick={() => this.onClick(record, index)}>查看详情</Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record, index)}>
                            <Icon type="delete" style={{'fontSize': '18', 'color': '#000', 'paddingLeft': '30'}} />
                        </Popconfirm>
                    </div>
                );
            },
        }];
        this.state = {
            dataSource: [],
            count: '',
            deleteIndex: -1,
            id:''
        }
    }

    onDelete = (record, index) => {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);
        this.setState({ deleteIndex: record.key});
        setTimeout(() => {
            this.setState({ dataSource })
        }, 500);
    };

    onClick = (record,index) => {
        console.log(record);
        console.log(record.key);
        this.setState({
            id:record.key
        });
        hashHistory.push("/app/animation/basicAnimations/"+record.key);
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count+1,
            name: `研华科技公司${count}`,
            businessHours: '09:00:00—23:00:00',
            detailAddress: `西安市科技二路33号 ${count}`,
            status:'离线'
        };
        this.setState({
            dataSource: [newData, ...dataSource],
            count: count + 1,
        });
    };


    componentDidMount() {
        console.log(this.state.id);
        this.start();
    }
    start = () => {
        getData('/iqescloud/restaurant/summaryInfo').then(res => {
            console.log(res);
            let countInit = res.restaurantsSummaryInfo.length;
            this.setState({
                dataSource: [...res.restaurantsSummaryInfo.map(val => {
                    val.key = val.id;
                    val.status = val.state ==='1'?'在线':'离线';
                    return val;
                })],
                count:countInit
            });
            console.log(this.state.dataSource);
        });
    };

    render() {
        const columns = this.columns;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="门店管理" second="门店基本信息" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button className="editable-add-btn mb-s" onClick={this.handleAdd}>新增门店</Button>
                                <Table
                                    bordered
                                    dataSource={this.state.dataSource}
                                    columns={columns}
                                    rowClassName={(record, index) => {
                                        if (this.state.deleteIndex === record.key) return 'animated zoomOutLeft min-black';
                                        return 'animated fadeInRight';
                                    }}
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ExampleAnimations;