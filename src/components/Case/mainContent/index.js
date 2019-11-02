import {Row, Col, Table, Input, Button, Form, Radio, message } from 'antd';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { complementInformation, onRollBack, appealSuccess, appealFail } from '@/service/case.servicers.js'
import { getCaseDetailRequest, getCaseData } from '@/store/actions/case';
import './index.less'

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
        caseDetail: state.caseReducer.caseDetail
    }),
    dispatch => ({
        getCaseDetail: (data) => {
            dispatch(getCaseDetailRequest(data));
        },
        getInitTableData: (data) => {
            dispatch(getCaseData(data));
        },
    })
)
class MainContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSupplement: true,
            loanCompany: '',
            companyLinkman: '',
            companyContact: '',
            companyAddress: '',
        }
    }

    onChanges = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handelEditSupplementInfo = (e) => {
        this.setState({
            isSupplement: false
        })
    }

    handelSaveSupplementInfo = () => {
        if (this.state.loanCompany.trim().length === 0) {
            message.error('请输入贷款公司名称');
        } else if (this.state.companyAddress.trim().length === 0) {
            message.error('请输入贷款公司地址');
        } else {
            complementInformation({
                loanCompany: this.state.loanCompany,
                companyLinkman: this.state.companyLinkman,
                companyContact: this.state.companyContact,
                companyAddress: this.state.companyAddress,
                caseId: this.props.caseDetail.id
            }).then(res => {
                if (res.data.success) {
                    this.setState({
                        isSupplement: true,
                        loanCompany: '',
                        companyLinkman: '',
                        companyContact: '',
                        companyAddress: ''
                    }, () => {
                        this.props.getCaseDetail({
                            caseId: this.props.caseDetail.id
                        })
                    })
                }
            }).catch(err => console.log(err))
        }
    }

    clickTable(record) {
        this.setState({
            isSupplement: true,
            loanCompany: '',
            companyLinkman: '',
            companyContact: '',
            companyAddress: ''
        }, () => {
            this.props.getCaseDetail({
                caseId: record.id
            })
        })
    }

    handleTobeAuditedSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                complementInformation({
                    loanCompany: values.loanCompany,
                    companyLinkman: values.companyLinkman,
                    companyContact: values.companyContact,
                    companyAddress: values.companyAddress,
                    caseId: this.props.caseDetail.id
                }).then(res => {
                    console.log('88888')
                    console.log(res)
                }).catch(err => console.log(err))
            }
        });
    }

    onBack = () => {
        onRollBack({
            caseId: this.props.caseDetail.id
        }).then(res => {
            this.props.getInitTableData({
                pageNo: 1,
                pageSize: 10,
                caseStatusCode: this.props.tabsKey
            })
        })
    }

    onRightsProtection = () => {
        appealSuccess({
            caseId: this.props.caseDetail.id
        }).then(res => {
            this.props.getInitTableData({
                pageNo: 1,
                pageSize: 10,
                caseStatusCode: this.props.tabsKey
            })
        })
    }

    onErrorProtection = () => {
        appealFail({
            caseId: this.props.caseDetail.id
        }).then(res => {
            this.props.getInitTableData({
                pageNo: 1,
                pageSize: 10,
                caseStatusCode: this.props.tabsKey
            })
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
        const caseDetailLength =  Object.keys(this.props.caseDetail).length === 0

        let OperatorBtn
        if (!caseDetailLength) {
            if (this.props.tabsKey == '11') {
                OperatorBtn = (
                    <section>
                        <Button type="primary" onClick={this.props.handelSubmitCounsel}>提交律所</Button>
                        {
                            this.state.isSupplement ?
                                <Button type="primary" onClick={this.handelEditSupplementInfo}>编辑</Button>
                                :
                                <Button type="primary" onClick={this.handelSaveSupplementInfo}>保存</Button>
                        }
                        <Button type="primary" onClick={this.props.handelAuditFailed}>审核不通过</Button>
                    </section>
                )
            } else if (this.props.tabsKey == '12') {
                OperatorBtn = (
                    <section>
                        <Button type="primary" onClick={this.onBack}>撤回</Button>
                        <Button type="primary" onClick={this.onRightsProtection}>维权成功</Button>
                        <Button type="primary" onClick={this.onErrorProtection}>维权失败</Button>
                    </section>
                )
            } else if (this.props.tabsKey == '13') {
                OperatorBtn = (
                    <section>
                        <Button type="primary" onClick={this.onBack}>撤回</Button>
                    </section>
                )
            } else {
                OperatorBtn = (
                    null
                )
            }
        } else {
            OperatorBtn = (
                null
            )
        }

        return (
            <main className="case-main-content">
                <Row gutter={24}>
                    <Col className="gutter-row" span={16}>
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
                            <section className="v-tops v-top-case-edit">
                                <p><b>维权详情</b></p>
                                { OperatorBtn }
                            </section>
                            <section className="v-mains">
                                {
                                    !caseDetailLength ?
                                        <Fragment>
                                            {
                                                this.props.tabsKey == '11' ?
                                                    <div>
                                                        <h4>补充信息</h4>
                                                        {
                                                            !this.state.isSupplement ?
                                                            <div className="edit-container">
                                                                <section>
                                                                    <span>贷款公司：</span>
                                                                    <Input
                                                                        placeholder = "请输入贷款公司"
                                                                        onChange ={this.onChanges}
                                                                        name="loanCompany"
                                                                    />
                                                                </section>
                                                                <section>
                                                                    <span>贷款公司地址：</span>
                                                                    <Input
                                                                        placeholder = "贷款公司地址"
                                                                        onChange ={this.onChanges}
                                                                        name="companyAddress"
                                                                    />
                                                                </section>
                                                                <section>
                                                                    <span>联系人：</span>
                                                                    <Input
                                                                        placeholder = "请输入联系人"
                                                                        onChange ={this.onChanges}
                                                                        name="companyLinkman"
                                                                    />
                                                                </section>
                                                                <section>
                                                                    <span>微信号：</span>
                                                                    <Input
                                                                        placeholder = "请输入微信号"
                                                                        onChange ={this.onChanges}
                                                                        name="companyContact"
                                                                    />
                                                                </section>
                                                            </div>
                                                            :
                                                            <Fragment>
                                                                <p>
                                                                    <span>贷款公司：</span>
                                                                    <span>{this.props.caseDetail.loanCompany}</span>
                                                                </p>
                                                                <p>
                                                                    <span>贷款公司地址：</span>
                                                                    <span>{this.props.caseDetail.companyAddress}</span>
                                                                </p>
                                                                <p>
                                                                    <span>联系人：</span>
                                                                    <span>{this.props.caseDetail.companyLinkman}</span>
                                                                </p>
                                                                <p>
                                                                    <span>微信号：</span>
                                                                    <span>{this.props.caseDetail.companyContact}</span>
                                                                </p>
                                                            </Fragment>
                                                        }
                                                    </div>
                                                    :
                                                    null
                                            }
                                            <div>
                                                <h4>借款信息</h4>
                                                <p>
                                                    <span>借款平台：</span>
                                                    <span>{this.props.caseDetail.platformName}</span>
                                                </p>
                                                <p>
                                                    <span>借款时间：</span>
                                                    <span>{this.props.caseDetail.loanDate}</span>
                                                </p>
                                                <p>
                                                    <span>合同金额：</span>
                                                    <span>{this.props.caseDetail.contractAmount}</span>
                                                </p>
                                                <p>
                                                    <span>到账金额：</span>
                                                    <span>{this.props.caseDetail.arrivalAmount}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <h4>还款信息</h4>
                                                <p>
                                                    <span>还款方式：</span>
                                                    <span>{this.props.caseDetail.repaymentType}</span>
                                                </p>
                                                <p>
                                                    <span>还款时间：</span>
                                                    <span>{this.props.caseDetail.repaymentDate}</span>
                                                </p>
                                                <p>
                                                    <span>还款总额：</span>
                                                    <span>{this.props.caseDetail.repaymentAmount}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <h4>试算结果</h4>
                                                <p>
                                                    <span>砍头息：</span>
                                                    <span>{this.props.caseDetail.beheadInterest}</span>
                                                </p>
                                                <p>
                                                    <span>支付利息总额：</span>
                                                    <span>{this.props.caseDetail.paymentInterest}</span>
                                                </p>
                                                <p>
                                                    <span>合法利息总额：</span>
                                                    <span>{this.props.caseDetail.legalInterest}</span>
                                                </p>
                                                <p>
                                                    <span>非法利息总额：</span>
                                                    <span>{this.props.caseDetail.illegalInterest}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <h4>联系信息</h4>
                                                <p>
                                                    <span>手机号：</span>
                                                    <span>{this.props.caseDetail.companyContact}</span>
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
                        </div>
                    </Col>
                </Row>
            </main>
        )
    }
}

MainContent.propTypes = {
    dataArray: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
}

export default MainContent