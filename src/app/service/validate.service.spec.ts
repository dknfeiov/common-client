/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidateService } from './validate.service';

describe('Service: Validate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidateService]
    });
  });

  it('should ...', inject([ValidateService], (service: ValidateService) => {
    expect(service).toBeTruthy();
  }));
});