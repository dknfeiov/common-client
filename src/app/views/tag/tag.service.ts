import { HttpService } from './../../service/http.service';
import { CONFIG } from './../../common/CONFIG';
import { Injectable } from '@angular/core';

@Injectable()
export class TagService {

    constructor(
        private http: HttpService
    ) { }

    public getTagList(param?) {
        return this.http.get(CONFIG[CONFIG.serviceType].tagList, {});
    }

    public addTag(param) {
        return this.http.post(CONFIG[CONFIG.serviceType].tagAdd, param);
    }

    public delTag(name) {
        return this.http.delete(CONFIG[CONFIG.serviceType].tagDel, { 'name': name });
    }

    public updateTag(param) {
        return this.http.put(CONFIG[CONFIG.serviceType].tagUpdate, param);
    }

}
