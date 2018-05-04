import { FormattingPipe } from './pipes/formatting.pipe';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { ValidMinLengthDirective } from './directives/valid-min-length.directive';
import { ValidMaxLengthDirective } from './directives/valid-max-length.directive';
import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    NgxPermissionsModule.forChild(), NgZorroAntdModule
  ],
  declarations: [
    ValidMaxLengthDirective, ValidMinLengthDirective, DebounceClickDirective, FormattingPipe
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    NgZorroAntdModule, NgxPermissionsModule,
    ValidMaxLengthDirective, ValidMinLengthDirective, DebounceClickDirective,
    FormattingPipe
  ],
  providers: []
})
export class ShareModule { }
