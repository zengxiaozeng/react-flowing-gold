import {Row, Col, Table, Input, Button, Form, Radio, message, Modal } from 'antd';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { complementInformation, getUserDetail, addDraft, deleteDraft, generateLink } from '@/service/case.servicers.js'
import { getDraftDetailRequest, getDraftDataRequest, resetDraftDetail } from '@/store/actions/case';
import './index.less'

const {confirm} = Modal
const columns = [
    {
        title: '案件申请日期',
        dataIndex: 'createdDate',
        align: 'left'
    },
    {
        title: '姓名',
        dataIndex: 'applicantName',
        align: 'center'
    },
    {
        title: '手机号',
        dataIndex: 'applicantMobile',
        align: 'right'
    },
    {
        title: '借款平台',
        dataIndex: 'platformName',
        align: 'right'
    },
    {
        title: '借款合同金额',
        dataIndex: 'arrivalAmount',
        align: 'right'
    },
    {
        title: '非法利息金额',
        dataIndex: 'illegalInterest',
        align: 'right'
    }
];
const detailList = {
    platforms: '小牛贷',
    loansTime: '2018/08/28',
    loansMoney: '5,000.00元',
    arrivalMoney: '4,587.24元',
    method: '一次性还款',
    repaymentTime: '2018/09/28',
    repaymentTotal: '7,200.89元',
    behead: '400.65元',
    interestTotal: '2,613.65元',
    egalInterest: '1,500.00元',
    illegalInterest: '1,113.65元',
    molile: '13000000000'
}

