import {connect} from 'react-redux';
import  DetailInfo from '../../components/dashboard/StoreDetailInfo';

const mapStateToPorps = state => {
    const { detailData } = state.httpData;
    return { detailData };
};

const DetailInfoPage = connect(mapStateToPorps)(DetailInfo);

export default DetailInfoPage;