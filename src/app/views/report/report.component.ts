import { ReportService } from './report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ReportService]
})
export class ReportComponent implements OnInit {

  constructor(
    private service: ReportService
  ) { }

  dataSet = [
    {
      key: '1',
      name: 'John Brown',
      company: 'Hooray',
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      company: 'Hooray',
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      company: 'Hooray',
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  ngOnInit() {
    this.service.getTagList().subscribe(res => {
      this.dataSet = res['list'];
    });
  }

}
