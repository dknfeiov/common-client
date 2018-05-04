import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable, Optional, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publish';


@Injectable()
export class AuthService {

  private token: string;
  protected token$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() { }

  /*
  *   获取储存的Token
  * */
  getToken(): string {
    const tokenValue = sessionStorage.getItem('token.key');
    this.token = tokenValue;
    return this.token;
  }

  onTokenChange(): Observable<any> {
    return this.token$.publish().refCount();
  }

  setToken(token: string) {
    sessionStorage.setItem('token.key', token);
    this.token$.next(token);
  }

}
