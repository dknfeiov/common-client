import { Observable } from 'rxjs/Observable';
import { HttpService } from './../../service/http.service';
import { CONFIG } from './../../common/CONFIG';
import { Injectable } from '@angular/core';

@Injectable()
export class DocumentService {

    constructor(
        private http: HttpService
    ) { }

    public tagList() {
        return this.http.get(CONFIG[CONFIG.serviceType].tagList, {});
    }

    public docList(param) {
        return this.http.get(CONFIG[CONFIG.serviceType].docList, param);
    }

    public download(filename: string) {
        return this.http.get(CONFIG[CONFIG.serviceType].docDownload + `/${filename}`);
    }

    public add(param) {
        return this.http.post(CONFIG[CONFIG.serviceType].docAdd, param);
    }

    public update(param) {
        return this.http.put(CONFIG[CONFIG.serviceType].docUpdate, param);
    }

    public delete(param) {
        return this.http.delete(CONFIG[CONFIG.serviceType].docDel, param);
    }

}
