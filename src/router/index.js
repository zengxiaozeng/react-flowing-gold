import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '@/pages/Login';
import IndexLayout from '@/components/Layout/index';
import ErrorPage from '@/pages/ErrorPage';
import PrivateRoute from '@/components/PrivateRoute';

export default class ZJRouter extends Component {
	render() {
		return (
            <Switch>
                <PrivateRoute path="/" component={ IndexLayout } />
                <Route exact path="/login" component={ Login }></Route>
                <Route component={ ErrorPage } />
            </Switch>
	    )
	}
}
