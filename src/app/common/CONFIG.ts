import { InjectionToken } from '@angular/core';


export enum ServieTypeEnum {
    DEV = 'dev',    // 本地开发模式，调node接口
    MOCK = 'mock'   // 模拟数据
}

export const CONFIG = {
    // 模式
    serviceType: ServieTypeEnum.DEV,
    dev: {
        // 用户
        login: '/user/login',
        logout: '/user/logout',
        userDetail: '/user/detail',
        updatePass: '/user/updatePass',

        // 用户
        // userList: '/user/list',
        // userAdd: '/user/add',
        // userUpdate: '/user/update',
        // userDel: '/user/delete',

        // 标签
        tagAdd: '/tag/add',
        tagDel: '/tag/delete',
        tagUpdate: '/tag/update',
        tagList: '/tag/list',

        // 文档
        docDownload: '/doc/download',
        docList: '/doc/list',
        docDel: '/doc/delete',
        docAdd: '/doc/add',
        docUpdate: '/doc/update',
    },


    /*
        假数据定义规则
        action + 路径
        // 操作类型 action: list | common
        // 数据源：InMemoryDataService
    */
    mock: {

        // 用户
        login: 'common/users',
        logout: 'common/users',
        userDetail: 'common/users/id',
        updatePass: 'common/users/id',

        // 标签
        tagList: 'list/tags',
        tagAdd: 'common/tags/id',
        tagDel: 'common/tags/id',
        tagUpdate: 'common/tags/id',

        // 文档
        docDownload: 'common/docs/download',  // TODO 下载暂未模拟
        docList: 'list/docs',
        docDel: 'common/docs/id',
        docAdd: 'common/docs/id',
        docUpdate: 'common/docs/id',
    }


};



export const COMMON_TOKEN_WRAPPER_TOKEN = new InjectionToken('wrapper token');
export const COMMON_PROVIDERS_TOKEN = new InjectionToken('providers token');
export const COMMON_INTERCEPTOR_HEADER = new InjectionToken('Interceptor Header');
export const defaultSettings = {};
