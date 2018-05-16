import { ShareModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { SelfCenterComponent } from './self-center.component';
import { RouterModule, Routes } from '@angular/router';
import { SelfCenterService } from './self-center.service';
import { PassModifyComponent } from './pass-modify/pass-modify.component';
// import { LoginComponent } from './login/login.component';


/* const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: '个人中心'
    },
    component: SelfCenterComponent
  }
]; */

@NgModule({
  imports: [
    ShareModule
    // RouterModule.forChild(routes)
  ],
  exports: [SelfCenterComponent],
  declarations: [
    SelfCenterComponent,
    PassModifyComponent,
    /* LoginComponent */
  ],
  providers: [SelfCenterService],
  entryComponents: [PassModifyComponent, /* LoginComponent */]
})
export class SelfCenterModule { }

