/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PayrollServiceService } from './PayrollService.service';

describe('Service: PayrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayrollServiceService]
    });
  });

  it('should ...', inject([PayrollServiceService], (service: PayrollServiceService) => {
    expect(service).toBeTruthy();
  }));
});
