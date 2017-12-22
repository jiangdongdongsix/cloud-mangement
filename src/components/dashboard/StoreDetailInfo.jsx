/**
 * Created by hao.cheng on 2017/5/8.
 */
import React from 'react';
import { Row, Col, Card, Switch,Button,Input } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getData } from '../../axios/index';
import { Link, withRouter } from 'react-router-dom';
import img from '../../style/imgs/u215.png';
import {getDetailInfo} from "../../axios/index";
import {fetchData} from "../../action/index";


class BasicAnimations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailData: {},
            tableTypes: [],
            id : props.match.params.id,
        };
    }
    componentDidMount() {
        this.start();
    }

    start = () => {
        const { dispatch } = this.props;
        dispatch(fetchData({funcName: 'getDetailInfo',params:this.props.match.params.id,stateName:'detailData'}));
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const { detailData } = nextProps;
        console.log(detailData.data);
        this.setState({
            detailData:detailData.data,
            tableTypes:detailData.data.tableTypes
        })
    }

    render() {
        const tableElements=[];      //保存渲染以后 JSX的数组
        if(this.state.tableTypes){
            for(let table of this.state.tableTypes){
                tableElements.push(
                    <div style={{'paddingBottom':'10px'}}>
                        <Input type='text' value={table.describe+`(`+ table.eatMinNumber+`-`+table.eatMaxNumber+`人)`+table.quantity+'桌'}/>
                    </div>
                )
            }
        }

        return (
            <div className="gutter-example button-demo">
                <h3 style={{'padding':'10px'}}>{this.state.detailData.name}</h3>
                <Card bordered={false}>
                    <Row className="mb-m">
                        <Button style={{'marginLeft':'90%'}}><Link to={'/app/dashboard/basic'}>返回首页</Link></Button>
                    </Row>
                    <Row style={{'marginBottom':'20px','marginTop':'10px'}}>
                        <Col span={10}>
                            <Row>
                                <Col span={8}>
                                    <span>门店名称</span>
                                </Col>
                                <Col span={14}>
                                    <Input type='text' value={this.state.detailData.name}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4}></Col>
                        <Col span={10}>
                            <Row>
                                <Col span={5}>
                                    <span>营业时间</span>
                                </Col>
                                <Col span={14}>
                                    <Input type='text' value={this.state.detailData.businessHours}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{'marginBottom':'20px'}}>
                        <Col span={10}>
                            <Row>
                                <Col span={8}>
                                    <span>门店详细地址</span>
                                </Col>
                                <Col span={14}>
                                    <Input type='text' value={this.state.detailData.detailAddress}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4}></Col>
                        <Col span={10}>
                            <Row>
                                <Col span={5}>
                                    <span>门店电话</span>
                                </Col>
                                <Col span={14}>
                                    <Input type='text' value={this.state.detailData.telephone}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{'marginBottom':'20px'}}>
                        <Col span={10}>
                            <Row>
                                <Col span={8}>
                                    <span>门店桌类型以及桌数</span>
                                </Col>
                                <Col span={14}>
                                    {tableElements}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{'borderTop':'1px solid #797979','paddingTop':'10px'}}>
                        <Col>
                            <h4>门店平面图</h4>
                        </Col>
                        <img src={img} width='100%' />
                    </Row>
                </Card>

            </div>
        )
    }
}

export default BasicAnimations;