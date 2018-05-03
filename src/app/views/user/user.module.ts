import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserAddComponent } from './user-add/user-add.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserComponent,
    UserAddComponent
  ]
})
export class UserModule { }
