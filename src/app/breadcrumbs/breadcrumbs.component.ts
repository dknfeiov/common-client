import { Component, Input, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';
import { IBreadcrumb } from './breadcrumbs.model';
import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: 'app-breadcrumb',
  template: `
      <nz-breadcrumb [nzSeparator]="'>'" style="margin:16px 0;">
        <nz-breadcrumb-item *ngFor="let breadcrumb of breadcrumbs; let last = last">
          <a *ngIf="!last" [routerLink]="hasParams(breadcrumb)">
            {{breadcrumb.label}}
          </a>
          <span *ngIf="last">{{breadcrumb.label}}</span>
        </nz-breadcrumb-item>
      </nz-breadcrumb>`,
  encapsulation: ViewEncapsulation.None
})

export class BreadcrumbComponent implements OnInit, OnDestroy {

  // The breadcrumbs of the current route
  private currentBreadcrumbs: IBreadcrumb[];
  // All the breadcrumbs
  public breadcrumbs: IBreadcrumb[];

  public breadcrumbsChanged$: Subscription;

  public constructor(private breadcrumbService: BreadcrumbsService) {

    this.breadcrumbsChanged$ = breadcrumbService.get().subscribe((breadcrumbs: IBreadcrumb[]) => {
      this.breadcrumbs = breadcrumbs as IBreadcrumb[];
    });
  }

  public hasParams(breadcrumb: IBreadcrumb) {
    return Object.keys(breadcrumb.params).length ? [breadcrumb.url, breadcrumb.params] : [breadcrumb.url];
  }


  public ngOnInit() {

  }

  public ngOnDestroy() {
    this.breadcrumbsChanged$.unsubscribe();
  }
}
