/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GuardChildPermissionService } from './guard-child-permission.service';

describe('Service: GuardChildPermission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardChildPermissionService]
    });
  });

  it('should ...', inject([GuardChildPermissionService], (service: GuardChildPermissionService) => {
    expect(service).toBeTruthy();
  }));
});