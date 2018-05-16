import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-views',
  templateUrl: './view.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent implements OnInit {


  constructor(
    private permissionsService: NgxPermissionsService,
    private router: Router
  ) { }

  ngOnInit() {
    const permissions = JSON.parse(sessionStorage.getItem('permissions'));
    if (permissions) {
      this.permissionsService.loadPermissions(permissions);
    } else {
      // this.router.navigateByUrl('/login');
    }
  }

}

