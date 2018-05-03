import {Injectable, Optional, Inject, Injector,} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {SimpleToken, TokenService} from './token.service';
import {HY_PROVIDERS_TOKEN} from '../../common/CONFIG';

export class AuthResult {
  protected success: boolean;
  protected response: any;
  protected redirect: any;
  protected token: any;
  protected errors: string[];
  protected messages: string[];

  constructor(success: boolean, response?: any, redirect?: any, errors?: any, messages?: any, token?: SimpleToken) {
    this.success = success;
    this.response = response;
    this.redirect = redirect;
    this.errors = [];
    this.messages = [];
    this.errors = this.errors.concat([errors]);
    if (errors instanceof Array) {
      this.errors = errors;
    }
    this.messages = this.messages.concat([messages]);
    if (messages instanceof Array) {
      this.messages = messages;
    }
    this.token = token;
  }

  getResponse(): any {
    return this.response;
  }

  getTokenValue(): any {
    return this.token;
  }

  replaceToken(token: SimpleToken): any {
    this.token = token;
  }

  getRedirect(): any {
    return this.redirect;
  }

  getErrors(): string[] {
    return this.errors.filter(function (val) {
      return !!val;
    });
  }

  getMessages(): string[] {
    return this.messages.filter(function (val) {
      return !!val;
    });
  }

  isSuccess(): boolean {
    return this.success;
  }

  isFailure(): boolean {
    return !this.success;
  }


}

@Injectable()
export class AuthService {
  constructor(private tokenService: TokenService,
              private inject: Injector,
              /*   可选注入   */   @Optional() @Inject(HY_PROVIDERS_TOKEN) protected providers = {}) {
  }

  /*
  *   获取储存的Token
  * */
  getToken() {
    return this.tokenService.get();

  }

  isAuthenticated() {
    return this.getToken().map(token => {
      return token && token.getValue();
    });
  }

  onTokenChange() {
    return this.tokenService.tokenChange();
  }

  onAuthenticationChange() {
    return this.onTokenChange().map(token => {
      return !!token;
    });
  }

  getProvider(provider: string) {

    if (!this.providers[provider]) {
      throw new TypeError('provider' + provider + '没有注册');
    }
    return this.inject.get(this.providers[provider].service);
  }

  authenticate(provider: string, data?: any) {
    return this.getProvider(provider).authenticate(data).switchMap(result => {
      if (result.isSuccess() && result.getTokenValue()) {
        return this.tokenService.set(result.getTokenValue()).switchMap(re => {
          return this.tokenService.get();
        }).map(token => {
          result.replaceToken(token);
          return result;
        });
      }
      return Observable.of(result);
    });
  }

  setToken(token) {
    return this.tokenService.set(token);
  }

  register(provider: string, data?: any) {
    return this.getProvider(provider).register(data).switchMap((result) => {
      if (result.isSuccess() && result.getTokenValue()) {
        return this.tokenService.set(result.getTokenValue())
          .switchMap(_ => {
            return this.tokenService.get();
          })
          .map(function (token) {
            result.replaceToken(token);
            return result;
          });
      }
      return Observable.of(result);
    });
  }

  logout(provider: string): Observable<AuthResult> {
    return this.getProvider(provider).logout().do((result: AuthResult) => {
      if (result.isSuccess()) {
        this.tokenService.clear().subscribe();
      }
    });
  }

  requestPassword(provider: string, data ?: any) {
    return this.getProvider(provider).requestPassword(data);
  }

  resetPassword(provider: string, data ?: any) {
    return this.getProvider(provider).resetPassword(data);
  }
}
