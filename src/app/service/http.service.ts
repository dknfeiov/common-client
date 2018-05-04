import { NzMessageService } from 'ng-zorro-antd';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpObserve } from '@angular/common/http/src/client';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) { }

  public get(url: string, params?: any): Observable<ResponseInterface> {
    return this.request({
      method: 'GET',
      url: url,
      params: this.buildURLSearchParams(params)
    });
  }

  public delete(url: string, params?: any): Observable<ResponseInterface> {
    return this.request({
      method: 'DELETE',
      url: url,
      params: this.buildURLSearchParams(params)
    });
  }

  public put(url: string, body?: any): Observable<ResponseInterface> {
    return this.request({
      method: 'PUT',
      url: url,
      body: body
    });
  }


  public postFormData(url: string, params?: any, responseType?: HttpObserve): Observable<ResponseInterface> {
    return this.request({
      method: 'POST',
      url: url,
      // body: params,
      body: this.buildURLSearchParams(params).toString(),
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'),
      observe: responseType
    });
  }


  public post(url: string, body?: any): Observable<ResponseInterface> {
    return this.request({
      method: 'POST',
      url: url,
      body: body
    });
  }


  private request(options: any | null): Observable<ResponseInterface> {
    const indexInt = options.url.indexOf('?');
    const timeNum = Date.now();
    // 时间戳
    if (indexInt < 0) {
      options.url = options.url + '?vt=' + timeNum;
    } else {
      if (indexInt === (options.url.length - 1)) {
        options.url = options.url + 'vt=' + timeNum;
      } else {
        options.url = options.url + '&vt=' + timeNum;
      }
    }
    return Observable.create((observer) => {
      this.http.request<ResponseInterface>(
        options.method,
        options.url,
        {
          observe: options.observe || 'body',
          responseType: 'json',
          params: options.params,
          body: options.body,
          headers: options.headers
        }).subscribe(
        data => {
          // || options.url.indexOf('login') > 0
          if (data['code'] === 0 ) {
            observer.next(data);
          } else {
            this.requestSuccess(data);
          }
        },
        (err: HttpErrorResponse) => {
          this.requestError(options.url, err);
          //  observer.error(err);
        });
    });

  }


  private requestError(url, error) {
    // nativeService.hideLoading();
    // console.error('%c 请求失败 %c', 'color:red', '', 'url', url, 'error', error);
    /*this.router.navigateByUrl('/login').then(function () {
      console.log('跳转登陆');
    });*/
    /*  let status = error.status;
      if (!status || status === -1) {
        self.msgService.pop({type: 'error', body: CODE.reqSystemError});
      } else if (status === 401) {
        let result = error.json();
        self.toasterUNLogin(result.submsg);
      } else if (CODE[status]) {  //  如果有对应错误码提示
        self.msgService.pop({type: 'error', body: CODE[status]});
      } else {
        self.msgService.pop({type: 'error', body: CODE.reqHttpError + status});
      }*/
  }


  /**
   * 将对象转为查询参数
   * @param paramMap
   * @returns {HttpParams}
   */
  private buildURLSearchParams(paramMap): HttpParams {
    let params = new HttpParams();
    if (!paramMap) {
      return params;
    }
    for (const k in paramMap) {
      if (paramMap.hasOwnProperty(k)) {
        const val = paramMap[k];
        params = params.set(k, val);
      }
    }
    return params;
  }


  private requestSuccess(data) {
    if (data.code !== 0) {
      this.message.error(data.msg);
    }
    // this.router.navigateByUrl('/login');
  }

}



/**
 * 前后端数据交互格式
 * @export
 * @interface ResponseInterface
 */
export interface ResponseInterface {
  code: number;
  data: {
      list?: Array<any>;
  } | any;
  msg: string;
}
