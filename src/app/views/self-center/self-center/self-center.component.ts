import { SelfCenterService } from './../self-center.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

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

  userIconUrl = '../../../../../assets/img/user_default.png';
  // private editModal;

  constructor(
    private service: SelfCenterService,
    private modalService: NzModalService,
    private router: Router) {
  }


  /**
   * 退出登录
   * @memberof SelfCenterComponent
   */
  logOff() {
    this.router.navigate(['/login']);
  }


  /**
   * 打开个人信息面板
   * @memberof SelfCenterComponent
   */
  openInfoModal() {
    /* this.editModal = this.modalService.open({
      content: InfoModifyComponent,
      title: '个人资料',
      width: 400,
      maskClosable: false,
      footer: false,
      onOk: () => {
      },
      componentParams: {}
    }); */
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    /* if (this.editModal) {
      this.editModal.destroy();
    } */
  }


}
