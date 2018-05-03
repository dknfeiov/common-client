/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnalysisService } from './analysis.service';

describe('Service: Analysis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalysisService]
    });
  });

  it('should ...', inject([AnalysisService], (service: AnalysisService) => {
    expect(service).toBeTruthy();
  }));
});