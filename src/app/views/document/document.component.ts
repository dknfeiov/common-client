import { NzModalService, NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { DocumentAddComponent } from './document-add/document-add.component';
import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  dataSet = []; // 文档列表
  modal;

  constructor(
    private service: DocumentService,
    private modalService: NzModalService,
    private messageService: NzMessageService
  ) { }

  showModal() {
    this.modal = this.modalService.create({
      nzTitle: '添加文档',
      nzContent: DocumentAddComponent,
      nzFooter: null,
      nzMaskClosable: false
    });
    this.modal.afterClose.subscribe(data => {
      if (data) {
        this.messageService.success('添加文档成功');
        this.fresh();
      }
    });
  }

  download(item) {
    window.location.href = `/doc/download/${item.file}`;
    /* this.service.download(item.file).subscribe(res => {
      console.log(res);
    }); */
  }


  fresh() {
    this.service.docList({}).subscribe(res => {
      this.dataSet = res.data.list;
    });
  }

  ngOnInit() {
    this.fresh();
  }

}

