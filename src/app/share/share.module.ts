import { GuardChildPermissionService } from './guards/guard-child-permission.service';
import { FormattingPipe } from './pipes/formatting.pipe';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { ValidMinLengthDirective } from './directives/valid-min-length.directive';
import { ValidMaxLengthDirective } from './directives/valid-max-length.directive';
import { ValidateService } from './service/validate.service';
import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { deepExtend, SimpleToken, TokenService } from './service/token.service';
import { AuthService } from './service/auth.service';
import {
  defaultSettings,
  HY_INTERCEPTOR_HEADER,
  HY_OPTIONS_TOKEN,
  HY_PROVIDERS_TOKEN,
  HY_TOKEN_WRAPPER_TOKEN,
  HY_USER_OPTIONS_TOKEN
} from '../common/CONFIG';
import { NgxPermissionsModule } from 'ngx-permissions';

export interface AuthOptions {
  forms?: any;
  providers?: any;
}

export function AuthServiceFactory(config, tokenService, injector) {
  const providers = config.providers || {};
  for (let key in providers) {
    if (providers.hasOwnProperty(key)) {
      const provider = providers[key];
      const object = injector.get(provider.service);
      object.setConfig(provider.config || {});
    }
  }
  return new AuthService(tokenService, injector, providers);
}


export const Local_CORE_PROVIDER = [
  TokenService,
  { provide: HY_OPTIONS_TOKEN, useFactory: (options) => deepExtend(defaultSettings, options), deps: [HY_USER_OPTIONS_TOKEN] },
  { provide: HY_PROVIDERS_TOKEN, useValue: {} },
  { provide: HY_INTERCEPTOR_HEADER, useValue: 'Authorization' },
  { provide: HY_TOKEN_WRAPPER_TOKEN, useClass: SimpleToken },
  {
    provide: AuthService,
    useFactory: AuthServiceFactory,
    deps: [HY_OPTIONS_TOKEN, TokenService, Injector]
  }
];


@NgModule({
  imports: [
    CommonModule, NgxPermissionsModule.forChild(),
    FormsModule, ReactiveFormsModule,
     NgZorroAntdModule
  ],
  declarations: [
    ValidMaxLengthDirective, ValidMinLengthDirective, DebounceClickDirective, FormattingPipe
  ],
  exports: [
    NgZorroAntdModule, CommonModule,
    FormsModule, ReactiveFormsModule, NgxPermissionsModule,
    ValidMaxLengthDirective, ValidMinLengthDirective, DebounceClickDirective, FormattingPipe
  ],
  providers: [
    {
      provide: AuthService,
      useFactory: AuthServiceFactory,
      deps: [HY_OPTIONS_TOKEN, TokenService, Injector]
    },
    ValidateService,
    GuardChildPermissionService
  ]
})
export class ShareModule {
  static forRoot(authOptions?: AuthOptions): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ShareModule,
      providers: [...Local_CORE_PROVIDER, { provide: HY_USER_OPTIONS_TOKEN, useValue: authOptions }]
    };
  }
}
