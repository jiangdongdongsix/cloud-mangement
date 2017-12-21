
import React, {Component} from 'react';
import { Form, Row, Col, Input, Button, Select, DatePicker, } from 'antd';
import moment from 'moment';
import { fetchData, receiveData } from '../../action/index';
const FormItem = Form.Item;
const Option = Select.Option;

class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
    };


    componentWillMount() {
        const { name } = this.props;
        console.log(this.props);
        const { dispatch } = this.props;
        console.log(name);
        if(name == 'tableData'){
            console.log("88888");
            dispatch(fetchData({funcName: 'getTableData',params:{id:'1',date:moment().format("YYYY-MM-DD")} ,stateName: 'tableData'}))
        }else{
            dispatch(fetchData({funcName: 'averageQueueTime',params:{id:'1',date:moment().format("YYYY-MM-DD")} ,stateName: 'timeData'}))
            dispatch(fetchData({funcName: 'tableTypePercentage',params:{id:'1',date:moment().format("YYYY-MM-DD")} ,stateName: 'tableTypeData'}))
            dispatch(fetchData({funcName: 'churnRate',params:{id:'1',date:moment().format("YYYY-MM-DD")} ,stateName: 'churnData'}))
        }
    }


    handleSearch = (e) => {
        const { dispatch } = this.props;
        const { name } = this.props;
        console.log(this.props);
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(! err){
                if(name == 'tableData'){
                    dispatch(fetchData({funcName: 'getTableData',params:{id:values.restaurantId,date:values.date.format("YYYY-MM-DD")} ,stateName: 'tableData'}))
                }else {
                    dispatch(fetchData({funcName: 'averageQueueTime',params:{id:values.restaurantId,date:values.date.format("YYYY-MM-DD")} ,stateName: 'timeData'}))
                    dispatch(fetchData({funcName: 'tableTypePercentage',params:{id:values.restaurantId,date:values.date.format("YYYY-MM-DD")} ,stateName: 'tableTypeData'}))
                    dispatch(fetchData({funcName: 'churnRate',params:{id:values.restaurantId,date:values.date.format("YYYY-MM-DD")} ,stateName: 'churnData'}))
                }
            }

        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Form
                    layout="inline"
                    onSubmit={this.handleSearch}
                >
                    <FormItem label={`选择门店`}>
                        {getFieldDecorator(`restaurantId`,{
                            initialValue:'1',
                            rules: [{ required: true, message: '请选择门店' }],
                        })(
                            <Select  style={{ width: 120 }}  onChange={this.handleSelectChange}>
                                <Option value="1">软件园店</Option>
                                <Option value="2">金花店</Option>
                                <Option value="3">钟楼店</Option>
                                <Option value="4">小寨店</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label={`选取时间`}>
                        {getFieldDecorator(`date`,{
                            initialValue:moment(),
                            rules: [{ required: true, message: '请选取时间' }],
                        })(
                            <DatePicker format="YYYY-MM-DD"  style={{ width: 120 }} />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            搜索
                        </Button>
                    </FormItem>

                </Form>
            </Row>

        );
    }
}

export default AdvancedSearchForm;