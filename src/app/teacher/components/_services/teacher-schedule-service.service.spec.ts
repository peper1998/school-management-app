import { TestBed } from '@angular/core/testing';

import { TeacherScheduleServiceService } from './teacher-schedule-service.service';

describe('TeacherScheduleServiceService', () => {
  let service: TeacherScheduleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherScheduleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
