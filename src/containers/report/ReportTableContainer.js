import {connect} from 'react-redux';
import  ReportTable from '../../components/report/ReportTable';

const mapStateToPorps = state => {
    const { tableData } = state.httpData;
    return { tableData };
};

const ReportTablePage = connect(mapStateToPorps)(ReportTable);

export default ReportTablePage;