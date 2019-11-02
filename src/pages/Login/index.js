import React, { Component, Fragment } from 'react'
import './index.less'
import { Form, Input, Button } from 'antd'
import { withRouter } from 'react-router'
import { loginRequest } from '@/store/actions/login';
import { connect } from 'react-redux';
import Background from '@/components/Background'
import { preloadingImages } from '@/utils/util'
import { setToken } from '@/utils/auth'

const imgBacUrl = require('@/assets/imgs/login/login_bg.png')

@Form.create()
@withRouter
@connect(
    state => ({
        id_token: state.loginReducer.id_token
    }),
    dispatch => ({
        login: (data) => {
            dispatch(loginRequest(data));
        }
    })
)
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            loading:true
        })
        this.initPage()
    }

    initPage = () => {
        console.log(this.state.loading)

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login({
                    loginName: values.loginName,
                    password: values.password
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
                <Fragment>
                    <Background url={imgBacUrl}>
                        <section className="login-wrap-container">
                            <main>
                                <section className="v-left">
                                    <img src={require('@/assets/imgs/login/logo_icon.png')} alt="React"/>
                                </section>
                                <section className="v-right">
                                    <Form onSubmit={this.handleSubmit} className="login-form">
                                        <section>
                                            <Form.Item>
                                                {getFieldDecorator('loginName', {
                                                    rules: [{required: true, message: '请输入手机号码'}],
                                                })(
                                                    <div className="common-input">
                                                        <span className="icon-font iconyonghuming"></span>
                                                        <Input placeholder="请输入手机号码"/>
                                                    </div>
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                {getFieldDecorator('password', {
                                                    rules: [{required: true, message: '请输入密码'}],
                                                })(
                                                    <div className="common-input">
                                                        <span className="icon-font iconmima"></span>
                                                        <Input type="password" placeholder="请输入密码"/>
                                                    </div>
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                                            </Form.Item>
                                        </section>
                                    </Form>
                                </section>
                            </main>
                        </section>
                    </Background>
                </Fragment>
        );
    }
}

export default Login
