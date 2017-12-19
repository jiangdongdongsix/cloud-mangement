import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import LoginPage from './containers/pages/LoginContainers';
import App from './App';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={LoginPage} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)