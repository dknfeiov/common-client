import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/publish';
import {HY_OPTIONS_TOKEN, HY_TOKEN_WRAPPER_TOKEN} from '../../common/CONFIG';


function isSpecificValue(val) {
  return (val instanceof Date
    || val instanceof RegExp);
}

function cloneSpecificValue(val) {
  if (val instanceof Date) {
    return new Date(val.getTime());
  } else if (val instanceof RegExp) {
    return new RegExp(val);
  } else {
    throw new Error('cloneSpecificValue: Unexpected situation');
  }
}

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
  const clone = [];
  arr.forEach(function (item, index) {
    if (typeof item === 'object' && item !== null) {
      if (Array.isArray(item)) {
        clone[index] = deepCloneArray(item);
      } else if (isSpecificValue(item)) {
        clone[index] = cloneSpecificValue(item);
      } else {
        clone[index] = deepExtend({}, item);
      }
    } else {
      clone[index] = item;
    }
  });
  return clone;
}

// getDeepFromObject({result: {data: 1}}, 'result.data', 2); // returns 1
export function getDeepFromObject(object, name, defaultValue) {
  if (object === void 0) {
    object = {};
  }
  const keys = name.split('.');
  // clone the object
  let level = deepExtend({}, object || {});
  keys.forEach(function (k) {
    if (level && typeof level[k] !== 'undefined') {
      level = level[k];
    } else {
      level = undefined;
    }
  });
  return typeof level === 'undefined' ? defaultValue : level;
}

export const deepExtend = function (...object: any[]) {
  const objects = [];
  for (let _i = 0; _i < arguments.length; _i++) {
    objects[_i] = arguments[_i];
  }
  if (arguments.length < 1 || typeof arguments[0] !== 'object') {
    return false;
  }
  if (arguments.length < 2) {
    return arguments[0];
  }
  const target = arguments[0];
// convert arguments to array and cut off target object
  const args = Array.prototype.slice.call(arguments, 1);
  let val, src;
  args.forEach(function (obj) {
    // skip argument if it is array or isn't object
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      return;
    }
    Object.keys(obj).forEach(function (key) {
      src = target[key]; // source value
      val = obj[key]; // new value
      // recursion prevention
      if (val === target) {
        return;
        /**
         * if new value isn't object then just overwrite by new value
         * instead of extending.
         */
      } else if (typeof val !== 'object' || val === null) {
        target[key] = val;
        return;
        // just clone arrays (and recursive clone objects inside)
      } else if (Array.isArray(val)) {
        target[key] = deepCloneArray(val);
        return;
        // custom cloning and overwrite for specific objects
      } else if (isSpecificValue(val)) {
        target[key] = cloneSpecificValue(val);
        return;
        // overwrite by new value if source isn't object or array
      } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
        target[key] = deepExtend({}, val);
        return;
        // source value and new value is objects both, extending...
      } else {
        target[key] = deepExtend(src, val);
        return;
      }
    });
  });
  return target;


};

/*
*  基础Token类
* */
@Injectable()
export class SimpleToken {
  token: any;

  constructor() {
    this.token = '';
  }

  setValue(token) {
    this.token = token;
  }

  getValue() {
    return this.token;
  }

}

/*  JWTToken类
* */
@Injectable()
export class JWTToken extends SimpleToken {

  constructor() {
    super();
  }

  getPayload() {
    const parts = this.token.split('.');
    if (parts.length !== 3) {
      throw new Error(this.token + '不是合法的JWTToken，必须包含三部分。');
    }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error(this.token + 'decode失败，非法JWTToken"');
    }
    return JSON.parse(decoded);
  }

  getTokenExpDate(): Date {
    const decoded = this.getPayload();
    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  urlBase64Decode(str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        throw new Error('不合法的base64字符串');
      }
    }
    return this.b64DecodeUnicode(output);
  }

  b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(this.b64decode(str), function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  b64decode(str) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    str = String(str).replace(/=+$/, '');
    if (str.length % 4 === 1) {
      throw new Error('不是正确的编码');
    }
    for (
      // initialize result and counters
      let bc = 0, bs = void 0, buffer = void 0, idx = 0;
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }
}

@Injectable()
export class TokenService {

  protected options: any;
  protected defaultConfig: any = {
    token: {
      key: 'hooray_user_token',
      getter: (): Observable<SimpleToken> => {
        const tokenValue = sessionStorage.getItem(this.getConfigValue('token.key'));
        this.tokenWrapper.setValue(tokenValue);
        return Observable.of(this.tokenWrapper);
      },
      setter: (token: string | SimpleToken): Observable<null> => {
        const raw = token instanceof SimpleToken ? token.getValue() : token;
        sessionStorage.setItem(this.getConfigValue('token.key'), raw);
        return Observable.of(null);
      },
      deleter: (): Observable<null> => {
        sessionStorage.removeItem(this.getConfigValue('token.key'));
        return Observable.of(null);
      },
    }
  };
  protected config: any = {};
  protected token$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(@Inject(HY_OPTIONS_TOKEN) options: any, @Inject(HY_TOKEN_WRAPPER_TOKEN) protected tokenWrapper: SimpleToken) {
    this.setConfig(options);
    this.get().subscribe((token) => {
      return this.publishToken(token);
    });
  }

  setConfig(config: any): void {
    this.config = deepExtend({}, this.defaultConfig, config);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  set(rawToken: string): Observable<null> {
    return this.getConfigValue('token.setter')(rawToken)
      .switchMap(_ => this.get())
      .do((token: SimpleToken) => {
        this.publishToken(token);
      });
  }

  get(): Observable<SimpleToken> {
    return this.getConfigValue('token.getter')();
  }

  tokenChange(): Observable<SimpleToken> {
    return this.token$.publish().refCount();
  }

  clear(): Observable<any> {
    this.publishToken(null);
    return this.getConfigValue('token.deleter')();
  }

  protected publishToken(token: SimpleToken): void {
    this.token$.next(token);
  }

}

