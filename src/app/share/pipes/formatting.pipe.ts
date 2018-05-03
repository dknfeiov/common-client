import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatting'
})
export class FormattingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const result = args.find(item =>  value == item.value);
    return result ? result.name : '';
  }

}
