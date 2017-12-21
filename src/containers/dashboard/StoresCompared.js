import {connect} from 'react-redux';
import  ComparedInfo from '../../components/dashboard/StoresCompared';

const mapStateToPorps = state => {
    const { BarData,QuantityData,RateData} = state.httpData;
    return { BarData,QuantityData,RateData};
};

const ComparedInfoPage = connect(mapStateToPorps)(ComparedInfo);

export default ComparedInfoPage;