import { InjectionToken } from '@angular/core';

export const CONFIG = {

    // 用户
    login: '/user/login',
    logout: '/user/logout',
    userDetail: '/user/detail',
    updatePass: '/user/updatePass',

    userList: '/user/list',
    userAdd: '/user/add',
    userUpdate: '/user/update',
    userDel: '/user/delete',

    // 标签
    tagAdd: '/tag/add',
    tagDel: '/tag/delete',
    tagUpdate: '/tag/update',
    tagList: '/tag/list',

    // 文档
    docUpload: '/doc/upload',
    docDownload: '/doc/download',
    docList: 'doc/list',
    docDel: 'doc/delete',
    docAdd: 'doc/add',
    docUpdate: 'doc/update',

    analysisSreenPrint: '/analysis/screenPrint',

};



export const HY_TOKEN_WRAPPER_TOKEN = new InjectionToken('wrapper token');
export const HY_PROVIDERS_TOKEN = new InjectionToken('providers token');
export const HY_INTERCEPTOR_HEADER = new InjectionToken('Interceptor Header');
export const HY_OPTIONS_TOKEN = new InjectionToken('token options');
export const HY_USER_OPTIONS_TOKEN = new InjectionToken(' User Auth Options');
export const HY_ROUTER_DATA = new InjectionToken<any>('hyrouterdata');
export const defaultSettings = {};
