import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BreadcrumbsService } from './breadcrumbs.service';

@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  providers: [/* BreadcrumbsService */],
  imports: [
    RouterModule,
    CommonModule, NgZorroAntdModule
  ],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbsModule {
}
