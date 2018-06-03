// import { GuardChildPermissionService } from './../service/guard-child-permission.service';
import { BreadcrumbsModule } from './../breadcrumbs/breadcrumbs.module';
import { SelfCenterModule } from './../self-center/self-center.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { ViewsRoutingModule } from './views-routing.module';
import { ShareModule } from '../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from '../views/index/index.component';

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule,
    ShareModule, CommonModule, ViewsRoutingModule,
    SelfCenterModule,
    BreadcrumbsModule
  ],
  declarations: [ViewsComponent, IndexComponent],
  entryComponents: [],
  providers: [/* GuardChildPermissionService */]
})

export class ViewsModule {
}
