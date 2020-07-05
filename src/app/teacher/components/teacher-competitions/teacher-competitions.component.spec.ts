import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCompetitionsComponent } from './teacher-competitions.component';

describe('TeacherCompetitionsComponent', () => {
  let component: TeacherCompetitionsComponent;
  let fixture: ComponentFixture<TeacherCompetitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCompetitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
