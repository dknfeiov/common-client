import { LoginComponent } from './login/login.component';
import { PassModifyComponent } from './pass-modify/pass-modify.component';
import { SelfCenterService } from './self-center.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalService, NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { NgxPermissionsService } from 'ngx-permissions';

/**
 * 个人中心
 * @export
 * @class SelfCenterComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-self-center',
  templateUrl: './self-center.component.html',
  styleUrls: ['./self-center.component.scss']
})
export class SelfCenterComponent implements OnInit, OnDestroy {

  userIconUrl = '../../assets/images/self.png';
  private modal: NzModalRef;

  constructor(private service: SelfCenterService,
    private permissionsService: NgxPermissionsService,
    private modalService: NzModalService,
    private messageService: NzMessageService,
    private router: Router) {
  }


  /**
   * 退出登录
   * @memberof SelfCenterComponent
   */
  logOff() {
    this.service.logOff().subscribe(() => {
      this.permissionsService.flushPermissions();
      this.router.navigate(['/login']).then();
    });

  }

  login() {
    this.modal = this.modalService.create({
      nzTitle: '登录',
      nzContent: LoginComponent,
      nzWidth: 400,
      nzFooter: null,
      nzMaskClosable: false
    });
    this.modal.afterClose.subscribe(data => {
      if (data) {
        this.messageService.success('登录成功！');
      }
    });
  }


  /**
   * 修改密码
   * @memberof SelfCenterComponent
   */
  modifyPass() {
    this.modal = this.modalService.create({
      nzTitle: '修改密码',
      nzContent: PassModifyComponent,
      nzWidth: 400,
      nzFooter: null,
      nzMaskClosable: false
    });
    this.modal.afterClose.subscribe(data => {
      if (data) {
        this.messageService.success('密码修改成功！');
      }
    });
  }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.modal) {
      this.modal.destroy();
    }
  }


}
