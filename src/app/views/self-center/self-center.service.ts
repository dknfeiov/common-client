import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelfInfo } from './self-info';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SelfCenterService {


    // 退出登录
    /* public logOff() {
        return this.http.get(CONFIG[CONFIG.serviceType].exitLogin);
    } */

    constructor(
        private http: HttpClient
    ) { }

}


/**
 * 用户状态
 * @export
 * @enum {number}
 */
export enum UserStatusEnum {
    Disable = 0,
    Normal = 1,
}

