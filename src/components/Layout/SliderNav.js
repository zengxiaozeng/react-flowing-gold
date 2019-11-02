import React, { Component } from 'react'
import CustomMenu from '@/components/Layout/CustomMenu'
import { connect } from 'react-redux';
import { removeToken, getToken } from '@/utils/auth'
import { withRouter } from 'react-router'
import { Popconfirm, message } from 'antd'
import { logoutRequest } from '@/store/actions/login'
import './SliderNav.less'

const menus = [
    {
        key: '/apply',
        title: '维权申请',
        imgUrl: require('@/assets/imgs/common/icon_apply.png'),
        selectedImgUrl: require('@/assets/imgs/common/icon_apply_selected.png'),
        name: 'apply-item'
    },
    {
        key: '/case',
        title: '维权案件',
        imgUrl: require('@/assets/imgs/common/icon_case.png'),
        selectedImgUrl: require('@/assets/imgs/common/icon_case_selected.png'),
        name: 'case-item'
    },
]

@withRouter
@connect(
    state => ({
        id_token: state.loginReducer.id_token
    }),
    dispatch => ({
        logout: () => {
            dispatch(logoutRequest());
        }
    })
)
class SliderNav extends Component {
    handleLogout = () => {
        removeToken()
        this.props.logout()
        this.props.history.push('/login');
    }

    cancel = e =>  {

    }

    render() {
        return (
            <div className="slider-nav-containter">
                <header>
                    <section>
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569487363663&di=622cd7f46ea243e5827976e27ca434b0&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170619%2Fe1d65856a6f94518a7fba553766015ad_th.png" alt="avatar"/>
                        <span>操作员</span>
                    </section>
                    <b>张三</b>
                </header>
                <CustomMenu menus={menus}/>
                <Popconfirm
                    title="确认退出?"
                    onConfirm={this.handleLogout}
                    okText="确认"
                    cancelText="取消"
                >
                    <footer>
                        <img src={require('@/assets/imgs/common/icon_quit.png')} alt="退出登录"/>
                        <span>退出登录</span>
                    </footer>
                </Popconfirm>

            </div>
        )
    }
}

const styles = {
    logo: {
        height: '32px',
        background: 'rgba(255, 255, 255, .2)',
        margin: '16px'
    }
}

export default SliderNav
