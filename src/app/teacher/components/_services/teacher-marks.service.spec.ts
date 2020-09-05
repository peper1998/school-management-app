import { TestBed } from '@angular/core/testing';

import { TeacherMarksService } from './teacher-marks.service';

describe('TeacherMarksService', () => {
  let service: TeacherMarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherMarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
