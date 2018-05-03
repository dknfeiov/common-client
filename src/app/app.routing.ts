import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'document',
    data: {
      breadcrumb: '分析'
    },
    loadChildren: './views/document/document.module#DocumentModule',
  },
  {
    path: 'analysis',
    data: {
      breadcrumb: '分析'
    },
    loadChildren: './views/analysis/analysis.module#AnalysisModule',
  },
  {
    path: 'tag',
    data: {
      breadcrumb: '标签管理'
    },
    loadChildren: './views/tag/tag.module#TagModule',
  },
  {
    path: 'report',
    data: {
      breadcrumb: '分析报表'
    },
    loadChildren: './views/report/report.module#TagModule',
  },
  {
    path: '*',
    redirectTo: 'tag',
    pathMatch: 'full',
  }
];

export const AppRoutes = RouterModule.forRoot(routes, {
  useHash: true
});

