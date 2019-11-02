import React, { Component } from 'react'
import IndexLayout from '@/components/Layout/index'
import { connect } from 'react-redux';
import LoadableComponent from '@/utils/LoadableComponent'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

const Login = LoadableComponent(()=>import(/* webpackChunkName: "login" */ '@/pages/Login'))
const ErrorPage = LoadableComponent(()=>import(/* webpackChunkName: "errorPage" */ '@/pages/ErrorPage'))

@connect(
    state => ({
        id_token: state.loginReducer.id_token
    })
)
class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={ () => <Redirect to="/apply" push /> } />
                    <Route path="/404" component={ ErrorPage } />
                    <Route path="/login" render={() => {
                        return this.props.id_token ?  <Redirect to="/" /> : <Login />
                    }} />
                    <Route render={ () => <IndexLayout /> } />
                </Switch>
            </Router>
        )
    }
}

export default App
