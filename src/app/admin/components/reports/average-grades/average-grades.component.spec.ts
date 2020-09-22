import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageGradesComponent } from './average-grades.component';

describe('AverageGradesComponent', () => {
  let component: AverageGradesComponent;
  let fixture: ComponentFixture<AverageGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
