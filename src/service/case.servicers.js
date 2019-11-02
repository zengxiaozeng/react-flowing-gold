import request from './request'

// 分页分状态显示案件
export function getRecordsData(params) {
    return request({
        method: 'post',
        url: `/creative/case/admin/status-case-page`,
        data: {
            ...params
        }
    })
}

// 案件搜索分页
export function seachCaseData(params) {
    return request({
        method: 'post',
        url: `/creative/case/admin/query`,
        data: {
            ...params
        }
    })
}

// 加载案件详情（含补充信息）
export function getCaseDetail(params) {
    return request({
        method: 'get',
        url: `/creative/case/admin/${params.caseId}`
    })
}

// 案件信息补全
export function complementInformation(params) {
    return request({
        method: 'put',
        url: `/creative/case/admin/`,
        data: {
            ...params
        }
    })
}

// 提交律师事务所
export function doPassAudit(params) {
    return request({
        method: 'post',
        url: `/creative/case/admin/pass-audit`,
        data: {
            ...params
        }
    })
}

// 审核不通过
export function doNotPassAudit(params) {
    return request({
        method: 'post',
        url: `/creative/case/admin/not-pass-audit`,
        data: {
            ...params
        }
    })
}

// 新增草稿
export function addDraft(params) {
    return request({
        method: 'post',
        url: `/creative/draft/create`,
        data: {
            ...params
        }
    })
}

// 删除草稿
export function deleteDraft(params) {
    return request({
        method: 'post',
        url: `/creative/draft/delete`,
        data: {
            ...params
        }
    })
}

// 查询草稿详情
export function searchDraftDetail(params) {
    return request({
        method: 'post',
        url: `/creative/draft/draft_detail`,
        data: {
            ...params
        }
    })
}

// 生成链接
export function generateLink(params) {
    return request({
        method: 'post',
        url: `/creative/draft/generate_link`,
        data: {
            ...params
        }
    })
}

// 用户授权
export function grantAuthorization(params) {
    return request({
        method: 'post',
        url: `/creative/draft/grant_authorization`,
        data: {
            ...params
        }
    })
}

// 获取所有草稿列表(分页)
export function pageDraftRecords(params) {
    return request({
        method: 'post',
        url: `/creative/draft/page_draft`,
        data: {
            ...params
        }
    })
}

// 修改草稿
export function updateDraft(params) {
    return request({
        method: 'post',
        url: `/creative/draft/update`,
        data: {
            ...params
        }
    })
}

// 根据三要素获取用户信息
export function getUserDetail(params) {
    return request({
        method: 'post',
        url: `/creative/user/get_user_detail`,
        data: {
            ...params
        }
    })
}

// 维权失败
export function appealFail(params) {
    return request({
        method: 'post',
        url: `/creative/case/admin/appeal-fail`,
        data: {
            ...params
        }
    })
}

// 维权成功
export function appealSuccess(params) {
    return request({
        method: 'post',
        url: `/creative/case/admin/appeal-success`,
        data: {
            ...params
        }
    })
}

// 案件回退
export function onRollBack(params) {
    return request({
        method: 'post',
        url: `/creative/case/admin/rollback`,
        data: {
            ...params
        }
    })
}