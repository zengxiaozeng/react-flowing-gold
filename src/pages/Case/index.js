import React, { Component, Fragment } from 'react';
import { Icon, DatePicker, Tabs, Input, Button } from 'antd';
import BreadcrumbCustom from '@/components/Common/BreadcrumbCustom/index';
import './index.less';
import '@/pages/Apply/index.less'
import MainContent from "@/components/Case/mainContent/index";
import DraftContent from "@/components/Case/mainContent/draft";

import { getCaseData, getSearch, getDraftDataRequest } from '@/store/actions/case';
import { doPassAudit, doNotPassAudit } from '@/service/case.servicers.js'
import { connect } from 'react-redux';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

@connect(
    state => ({
        caseData: state.caseReducer.caseData,
        total: state.caseReducer.total,
        caseDetail: state.caseReducer.caseDetail,
        draftData: state.caseReducer.draftData,
        draftDetail: state.caseReducer.draftDetail
    }),
    dispatch => ({
        getInitData: (data) => {
            dispatch(getCaseData(data));
        },
        onSearch: (data) => {
            dispatch(getSearch(data))
        },
        getInitDraftTableData: (data) => {
            dispatch(getDraftDataRequest(data));
        },
    })
)
class CasePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            size: 5,
            applicantName: '',
            startDate: '',
            endDate: '',
            applicantMobile: '',
            platformName: '',
            isShowSearch: false,
            tabArray: [
                {
                    name: '待审核',
                    key: '11'
                },
                {
                    name: '审核通过',
                    key: '12'
                },
                {
                    name: '审核失败',
                    key: '13'
                },
                {
                    name: '维权成功',
                    key: '14'
                },
                {
                    name: '维权失败',
                    key: '15'
                },
                {
                    name: '草稿',
                    key: '16'
                }
            ],
            isShowAddBtn: false,
            tabsKey: 11
        }
    }

    componentDidMount() {
        this.getInitData(1)
    }

    //状态表格数据
    getInitData(page) {
        this.props.getInitData({
            pageNo: page,
            pageSize: this.state.size,
            caseStatusCode: this.state.tabsKey
        })
    }

    //草稿表格表格数据
    getCommonDraftTableData(page) {
        this.props.getInitDraftTableData({
            pageNo: page,
            pageSize: 8
        })
    }

    doSearch = () => {
        this.search({
            applicantName: this.state.applicantName.trim(),
            applicantMobile: this.state.applicantMobile.trim(),
            platformName: this.state.platformName.trim(),
            applyDateStart: this.state.applyDateStart,
            applyDateEnd: this.state.applyDateEnd
        })
    }

    search(params) {
        this.props.onSearch({
            pageNo: 0,
            pageSize: this.state.size,
            ...params
        })
    }

    // 搜索重置
    onReset = () => {
        console.log('重置')
        this.setState({
            startDate: '',
            endDate: '',
            applicantMobile: '',
            platformName: '',
            applicantName: ''
        }, () => {
            this.search({})
        })
    }

    // 点击是否展开搜索
    onClickSearchWrapper = () => {
        this.setState({
            isShowSearch: true
        })
    }

    // 关闭搜索
    closeSearchWrapper = () => {
        this.setState({
            isShowSearch: false
        })
    }


    // 日历控件change事件
    onChanageRangePicker = (value) => {
        if (value.length) {
            this.setState({
                startDate: value[0].format('YYYY-MM-DD HH:mm:ss'),
                endDate: value[1].format('YYYY-MM-DD HH:mm:ss')
            }, () => {
                this.getInitData(0)
            })
        } else {
            this.setState({
                startDate: '',
                endDate: ''
            }, () => {
                this.getInitData(0)
            })
        }
    }

    // 表单chagne事件
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    // tab切换事件
    onTabchange = (key) => {
        if (key < 16) {
            this.setState({
                tabsKey: key
            }, () => {
                this.getInitData(1)
            })
        } else {
            this.setState({
                tabsKey: key,
                isShowAddBtn: true
            }, () => {
                this.getCommonDraftTableData(1)
            })
        }
    }

    onPaginationChange(current, pageSize) {
        console.log(current)
        this.getInitData(current)
    }

    // 提交律所
    handelSubmitCounsel = () => {
        doPassAudit({
            caseId: this.props.caseDetail.id
        }).then(res => {
            if (res.data.success) {
                this.getInitData(1)
            }
        }).catch(err => console.log(err))
    }

    // 审核不通过
    handelAuditFailed = () => {
        doNotPassAudit({
            caseId: this.props.caseDetail.id
        }).then(res => {
            console.log(22222)
            if (res.data.success) {
                this.getInitData(1)
            }
        }).catch(err => console.log(err))
    }

    // 生成链接
    handleGenerateLinks = () => {
        doNotPassAudit({
            caseId: this.props.caseDetail.id
        }).then(res => {
            console.log(22222)
            if (res.data.success) {
                this.getInitData(1)
            }
        }).catch(err => console.log(err))
    }

    // 删除草稿
    handelDelete = () => {
        doNotPassAudit({
            caseId: this.props.caseDetail.id
        }).then(res => {
            console.log(22222)
            if (res.data.success) {
                this.getInitData(1)
            }
        }).catch(err => console.log(err))
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
            <div className="case-container apply-container">
                <BreadcrumbCustom title="维权案件"/>

                <section className="case-top">
                    <Tabs defaultActiveKey="11" onChange={this.onTabchange}>
                        {
                            this.state.tabArray.map((item) => {
                                if (item.key < 16) {
                                    return (
                                        <TabPane tab={item.name} key={item.key}>
                                            <MainContent
                                                tabsKey={this.state.tabsKey}
                                                dataArray={this.props.caseData}
                                                pagination={pagination}
                                                handelSubmitCounsel={this.handelSubmitCounsel}
                                                handelAuditFailed={this.handelAuditFailed}
                                            />
                                        </TabPane>
                                    )
                                } else {
                                    return (
                                        <TabPane tab={item.name} key={item.key}>
                                            <DraftContent
                                                tabsKey={this.state.tabsKey}
                                                dataArray={this.props.draftData}
                                                pagination={pagination}
                                                isShowAddBtn={this.state.isShowAddBtn}
                                                handelDelete={this.handelDelete}
                                                handleGenerateLinks={this.handleGenerateLinks}
                                            />
                                        </TabPane>
                                    )
                                }
                            })
                        }
                    </Tabs>
                    <section className="search-right" onClick={this.onClickSearchWrapper}>
                        <Input
                            placeholder = "请输入姓名、手机号、贷款平台"
                            prefix = {<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />

                    </section>
                    {
                        this.state.isShowSearch ?
                            <section className="search-header">
                                <section>
                                    <Input
                                        placeholder = "请输入姓名"
                                        prefix = {<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        value = {this.state.applicantName}
                                        onChange ={this.handleChange}
                                        name="applicantName"
                                    />
                                    <Input
                                        placeholder = "请输入手机号"
                                        prefix = {<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        value = {this.state.applicantMobile}
                                        onChange ={this.handleChange}
                                        name="applicantMobile"
                                    />
                                    <Input
                                        placeholder = "请输入贷款平台"
                                        prefix = {<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        value = {this.state.platformName}
                                        onChange ={this.handleChange}
                                        name="platformName"
                                    />
                                    <div>
                                        <RangePicker
                                            format="YYYY-MM-DD HH:mm:ss"
                                            onChange={this.onChanageRangePicker}
                                        />
                                    </div>
                                </section>
                                <div>
                                    <Button className="close-btn" type="primary" onClick={this.doSearch}>搜索</Button>
                                    <Button className="close-btn" type="danger" onClick={this.onReset}>重置</Button>
                                    <Button className="close-btn" icon="close" onClick={this.closeSearchWrapper}>关闭</Button>
                                </div>
                            </section>
                            :
                            <Fragment></Fragment>
                    }
                </section>
            </div>
        )
    }
}

export default CasePage;
