import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassInsertComponent } from './class-insert.component';

describe('ClassInsertComponent', () => {
  let component: ClassInsertComponent;
  let fixture: ComponentFixture<ClassInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
