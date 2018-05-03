import { TagEditComponent } from './tag-edit/tag-edit.component';
import { TagAddComponent } from './tag-add/tag-add.component';
import { NzModalService, NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { TagService } from './tag.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  constructor(
    private service: TagService,
    private modalService: NzModalService,
    private messageService: NzMessageService
  ) { }

  dataSet = [];
  modal: NzModalRef;

  showModal() {
    this.modal = this.modalService.create({
      nzTitle: '添加标签',
      nzContent: TagAddComponent,
      nzFooter: null,
      nzMaskClosable: false
    });
    this.modal.afterClose.subscribe(data => {
      if (data) {
        this.messageService.success('添加标签成功');
        this.fresh();
      }
    });
  }

  delete(item) {
    this.service.delTag(item.name).subscribe(data => {
      this.messageService.success('删除标签成功');
      this.fresh();
    });
  }


  update(item) {
    this.modal = this.modalService.create({
      nzTitle: '编辑标签',
      nzContent: TagEditComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzComponentParams: {
        data: item
      }
    });
    this.modal.afterClose.subscribe(data => {
      this.messageService.success('编辑标签成功');
      this.fresh();
    });
  }

  fresh() {
    this.service.getTagList().subscribe(res => {
      this.dataSet = res.data.list;
    });
  }

  ngOnInit() {
    this.fresh();
  }

}
