import { TestBed } from '@angular/core/testing';

import { TeacherAttendanceServiceService } from './teacher-attendance-service.service';

describe('TeacherAttendanceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherAttendanceServiceService = TestBed.get(TeacherAttendanceServiceService);
    expect(service).toBeTruthy();
  });
});
