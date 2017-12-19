import {connect} from 'react-redux';
import { Form } from 'antd';
import  AdvancedSearchForm from '../../components/report/SearchForm';

const SearchForm = connect()(Form.create()(AdvancedSearchForm));

export default SearchForm;