import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';
import  Login from '../../components/pages/Login';
import { Form } from 'antd';


const mapStateToPorps = state => {
    const { login } = state.httpData;
    return { login };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

const LoginPage = connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));

export default LoginPage;