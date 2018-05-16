// import { GuardChildPermissionService } from './../service/guard-child-permission.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewsComponent } from './views.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    // 路由守卫
    // canActivateChild: [GuardChildPermissionService],
    children: [
      {
        path: 'index',
        data: {
          breadcrumb: '首页'
        },
        component: IndexComponent,
      },
      {
        path: 'document',
        loadChildren: './document/document.module#DocumentModule',
      },
      {
        path: 'analysis',
        loadChildren: './analysis/analysis.module#AnalysisModule',
      },
      {
        path: 'tag',
        loadChildren: './tag/tag.module#TagModule',
      },
      {
        path: 'report',

        loadChildren: './report/report.module#TagModule',
      },
      {
        path: '*',
        redirectTo: 'index',
        pathMatch: 'full',
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {
}
