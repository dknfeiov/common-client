import { HttpService } from './../service/http.service';
import { CONFIG } from './../common/CONFIG';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SelfCenterService {

    constructor(
        private http: HttpService
    ) { }


    /* public login(param) {
        return this.http.post(CONFIG[CONFIG.serviceType].login, param);
    } */

    // 退出登录
    public logOff() {
        return this.http.get(CONFIG[CONFIG.serviceType].logout);
    }

    // 查询个人信息
    public findInfo(): Observable<any> {
        return this.http.get(CONFIG[CONFIG.serviceType].userDetail);
    }

    // 修改密码
    public updatePass(param) {
        return this.http.post(CONFIG[CONFIG.serviceType].updatePass, param);
    }


}
