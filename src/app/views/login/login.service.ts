import { HttpService } from './../../service/http.service';
import { CONFIG } from './../../common/CONFIG';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
    constructor(
        private http: HttpService
    ) { }

    public login(param) {
        return this.http.post(CONFIG[CONFIG.serviceType].login, param);
    }
}
