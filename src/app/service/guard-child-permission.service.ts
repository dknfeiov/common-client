import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router, ActivatedRoute,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';


/**
 * 权限检查
 * @export
 * @class GuardChildPermissionService
 * @implements {CanActivateChild}
 */
@Injectable()
export class GuardChildPermissionService implements CanActivateChild {

    constructor(private permissionService: NgxPermissionsService, private router: Router) {
        // 页面刷新，从session中重新加载权限
        if (Object.keys(this.permissionService.getPermissions()).length === 0) {
            const permissions = JSON.parse(sessionStorage.getItem('permissions'));
            if (permissions) {
                this.permissionService.loadPermissions(permissions);
            } else {
                this.router.navigateByUrl('/login');
            }
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const hasPermission = childRoute.data && childRoute.data.permission;
        if (hasPermission) {
            return this.permissionService.hasPermission(childRoute.data.permission);
        }
        return true;

    }

}
