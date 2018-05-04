import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';



/**
 * 自定义校验方法
 * 提供 ReactiveForm 使用
 * @export
 * @class ValidateService
 */
@Injectable()
export class ValidateService {

    // 最大长度
    public maxLength(length: number): ValidatorFn {
        if (!length) {
            throw new Error('valid "hrMaxLength" : the limit of String length doesn\'t exist !');
        }
        return (control: AbstractControl): { [key: string]: any } => {
            if (length - this.strlen(control.value) < 0) {
                return { 'hrMaxLength': { value: true } };
            }
            return null;
        };
    }


    // 最小长度
    public minLength(length: number): ValidatorFn {
        if (!length) {
            throw new Error('valid "hrMinLength" : the limit of String length doesn\'t exist !');
        }
        return (control: AbstractControl): { [key: string]: any } => {
            if (length - this.strlen(control.value) > 0) {
                return { 'hrMinLength': { value: true } };
            }
            return null;
        };
    }



    // ===============================  工具方法  =================================

    /**
     * 获取字符串长度
     * 英文字符长度1 中文字符长度2
     * @private
     * @param {string} [str='']
     * @returns {number}
     * @memberof ValidateService
     */
    public strlen(str: string = ''): number {
        let len = 0;
        Array.from(str).forEach(char => {
            const code = char['charCodeAt'](0);
            len += (code >= 0 && code <= 128) ? 1 : 2;
        });
        return len;
    }

    constructor() { }

}
