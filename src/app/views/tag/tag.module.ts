import { NgModule } from '@angular/core';
import { ShareModule } from './../../share/share.module';
import { RouterModule, Routes } from '@angular/router';
import { TagComponent } from './tag.component';
import { TagAddComponent } from './tag-add/tag-add.component';
import { TagService } from './tag.service';
import { TagEditComponent } from './tag-edit/tag-edit.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: '标签组合'
    },
    component: TagComponent
  }
];
@NgModule({
  imports: [
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TagComponent,
    TagAddComponent,
    TagEditComponent
  ],
  entryComponents: [TagAddComponent, TagEditComponent],
  providers: [TagService]
})
export class TagModule { }
