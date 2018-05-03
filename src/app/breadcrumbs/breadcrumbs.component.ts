import {Component, Input, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/filter';
import {Subscription} from 'rxjs/Subscription';
import {IBreadcrumb} from './breadcrumbs.model';
import {BreadcrumbsService} from './breadcrumbs.service';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <div [ngClass]="{ 'container-fluid': allowBootstrap, 'fluid-bread': true}">
      <div class="container">
        <nz-breadcrumb [nzSeparator]="'>'" [ngClass]="{ 'breadcrumb': allowBootstrap}" class="{{addClass ? '' + addClass : ''}}">
          <span style="margin-right: 6px">当前位置:</span>
          <nz-breadcrumb-item *ngFor="let breadcrumb of breadcrumbs; let last = last"
                              [ngClass]="{ 'breadcrumb-item': allowBootstrap, 'list': true}">
            <a *ngIf="!last" [routerLink]="hasParams(breadcrumb)">
              {{breadcrumb.label}}
            </a>
            <span *ngIf="last">{{breadcrumb.label}}</span>
          </nz-breadcrumb-item>
        </nz-breadcrumb>
      </div>
    </div>`,
  encapsulation: ViewEncapsulation.None
})

export class BreadcrumbComponent implements OnInit, OnDestroy {

  // The breadcrumbs of the current route
  private currentBreadcrumbs: IBreadcrumb[];
  // All the breadcrumbs
  public breadcrumbs: IBreadcrumb[];

  public breadcrumbsChanged$: Subscription;
  @Input()
  public allowBootstrap: boolean;

  @Input()
  public addClass: string;

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
