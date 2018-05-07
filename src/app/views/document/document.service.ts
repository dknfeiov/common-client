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
        return this.http.post(CONFIG.tagList, {});
    }

    public docList(param) {
        return this.http.post(CONFIG.docList, param);
    }


    public upload(param) {
        return this.http.post(CONFIG.docUpload, param);
    }

    public download(filename: string) {
        return this.http.get(CONFIG.docDownload + `/${filename}`);
    }

    public add(param) {
        return this.http.post(CONFIG.docAdd, param);
    }

    public update(param) {
        return this.http.put(CONFIG.docUpdate, param);
    }

    public delete(param) {
        return this.http.delete(CONFIG.docUpdate, param);
    }

}
