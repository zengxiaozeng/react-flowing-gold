import React, { Component, Fragment } from 'react';
import {Row, Col, Table, Input, Button, Popconfirm} from 'antd';
import BreadcrumbCustom from '@/components/Common/BreadcrumbCustom/index';
import {
    getApplyData,
    getContactData,
    addContactData
} from '@/store/actions/apply';
import { getAccountInfoData } from '@/store/actions/login';
import { connect } from 'react-redux';
import './index.less'
import { getAccountInfo } from '@/service/login.servicers.js'


const { TextArea } = Input;
const columns = [
    {
        title: '姓名',
        dataIndex: 'applyName',
        width: '25%',
        align: 'left'
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        width: '25%',
        align: 'center'
    },
    {
        title: '微信号',
        dataIndex: 'wxNo',
        width: '25%',
        align: 'center'
    },
    {
        title: '操作员',
        dataIndex: 'operator',
        width: '25%',
        align: 'right'
    }
];

@connect(
    state => ({
        applyData: state.applyReducer.applyData,
        total: state.applyReducer.total,
        contactRecord: state.applyReducer.contactRecord
    }),
    dispatch => ({
        getInitData: (data) => {
            dispatch(getApplyData(data));
        },
        getAccountRequest: (data) => {
            dispatch(getAccountInfoData(data));
        },
        getContactRecordRequest: (data) => {
            return dispatch(getContactData(data));
        },
        addAccountRequest: (data) => {
            dispatch(addContactData(data));
        },
    })
)
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            size: 6,
            dataArray: [],
            total: 0,
            content: '',
            applyId: ''
        }
    }

    componentDidMount() {
        this.getInit()
    }

    getInit = async() => {
        await this.props.getInitData({
            currentPage: 1,
            pageSize: this.state.size
        })
    }

    // 获取账户信息
    getAcountData() {
        getAccountInfo().then(res => {
            this.props.getAccountRequest(res.data.data)
        })
    }

    onPaginationChange(current, pageSize) {
        console.log(current)
        this.props.getInitData({
            currentPage: current,
            pageSize
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    clickTable(record) {
        this.setState({
            applyId: record.id
        })
        this.props.getContactRecordRequest({
            applyId: record.id
        })
    }

    handleAddContact = () => {
        this.props.addAccountRequest({
            applyId: this.state.applyId,
            content: this.state.content
        })
    }

    render() {
        let pagination = {
            total: this.props.total,
            defaultCurrent: this.state.current,
            pageSize: this.state.size,
            size: 'middle',
            onChange: (current, pageSize) => this.onPaginationChange(current, pageSize)
        }
        return (
            <section className="apply-container">
                <BreadcrumbCustom title="维权申请"/>
                <main>
                    <Row gutter={24}>
                        <Col className="gutter-row" span={16}>
                            <Table
                                columns={columns}
                                pagination={pagination}
                                dataSource={this.props.applyData}
                                size="middle"
                                onRow={record => {
                                    return {
                                        onClick: event => this.clickTable(record)
                                    };
                                }}
                                rowKey={record => record.id}
                            />
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div className="records-box">
                                <section className="v-tops">
                                    <p>联系记录</p>
                                    <TextArea
                                        rows={4}
                                        placeholder="请输入与客户取得联系的具体情况~"
                                        onChange ={this.handleChange}
                                        name="content"
                                        />
                                    <Button type="primary" onClick={this.handleAddContact}>确定</Button>
                                </section>
                                <section className="v-middle">
                                    <p>历史记录</p>
                                    <section className="v-middle-records">
                                        {
                                            this.props.contactRecord && this.props.contactRecord.length > 0?
                                                this.props.contactRecord.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <p>{item.content}</p>
                                                            <p>联系时间：{item.contactTime}</p>
                                                        </div>
                                                    )
                                                })
                                            :
                                            <section className="no-data">
                                                <img src={require('@/assets/imgs/common/no_data.png')} alt="无记录"/>
                                                <p>暂无记录</p>
                                            </section>
                                        }
                                    </section>
                                </section>
                            </div>
                        </Col>
                    </Row>
                </main>
            </section>
        )
    }
}

export default Index;
