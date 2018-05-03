import { Tag } from './../tag';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss']
})
export class TagEditComponent implements OnInit {

  validateForm: FormGroup;
  @Input() data: Tag = {};

  constructor(
    private fb: FormBuilder,
    private service: TagService,
    private modal: NzModalRef
  ) { }


  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.invalid) {
      return;
    }
    this.service.updateTag(this.validateForm.value).subscribe(res => {
      this.modal.destroy('success');
    });
    // const param = Object.assign({}, this.validateForm.value);

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      _id: [this.data._id],
      name: [this.data.name, [Validators.required]],
      type: [this.data.type, [Validators.required]],
      remember: [true],
    });
  }

}
