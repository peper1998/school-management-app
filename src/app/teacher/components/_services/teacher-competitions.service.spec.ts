import { TestBed } from '@angular/core/testing';

import { TeacherCompetitionsService } from './teacher-competitions.service';

describe('TeacherCompetitionsService', () => {
  let service: TeacherCompetitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherCompetitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
