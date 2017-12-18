
import React, {Component} from 'react';
import { Form, Row, Col, Input, Button, Select, DatePicker, } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
    };

    handleSearch = (e) => {
        const that = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(! err){
                console.log('Received values of form: ', values);
                console.log(values.date.format("YYYY-MM-DD"))
                that.props.getSearchInfo(values.restaurantId,values.date.format("YYYY-MM-DD"));

            }

        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    // To generate mock Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 2;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        const dateFormat = 'YYYY-MM-DD';
        children.push(
            <Col span={4} key={1} >
                <FormItem label={`选择门店`}>
                    {getFieldDecorator(`restaurantId`,{
                        initialValue:this.props.id,
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
            </Col>
        )
        children.push(
            <Col span={4} key={2}>
                <FormItem label={`选取时间`}>
                    {getFieldDecorator(`date`,{
                        initialValue:this.props.date,
                        rules: [{ required: true, message: '请选取时间' }],
                    })(
                        <DatePicker format="YYYY-MM-DD"  style={{ width: 120 }} />
                    )}
                </FormItem>
            </Col>
        )

        children.push(
            <Button type="primary"  htmlType="submit" >搜索</Button>
        )

        return children;
    }

    render() {
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>{this.getFields()}</Row>
            </Form>
        );
    }
}

export default AdvancedSearchForm;