@Form.create()
@connect(
    state => ({
        draftDetail: state.caseReducer.draftDetail
    }),
    dispatch => ({
        getDraftDetail: (data) => {
            dispatch(getDraftDetailRequest(data));
        },
        getInitDraftTableData: (data) => {
            dispatch(getDraftDataRequest(data));
        },
        resetForms: () => {
            dispatch(resetDraftDetail())
        }
    })
)
class draftContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSupplement: true,
            loanCompany: '',
            companyLinkman: '',
            companyContact: '',
            companyAddress: '',
            isEdit: false,
            isSavaBtnClicked: true,
            cardNo: '',
            userName: '',
            phone: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values)
            if (!err) {
                addDraft({
                    name: values['userName'],
                    phone: values['phone'],
                    cardNo: values['cardNo'],
                    wxNo: values['wxNo'] | '',
                    arrivalAmount: values['arrivalAmount'] | '',
                    companyAddress: '' ,
                    companyContact: '',
                    companyLinkman: '',
                    contractAmount: values['contractAmount'] | '',
                    loanCompany: values['loanPlatform'] | '',
                    loanDateTime: values['loanDateTime'] | '',
                    platformName: '',
                    repaymentAmount: values['repaymentAmount'] | '',
                    repaymentDateTime: values['repaymentDateTime'] | '',
                    repaymentPeriods: '',
                    repaymentType: values['repaymentType'] | '',
                    wxUserId: this.props.draftDetail.id
                }).then(res => {
                    console.log('----------')
                    console.log(res)
                    if (res.data.success) {
                        this.setState({
                            isEdit: false,
                            isSupplement: true
                        }, () => {
                            this.props.form.resetFields();
                            this.props.getInitDraftTableData({
                                pageNo: 1,
                                pageSize: 8
                            })
                        })
                    }
                })
            }
        });
    }

    onChanges = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handelEditSupplementInfo = (e) => {
        this.setState({
            isSupplement: false,
            isEdit: true
        }, () => {
            
        })
        console.log(this.props.draftDetail)
    }

    handelSaveSupplementInfo = () => {
        
    }

    clickTable(record) {
        this.setState({
            isSupplement: true,
            loanCompany: '',
            companyLinkman: '',
            companyContact: '',
            companyAddress: ''
        }, () => {
            this.props.getDraftDetail({
                id: record.id
            })
        })
    }

    // 新建案件
    handleAddNewCase = e => {
        this.props.resetForms()
        this.setState({
            isEdit: true
        }, () => {
            // this.props.form.resetFields();
        })
    }

    onInputChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        }, () => {
            if (this.state.cardNo.trim() && this.state.phone.trim() && this.state.userName.trim()) {
                getUserDetail({
                    cardNo: this.state.cardNo.trim(),
                    phone: this.state.phone.trim(),
                    userName: this.state.userName.trim()
                }).then(res => {
                    if (res.data.success && res.data.data.length > 0) {
                        this.setState({
                            isSavaBtnClicked: false
                        })
                    } else {
                        this.setState({
                            isSavaBtnClicked: true
                        })
                    }
                })
            }
        })
    }

    // 取消新建
    handleCancelCreate = () => {
        this.setState({
            isEdit: false,
            isSupplement: true
        }, () => {
            this.props.getInitDraftTableData({
                pageNo: 1,
                pageSize: 8
            })
        })
    }

    // 删除草稿
    handleDeleteDraft = () => {
        const self = this
        confirm({
            content: <p>是否确认删除</p>,
            onOk() {
                deleteDraft({
                    id: self.props.draftDetail.id
                }).then(res => {
                    if (res.data.success) {
                        console.log('删除成功')
                        self.props.getInitDraftTableData({
                            pageNo: 1,
                            pageSize: 8
                        })
                    }
                })
            },
            onCancel() {
            }
        });
    }

    // 生成链接
    handleCreateLinks = () => {
        generateLink({
            id: this.props.draftDetail.id
        }).then(res => {
            if (res.data.success) {
                console.log('生成链接成功')
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        }
        const supplementFormItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 17 },
        }
        const caseDetailLength =  Object.keys(this.props.draftDetail).length === 0
        console.log(caseDetailLength)
        return (
            <main className="case-main-content draft-main-content">
                <Row gutter={24}>
                    <Col className="gutter-row" span={16}>
                        {
                            this.props.isShowAddBtn ?
                                <Button type="primary" icon="plus-circle" className="add-case-btn" onClick={this.handleAddNewCase}>新建案件</Button>
                                :
                                null
                        }
                        <Table
                            columns={columns}
                            pagination={this.props.pagination}
                            dataSource={this.props.dataArray}
                            onRow={record => {
                                return {
                                    onClick: event => this.clickTable(record)
                                };
                            }}
                            size="middle"
                            rowKey={record => record.id}
                        />
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="records-box detail-box">
                            {
                                !this.state.isEdit ?
                                    <Fragment>
                                        <section className="v-tops v-top-case-edit">
                                            <p><b>维权详情</b></p>
                                            {
                                                !caseDetailLength ?
                                                    <section>
                                                        <Button type="primary" onClick={this.handleCreateLinks}>生成链接</Button>
                                                        {
                                                            this.state.isSupplement ?
                                                                <Button type="primary" onClick={this.handelEditSupplementInfo}>编辑</Button>
                                                                :
                                                                <Button type="primary" onClick={this.handelSaveSupplementInfo}>保存</Button>
                                                        }
                                                        {
                                                            this.state.isEdit ?
                                                                <Button type="primary" onClick={this.handleCancelCreate}>取消</Button>
                                                                :
                                                                <Button type="primary" onClick={this.handleDeleteDraft}>删除</Button>
                                                        }
                                                    </section>
                                                    :
                                                    null
                                            }
                                        </section>
                                        <section className="v-mains">
                                            {
                                                !caseDetailLength ?
                                                    <Fragment>
                                                        <div>
                                                            <h4>借款信息</h4>
                                                            <p>
                                                                <span>借款平台：</span>
                                                                <span>{this.props.draftDetail.platformName}</span>
                                                            </p>
                                                            <p>
                                                                <span>借款时间：</span>
                                                                <span>{this.props.draftDetail.loanDate}</span>
                                                            </p>
                                                            <p>
                                                                <span>合同金额：</span>
                                                                <span>{this.props.draftDetail.contractAmount}</span>
                                                            </p>
                                                            <p>
                                                                <span>到账金额：</span>
                                                                <span>{this.props.draftDetail.arrivalAmount}</span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4>还款信息</h4>
                                                            <p>
                                                                <span>还款方式：</span>
                                                                <span>{this.props.draftDetail.repaymentType}</span>
                                                            </p>
                                                            <p>
                                                                <span>还款时间：</span>
                                                                <span>{this.props.draftDetail.repaymentDate}</span>
                                                            </p>
                                                            <p>
                                                                <span>还款总额：</span>
                                                                <span>{this.props.draftDetail.repaymentAmount}</span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4>试算结果</h4>
                                                            <p>
                                                                <span>砍头息：</span>
                                                                <span>{this.props.draftDetail.beheadInterest}</span>
                                                            </p>
                                                            <p>
                                                                <span>支付利息总额：</span>
                                                                <span>{this.props.draftDetail.paymentInterest}</span>
                                                            </p>
                                                            <p>
                                                                <span>合法利息总额：</span>
                                                                <span>{this.props.draftDetail.legalInterest}</span>
                                                            </p>
                                                            <p>
                                                                <span>非法利息总额：</span>
                                                                <span>{this.props.draftDetail.illegalInterest}</span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4>联系信息</h4>
                                                            <p>
                                                                <span>手机号：</span>
                                                                <span>{this.props.draftDetail.companyContact}</span>
                                                            </p>
                                                        </div>
                                                    </Fragment>
                                                    :
                                                    <div className="empty-detail">
                                                        <img src={require('@/assets/imgs/common/no_data.png')} alt="无记录"/>
                                                        <p>暂无记录</p>
                                                    </div>
                                            }
                                        </section>
                                    </Fragment>
                                    :
                                    <Form {...formItemLayout} onSubmit={this.handleSubmit} className="case-form">
                                        <section className="v-tops v-top-case-edit">
                                            <p><b>新建案件</b></p>
                                            <section>
                                                <Button type="primary" onClick={this.handleCreateLinks}>生成链接</Button>
                                                {
                                                    this.state.isSavaBtnClicked ?
                                                        <Button type="primary" className="no-save-btn" disabled={this.state.isSavaBtnClicked}>保存</Button>
                                                        :
                                                        <Button type="primary" htmlType="submit">保存</Button>
                                                }
                                                {
                                                    this.state.isEdit ?
                                                        <Button type="primary" onClick={this.handleCancelCreate}>取消</Button>
                                                        :
                                                        <Button type="primary" onClick={this.handleDeleteDraft}>删除</Button>
                                                }
                                            </section>
                                        </section>
                                        <section className="v-mains-edit">
                                            <div>
                                                <h4>
                                                    <span>个人信息</span>
                                                    {
                                                        !this.state.isSavaBtnClicked ?
                                                            <span>已有客户信息</span>
                                                            :
                                                            null
                                                    }
                                                </h4>
                                                <Form.Item label="真实姓名">
                                                    {getFieldDecorator('userName', {
                                                        initialValue: this.props.draftDetail.name,
                                                        rules: [{required: true, message: '请输入真实姓名'}],
                                                    })(
                                                        <Input
                                                            name="userName"
                                                            placeholder="请输入真实姓名"
                                                            onChange={this.onInputChange}
                                                        />
                                                    )}
                                                </Form.Item>
                                                <Form.Item label="身份证号">
                                                    {getFieldDecorator('cardNo',{
                                                        initialValue: this.props.draftDetail.cardNo,
                                                        rules: [{required: true, message: '请输入身份证号'}],
                                                    })(
                                                        <Input name="cardNo" placeholder="请输入身份证号" onChange={this.onInputChange}/>
                                                    )}
                                                </Form.Item>
                                                <Form.Item label="手机号">
                                                    {getFieldDecorator('phone', {
                                                        initialValue: this.props.draftDetail.phone,
                                                        rules: [{required: true, message: '请输入手机号'}],
                                                    })(
                                                        <Input name="phone" placeholder="请输入手机号" onChange={this.onInputChange}/>
                                                    )}
                                                </Form.Item>
                                                <Form.Item label="微信号">
                                                    {getFieldDecorator('wxNo', {
                                                        initialValue: this.props.draftDetail.wxNo
                                                    })(
                                                        <Input placeholder="请输入微信号"/>
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <h4>借款信息</h4>
                                                <Form.Item label="借款平台">
                                                    {getFieldDecorator('loanPlatform', {
                                                        initialValue: this.props.draftDetail.loanPlatform
                                                    })(
                                                        <Input placeholder="请输入借款平台"/>
                                                    )}
                                                </Form.Item>
                                                <Form.Item label="借款时间">
                                                    {getFieldDecorator('loanDateTime', {
                                                        initialValue: this.props.draftDetail.loanDateTime
                                                    })(
                                                        <Input placeholder="请输入借款时间"/>
                                                    )}
                                                </Form.Item>
                                                <Form.Item label="合同金额">
                                                    {getFieldDecorator('contractAmount', {
                                                        initialValue: this.props.draftDetail.contractAmount
                                                    })(
                                                        <Input placeholder="请输入合同金额"/>
                                                    )}
                                                </Form.Item>
                                                <Form.Item label="到账金额">
                                                    {getFieldDecorator('arrivalAmount', {
                                                        initialValue: this.props.draftDetail.arrivalAmount
                                                    })(
                                                        <div className="common-input">
                                                            <Input placeholder="请输入到账金额"/>
                                                        </div>
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <h4>还款信息</h4>
                                                <Form.Item label="还款方式">
                                                    {getFieldDecorator('repaymentType', {
                                                        initialValue: this.props.draftDetail.repaymentType
                                                    })(
                                                        <Radio.Group>
                                                            <Radio value="1">一次性还款</Radio>
                                                            <Radio value="2">分期还款</Radio>
                                                        </Radio.Group>
                                                    )}
                                                </Form.Item>
                                                <Form.Item label="还款时间">
                                                    {getFieldDecorator('repaymentDateTime', {
                                                        initialValue: this.props.draftDetail.repaymentDateTime
                                                    })(
                                                        <Input placeholder="请输入还款时间"/>
                                                    )}
                                                </Form.Item>
                                                <Form.Item label="还款总额">
                                                    {getFieldDecorator('repaymentAmount', {
                                                        initialValue: this.props.draftDetail.repaymentAmount
                                                    })(
                                                        <Input placeholder="请输入还款总额"/>
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <h4>试算结果</h4>
                                                <Row>
                                                    <Col span={8}>砍头息：</Col>
                                                    <Col span={16}>{detailList.platforms}</Col>
                                                </Row>
                                                <Row>
                                                    <Col span={8}>支付利息总额：</Col>
                                                    <Col span={16}>{detailList.platforms}</Col>
                                                </Row>
                                                <Row>
                                                    <Col span={8}>合法利息总额：</Col>
                                                    <Col span={16}>{detailList.platforms}</Col>
                                                </Row>
                                                <Row>
                                                    <Col span={8}>非法利息总额：</Col>
                                                    <Col span={16}>{detailList.platforms}</Col>
                                                </Row>
                                            </div>
                                        </section>
                                    </Form>
                            }

                        </div>
                    </Col>
                </Row>
            </main>
        )
    }
}

draftContent.propTypes = {
    dataArray: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    isShowAddBtn: PropTypes.bool.isRequired
}

export default draftContent