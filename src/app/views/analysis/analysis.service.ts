import { CONFIG } from './../../common/CONFIG';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AnalysisService {

    constructor(
        private http: HttpClient
    ) {
    }

    analysis(site: string) {
        return this.http.post(CONFIG.analysisSreenPrint, { 'url': site });
    }

}
