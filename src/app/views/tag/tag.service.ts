import { HttpService } from './../../share/service/http.service';
import { CONFIG } from './../../common/CONFIG';
import { Injectable } from '@angular/core';

@Injectable()
export class TagService {

    constructor(
        private http: HttpService
    ) { }

    public getTagList(param?) {
        return this.http.post(CONFIG.tagList, {});
    }

    public addTag(param) {
        return this.http.post(CONFIG.tagAdd, param);
    }

    public delTag(name) {
        return this.http.delete(CONFIG.tagDel, { 'name': name });
    }

    public updateTag(param) {
        return this.http.put(CONFIG.tagUpdate, param);
    }

}
