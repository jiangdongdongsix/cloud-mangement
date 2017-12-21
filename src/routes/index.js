/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/StoresCompared';
import BasicAnimations from '../components/dashboard/StoreDetailInfo';
import ExampleAnimations from '../components/dashboard/StoreBasicInfo';
import Wysiwyg from 'bundle-loader?lazy!../components/ui/Wysiwyg';  // 按需加载富文本配置
import Bundle from '../components/widget/Bundle';
import BasicInfoPage from './../containers/dashboard/StoreBasicInfo';
import DetailInfoPage from './../containers/dashboard/StoreDetailInfo';
import ComparedInfoPage from './../containers/dashboard/StoresCompared';
import ReportTablePage from '../containers/report/ReportTableContainer';
import AnalysisPage from '../containers/report/AnalysisContainer';


const WysiwygBundle = (props) => (
    <Bundle load={Wysiwyg}>
        {(Component) => <Component {...props} />}
    </Bundle>
);

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} push />;
        return component;
    };
    render() {
        return (
            <Switch>
                <Route exact path="/app/dashboard/basic" component={BasicInfoPage} />
                <Route exact path="/app/dashboard/detail/:id" component={DetailInfoPage} />
                <Route exact path="/app/dashboard/compared" component={ComparedInfoPage} />

                <Route exact path="/app/report/table" component = {ReportTablePage} />
                <Route exact path="/app/report/analysis" component = {AnalysisPage} />

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}