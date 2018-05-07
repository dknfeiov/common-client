import { ShareModule } from './../../share/share.module';
import { AnalysisService } from './analysis.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AnalysisComponent } from './analysis.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: '网址分析'
    },
    component: AnalysisComponent
  }
];

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnalysisComponent],
  providers: [AnalysisService]
})
export class AnalysisModule { }
