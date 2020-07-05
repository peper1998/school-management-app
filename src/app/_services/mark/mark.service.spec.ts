/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarkService } from './mark.service';

describe('Service: Mark', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkService]
    });
  });

  it('should ...', inject([MarkService], (service: MarkService) => {
    expect(service).toBeTruthy();
  }));
});
