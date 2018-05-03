import {NgModule} from '@angular/core';
import {BreadcrumbComponent} from './breadcrumbs.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NzBreadCrumbModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  providers: [],
  imports: [
    RouterModule,
    CommonModule, NzBreadCrumbModule
  ],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbsModule {
}
