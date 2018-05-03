import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss']
})
export class TagAddComponent implements OnInit {
  validateForm: FormGroup;

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
    this.service.addTag(this.validateForm.value).subscribe(res => {
      this.modal.destroy('success');
    });
    // const param = Object.assign({}, this.validateForm.value);

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      remember: [true],
    });
  }

}
