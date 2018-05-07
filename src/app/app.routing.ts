import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: '文档处理'
    },
    children: [{
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
      redirectTo: 'tag',
      pathMatch: 'full',
    }]
  }
];

export const AppRoutes = RouterModule.forRoot(routes, {
  useHash: true
});

