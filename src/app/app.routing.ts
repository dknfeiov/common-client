import { GuardChildPermissionService } from './service/guard-child-permission.service';
import { IndexComponent } from './views/index/index.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // 路由守卫
    canActivateChild: [GuardChildPermissionService],
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
        loadChildren: './views/document/document.module#DocumentModule',
      },
      {
        path: 'analysis',
        loadChildren: './views/analysis/analysis.module#AnalysisModule',
      },
      {
        path: 'tag',
        loadChildren: './views/tag/tag.module#TagModule',
      },
      {
        path: 'report',

        loadChildren: './views/report/report.module#TagModule',
      },
      {
        path: '*',
        redirectTo: '',
        pathMatch: 'full',
      }]
  }
];

export const AppRoutes = RouterModule.forRoot(routes, {
  useHash: true
});

