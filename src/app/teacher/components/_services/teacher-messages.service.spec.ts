import { TestBed } from '@angular/core/testing';

import { TeacherMessagesService } from './teacher-messages.service';

describe('TeacherMessagesService', () => {
  let service: TeacherMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
