/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelfCenterService } from './self-center.service';

describe('Service: SelfCenter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelfCenterService]
    });
  });

  it('should ...', inject([SelfCenterService], (service: SelfCenterService) => {
    expect(service).toBeTruthy();
  }));
});