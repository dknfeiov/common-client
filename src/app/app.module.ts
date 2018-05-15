import { IndexComponent } from './views/index/index.component';
import { BreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';
import { AuthService } from './service/auth.service';
import { CookieService } from './service/cookie.service';
import { GuardChildPermissionService } from './service/guard-child-permission.service';
import { ValidateService } from './service/validate.service';
import { HttpService } from './service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SelfCenterModule } from './self-center/self-center.module';
import { AppRoutes } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { HttpInterceptorProviders } from './interceptors';
import {
  defaultSettings,
  COMMON_INTERCEPTOR_HEADER,
  COMMON_PROVIDERS_TOKEN,
  COMMON_TOKEN_WRAPPER_TOKEN,
} from './common/CONFIG';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    AppRoutes,
    SelfCenterModule,
    BreadcrumbsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    HttpService,
    ValidateService,
    GuardChildPermissionService,
    { provide: COMMON_PROVIDERS_TOKEN, useValue: {} },
    { provide: COMMON_INTERCEPTOR_HEADER, useValue: 'Authorization' },
    HttpInterceptorProviders,
  ]
})
export class AppModule { }
