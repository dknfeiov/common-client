import { CONFIG } from './../../common/CONFIG';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportService {

    constructor(
        private http: HttpClient
    ) { }

    public getTagList(param?) {
        return this.http.post(CONFIG.tagList, {});
    }

}
