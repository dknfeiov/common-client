import { CONFIG, ServieTypeEnum } from './../common/CONFIG';
import { NzMessageService } from 'ng-zorro-antd';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpObserve } from '@angular/common/http/src/client';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';

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
      params: params
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
    // 请求添加时间戳
    if (CONFIG.serviceType !== ServieTypeEnum.MOCK) {
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
        })
        .map(item => this.mockDataFormat(options.method, options.url, item))
        .subscribe(
        data => {
          if (data['code'] === 0 || options.url.indexOf('login') > 0) {
            observer.next(data);
          } else {
            this.requestHandle(data);
          }
        },
        (err: HttpErrorResponse) => {
          // this.requestError(options.url, err);
          observer.error(err);
        }, () => {
          observer.complete();
        });
    });
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


  private requestHandle(data) {
    if (data.code !== 0) {
      this.message.error(data.msg);
    }
    if (data.code === 100001) {
      this.router.navigateByUrl('/login');
    }
  }

  // 模拟数据处理
  private mockDataFormat(method: string, url: string, data) {
    if (CONFIG.serviceType !== ServieTypeEnum.MOCK) {
      return data;
    }

    const action = url.slice(0, url.indexOf('/'));

    // 列表
    if (action === 'list') {
      return {
        'code': 0,
        'data': {
          'list': data,
          'total': data.length
        },
        'msg': '获取mock列表成功'
      };
    } else if (action === 'common') {  // 通用操作
      return {
        'code': 0,
        'data': data,
        'msg': '操作成功'
      };
    }
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
    total?: number;
    size?: number;
    page?: number;
  } | any;
  msg: string;
}
