import { AuthInterceptor } from './share/service/interceptor';
import { HttpService } from './share/service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SelfCenterModule } from './self-center/self-center.module';
import { AppRoutes } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { HttpInterceptorProviders } from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    AppRoutes,
    SelfCenterModule
  ],
  bootstrap: [AppComponent],
  providers: [
    HttpService,
    AuthInterceptor
    // ...HttpInterceptorProviders
  ]
})
export class AppModule { }
