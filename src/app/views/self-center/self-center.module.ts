import { SelfCenterService } from './self-center.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfCenterComponent } from './self-center/self-center.component';
import {
  NzDropDownModule, NzAvatarModule, NzInputModule, NzModalModule, NzSelectModule,
  NzButtonModule, NzGridModule, NzCheckboxModule
} from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NzDropDownModule, NzAvatarModule, NzInputModule, NzModalModule, NzSelectModule, NzButtonModule, NzGridModule, NzCheckboxModule,
    ReactiveFormsModule
  ],
  providers: [SelfCenterService],
  declarations: [SelfCenterComponent
  ],
  exports: [
    SelfCenterComponent
  ]
})
export class SelfCenterModule { }
