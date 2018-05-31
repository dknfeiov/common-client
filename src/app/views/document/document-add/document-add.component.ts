import { DocumentService } from './../document.service';
import { NzModalRef, NzModalService, UploadFile, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})
export class DocumentAddComponent implements OnInit {

  @Input() type: 'add' | 'edit' = 'add';
  // 编辑传入文档
  @Input() doc: {
    _id?;
    name?;
    describe?;
    file?;
    tags?;
  } = {};

  tagList: Array<{ value; name; }> = [];

  validateForm: FormGroup;
  fileList = [];
  oldFile: string;

  constructor(
    private fb: FormBuilder,
    private service: DocumentService,
    private messageServie: NzMessageService,
    private modal: NzModalRef
  ) { }

  beforeUpload = (file: UploadFile): boolean => {
    // 只允许一个文件
    if (this.oldFile) {
      delete this.oldFile;
    }
    this.fileList = [];
    this.fileList.push(file);
    return false;
  }

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.invalid) {
      return;
    }
    if (this.fileList.length === 0 && !this.oldFile) {
      this.messageServie.error('请先上传文件！');
      return;
    }
    const formData = new FormData();
    Object.keys(this.validateForm.controls).forEach(name => {
      formData.append(name, this.validateForm.controls[name].value);
    });
    formData.append('file', this.fileList.length === 0 ? this.oldFile : this.fileList[0]);
    if (this.type === 'add') {
      this.service.add(formData).subscribe(res => {
        this.modal.destroy('success');
      });
    } else if (this.type === 'edit') {
      this.service.update(formData).subscribe(res => {
        this.modal.destroy('success');
      });
    }

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
    this.validateForm = this.fb.group({
      _id: [this.doc._id],
      name: [this.doc.name, [Validators.required]],
      describe: [this.doc.describe, [Validators.required]],
      tags: [this.doc.tags ? this.doc.tags.split(',') : [], [Validators.required]],
      remember: [true],
    });
    // 编辑，若文件不改变，传 string
    if (this.doc && this.doc.file) {
      this.oldFile = this.doc.file;
    }
  }

}
