import {connect} from 'react-redux';
import  BasicInfo from '../../components/dashboard/StoreBasicInfo';

const mapStateToPorps = state => {
    const { dataSource } = state.httpData;
    return { dataSource };
};

const BasicInfoPage = connect(mapStateToPorps)(BasicInfo);

export default BasicInfoPage;