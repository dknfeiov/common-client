import { AnalysisService } from './analysis.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  name: string;

  constructor(
    private service: AnalysisService,
    private msgService: NzMessageService
  ) { }

  analysis() {
    // if(this.name) valid @TODO
    if (!this.name) {
      return;
    }
    this.service.analysis(this.name).subscribe(res => {
      if (res['code'] === 100) {
        this.msgService.create('success', `成功生成网站截屏！`);
      }
    });
  }

  ngOnInit() {
  }

}
