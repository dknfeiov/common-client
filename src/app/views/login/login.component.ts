import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService, NzMessageService } from 'ng-zorro-antd';
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
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private router: Router,
    private messageService: NzMessageService,
    private fb: FormBuilder,
    private service: LoginService,
    // private modal: NzModalRef
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
      this.messageService.success('登录成功！');
      // this.modal.destroy('success');
      // location.reload();
      this.router.navigateByUrl('views/index');
    });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      loginName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

}
