import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';

export function strlen(str: string = ''): number {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
}

export function hrMaxLength(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const forbidden = length - strlen(control.value);
    return forbidden < 0 ? {hrMaxLength: true, error: true} : null;
  };
}

/**
 *  字符串长度校验，传入需要校验的长度【中文】
 *  2个英文字符等于1个中文字符
 */


@Directive({
  selector: '[appValidMaxLength]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidMaxLengthDirective,
    multi: true
  }]
})
export class ValidMaxLengthDirective implements Validator {

  @Input() appValidMaxLength;

  validate(c: AbstractControl): { [key: string]: any; } {
    if (!this.appValidMaxLength) {
      throw new Error('appValidMaxLengthDirective : the limit of String length doesn\'t exist !');
    }
    return this.validateFn(c.value) ? null : {'hrMaxLength': true};
  }


  validateFn(value) {
    if (!value) {
      return true;
    }
    let len = 0;
    Array.from(value).forEach(char => {
      const code = char['charCodeAt'](0);
      len += (code >= 0 && code <= 128) ? 1 : 2;
    });
    return len <= this.appValidMaxLength * 2;
  }

  constructor() {
  }

}

