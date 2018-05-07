import { DocumentService } from './../document.service';
import { NzModalRef, NzModalService, UploadFile, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
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

  tagList: Array<{ value; name; }> = [];

  validateForm: FormGroup;
  fileList = [];

  constructor(
    private fb: FormBuilder,
    private service: DocumentService,
    private messageServie: NzMessageService,
    private modal: NzModalRef
  ) { }

  beforeUpload = (file: UploadFile): boolean => {
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
    if (this.fileList.length === 0) {
      this.messageServie.error('请先上传文件！');
      return;
    }
    const formData = new FormData();
    Object.keys(this.validateForm.controls).forEach(name => {
      formData.append(name, this.validateForm.controls[name].value);
    });
    formData.append('file', this.fileList[0]);
    this.service.add(formData).subscribe(res => {
      this.modal.destroy('success');
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
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      describe: [null, [Validators.required]],
      tags: [[], [Validators.required]],
      remember: [true],
    });
  }

}
