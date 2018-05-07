import { BreadcrumbsService } from './breadcrumbs/breadcrumbs.service';
import { IBreadcrumb } from './breadcrumbs/breadcrumbs.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private currentBreadcrumbs: IBreadcrumb[];
  public breadcrumbs: IBreadcrumb[];


  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public breadcrumbService: BreadcrumbsService) {

  }

  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const ROUTE_PARAM_BREADCRUMB = 'breadcrumb';
    const PREFIX_BREADCRUMB = 'prefixBreadcrumb';
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {

      this.currentBreadcrumbs = [];

      // get the root of the current route
      let currentRoute: ActivatedRoute = this.activatedRoute.root;
      // set the url to an empty string
      let url = '/views';
      // iterate from activated route to children
      while (currentRoute.children.length > 0) {

        const childrenRoutes: ActivatedRoute[] = currentRoute.children;
        let breadCrumbLabel = '';

        // iterate over each children
        childrenRoutes.forEach(route => {
          // Set currentRoute to this route
          currentRoute = route;
          // Verify this is the primary route
          if (route.outlet !== PRIMARY_OUTLET) {
            return;
          }

          const hasData = (route.routeConfig && route.routeConfig.data);
          const hasDynamicBreadcrumb: boolean = route.snapshot.params.hasOwnProperty(ROUTE_PARAM_BREADCRUMB);

          if (hasData || hasDynamicBreadcrumb) {
            /*
             Verify the custom data property "breadcrumb"
             is specified on the route or in its parameters.

             Route parameters take precedence over route data
             attributes.
             */
            if (hasDynamicBreadcrumb) {
              breadCrumbLabel = route.snapshot.params[ROUTE_PARAM_BREADCRUMB].replace(/_/g, ' ');
            } else if (route.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
              breadCrumbLabel = route.snapshot.data[ROUTE_DATA_BREADCRUMB];
            }

            // Get the route's URL segment
            const routeURL: string = route.snapshot.url.map(segment => segment.path).join('/');
            // console.log(routeURL);
            url += `/${routeURL}`;

            // Cannot have parameters on a root route
            if (routeURL.length === 0) {
              route.snapshot.params = {};
            }

            // console.log(url);
            // Add breadcrumb
            const breadcrumb: IBreadcrumb = {
              label: breadCrumbLabel,
              params: route.snapshot.params,
              url: url
            };
            // Add the breadcrumb as 'prefixed'. It will appear before all breadcrumbs
            if (route.snapshot.data.hasOwnProperty(PREFIX_BREADCRUMB)) {
              this.breadcrumbService.storePrefixed(breadcrumb);
            } else {
              this.currentBreadcrumbs.push(breadcrumb);
            }

          }

        });
        this.breadcrumbService.store(this.currentBreadcrumbs);
      }
    });
    // this.permissionsService.addPermission([]);

  }
}
