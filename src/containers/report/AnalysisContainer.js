import {connect} from 'react-redux';
import  Analysis from '../../components/report/Analysis';

const mapStateToPorps = state => {
    const { timeData,tableTypeData,churnData } = state.httpData;
    return { timeData,tableTypeData,churnData };
};

const AnalysisPage = connect(mapStateToPorps)(Analysis);

export default AnalysisPage;