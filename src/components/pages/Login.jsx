/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';
import history from '../../history';

const FormItem = Form.Item;

class Login extends React.Component {
    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'login');
    }
    componentWillReceiveProps(nextProps) {
        const { login: nextAuth = {} } = nextProps;
        if (nextAuth.data) {   // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/app/dashboard/basic');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { fetchData } = this.props;
                fetchData({funcName: 'login',params:{account:values.userName,pwd:values.password} ,stateName: 'login'});
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-logo">
                    <h1>智能排队叫号系统云端管理</h1>
                    <h2>Queuing management cloud services</h2>
                </div>
                <div className="login-form" >
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '500px',width:'70%'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                            <Button  htmlType="submit" type="primary" style={{ width: '100%'}}>
                                登录
                            </Button>

                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
