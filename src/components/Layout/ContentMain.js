import React, { Component } from 'react'
import { withRouter, Switch, Redirect, Route } from 'react-router-dom'
import LoadableComponent from '@/utils/LoadableComponent'
import PrivateRoute from '@/components/PrivateRoute'

const Apply = LoadableComponent(()=>import(/* webpackChunkName: "apply" */ '@/pages/Apply'))
const Case = LoadableComponent(()=>import(/* webpackChunkName: "case" */ '@/pages/Case'))

@withRouter
class ContentMain extends Component {
    render () {
        return (
            <div style={{padding: '20px 32px'}}>
                <Switch>
                    <PrivateRoute exact path='/apply' component={ Apply }/>
                    <PrivateRoute exact path='/case' component={ Case }/>
                    <Route render={ () => <Redirect to="/404" /> } />
                    <Redirect exact from='/' to='/apply'/>
                </Switch>
            </div>
        )
    }
}

export default ContentMain
