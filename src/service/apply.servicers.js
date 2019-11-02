import request from './request'

export function getAccountRecords(params) {
    return request({
        method: 'post',
        url: `/creative/apply/get_apply_list`,
        data: {
            ...params
        }
    })
}

// 联系记录列表查询
export function getContactRecord(params) {
    return request({
        method: 'post',
        url: `/creative/contact/record_list`,
        data: {
            ...params
        }
    })
}

// 联系记录新增
export function addContactRecord(params) {
    return request({
        method: 'post',
        url: `/creative/contact/record_add`,
        data: {
            ...params
        }
    })
}