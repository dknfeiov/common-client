import { ActivatedRoute } from '@angular/router';
import { SelfCenterService } from './../self-center.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import * as Md5 from 'js-md5';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private service: SelfCenterService,
    private modal: NzModalRef
  ) { }


  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.invalid) {
      return;
    }
    const param = Object.assign({}, this.validateForm.value);
    param.password = Md5(param.password);
    this.service.login(param).subscribe(res => {
      this.modal.destroy('success');
      location.reload();
    });
    // const param = Object.assign({}, this.validateForm.value);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      loginName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

}
