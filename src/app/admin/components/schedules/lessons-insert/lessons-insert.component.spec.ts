import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsInsertComponent } from './lessons-insert.component';

describe('LessonsInsertComponent', () => {
  let component: LessonsInsertComponent;
  let fixture: ComponentFixture<LessonsInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
