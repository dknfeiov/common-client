import { NgModule } from '@angular/core';
import { ShareModule } from './../../share/share.module';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { ReportService } from './report.service';


const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: '分析报表'
        },
        component: ReportComponent
    }
];
@NgModule({
    imports: [
        ShareModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ReportComponent,
    ],
    entryComponents: [],
    providers: [ReportService]
})
export class TagModule { }
