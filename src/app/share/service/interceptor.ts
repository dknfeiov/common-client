import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { HY_INTERCEPTOR_HEADER } from '../../common/CONFIG';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string;
  clonedRequest: any;
  tokenHeader: string;

  constructor(
    private authService: AuthService,
    private _router: Router,
    @Inject(HY_INTERCEPTOR_HEADER) _tokenHeader: string
  ) {
    this.tokenHeader = _tokenHeader;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.getToken().subscribe(data => {
      this.token = data.getValue();
    });
    if (this.token) {
      this.clonedRequest = req.clone({
        headers: req.headers.set(this.tokenHeader, this.token)
      });
    } else {
      this.clonedRequest = req;
    }
    return next.handle(this.clonedRequest).do(event => {
      if (event instanceof HttpResponse) {
        if (!!event.headers.get('token')) {
          this.authService.setToken(event.headers.get('token'));
        }
        if (event.status === 403) {
          this.toLogin();
        }
      }
    });
  }

  toLogin() {
    this._router.navigateByUrl('/login');
  }
}
