import { ShareModule } from './../../share/share.module';
import { DocumentService } from './document.service';
import { NgModule } from '@angular/core';
import { DocumentComponent } from './document.component';
import { RouterModule, Routes } from '@angular/router';
import { DocumentAddComponent } from './document-add/document-add.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: '文档管理'
    },
    component: DocumentComponent
  }
];

@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DocumentComponent,
    DocumentAddComponent
  ],
  providers: [DocumentService],
  entryComponents: [DocumentAddComponent]
})
export class DocumentModule { }
