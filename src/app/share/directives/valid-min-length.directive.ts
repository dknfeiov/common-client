import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { ValidateService } from './../service/validate.service';
import { Directive, Input } from '@angular/core';


/**
 *  字符串长度校验，传入需要校验的中文长度
 *  2个英文字符等于1个中文字符
 */
@Directive({
  selector: '[appValidMinLength]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidMinLengthDirective,
    multi: true
  }]
})
export class ValidMinLengthDirective implements Validator {

  @Input() appValidMinLength;

  constructor(
    private validService: ValidateService
  ) { }

  validate(c: AbstractControl): { [key: string]: any; } {
    if (!c.value) {
      return null;
    }
    if (!this.appValidMinLength) {
      throw new Error('valid "hrMinLength" : the limit of String length doesn\'t exist !');
    }
    return this.validService.strlen(c.value) >= this.appValidMinLength * 2 ? null : { 'hrMinLength': true };
  }

}
