import { FormattingPipe } from './../../share/pipes/formatting.pipe';
import { NzModalService, NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { DocumentAddComponent } from './document-add/document-add.component';
import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  providers: [FormattingPipe]
})
export class DocumentComponent implements OnInit {

  dataSet = []; // 文档列表
  modal;
  tagList;

  constructor(
    private service: DocumentService,
    private modalService: NzModalService,
    private messageService: NzMessageService,
    private formatPipe: FormattingPipe
  ) { }

  // 新增|编辑
  showModal(doc?) {
    this.modal = this.modalService.create({
      nzTitle: `${doc ? '编辑' : '添加'}文档`,
      nzContent: DocumentAddComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzComponentParams: {
        type: doc ? 'edit' : 'add',
        doc: doc || {}
      }
    });
    this.modal.afterClose.subscribe(data => {
      if (data && data === 'success') {
        this.messageService.success(`${doc ? '编辑' : '添加'}文档成功！`);
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
      res.data.list.forEach(item => {
        if (item.tags) {
          item.tagsText = item.tags.split(',').map(tag => this.formatPipe.transform(tag, this.tagList)).join(',');
        }
      });
      this.dataSet = res.data.list;
    });
  }

  delete(doc) {
    this.service.delete({ name: doc.name }).subscribe(res => {
      this.messageService.success(`删除文档成功！`);
      this.fresh();
    });
  }

  ngOnInit() {
    this.service.tagList().subscribe(res => {
      this.tagList = res.data.list.map(item => {
        return {
          value: item._id,
          name: item.name
        };
      });
    });
    this.fresh();
  }

}

