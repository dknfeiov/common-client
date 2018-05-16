import { ViewsModule } from './views/views.module';
import { LoginComponent } from './views/login/login.component';
import { GuardChildPermissionService } from './service/guard-child-permission.service';
import { IndexComponent } from './views/index/index.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'views',
    // 路由守卫
    canActivateChild: [GuardChildPermissionService],
    loadChildren: './views/views.module#ViewsModule'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', redirectTo: 'views', pathMatch: 'full' },
  { path: '**', redirectTo: 'views' },
];

export const AppRoutes = RouterModule.forRoot(routes, {
  useHash: true
});

